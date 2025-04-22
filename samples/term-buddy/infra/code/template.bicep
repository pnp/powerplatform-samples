// Parameters
@minLength(2)
@maxLength(12)
@description('Name for the AI resource and used to derive name of dependent resources.')
param name string

@description('Friendly name for your Azure AI resource')
param aiHubFriendlyName string

@description('Friendly name for your Azure AI Project resource')
param aiProjectFriendlyName string

@description('Description of your Azure AI Hub resource displayed in AI Foundry')
param aiHubDescription string

@description('Azure region used for the deployment of all resources.')
param location string = resourceGroup().location

@description('Set of tags to apply to all resources.')
param tags object

// Principal ID
@description('The principal ID of the identity running the deployment')
param deploymentPrincipalId string

// Create a short, unique suffix, that will be unique to each resource group
var uniqueSuffix = substring(uniqueString(resourceGroup().id), 0, 4)

// Dependent resources for the Azure AI Foundry
var applicationInsightsName = 'appi-${name}-${uniqueSuffix}'
var logAnalyticsWorkspaceName = 'law-${name}-${uniqueSuffix}'
var storageName = 'st-${name}-${uniqueSuffix}'
var keyvaultName = 'kv-${name}-${uniqueSuffix}'
var aoiName = 'aoi-${name}-${uniqueSuffix}'
var aiHubName = 'aih-${name}-${uniqueSuffix}'
var aiProjectName = 'aip-${name}-${uniqueSuffix}'
var containerName = 'container-${name}-${uniqueSuffix}'

// Cleaned name for Azure Storage Account
var storageNameCleaned = replace(storageName, '-', '')

// Modules

// Dependent resources

// module: Azure OpenAI
module aoi './modules/azure-openai.bicep' = {
  name: aoiName
  params: {
    name: aoiName
    location: location
    tags: tags
  }
}

// module: Monitor
module monitor './modules/monitor.bicep' = {
  name: logAnalyticsWorkspaceName
  params: {
    namelaw: logAnalyticsWorkspaceName
    nameappins: applicationInsightsName
    location: location
    tags: tags
  }
}

// module: Key Vault
module keyVault './modules/key-vault.bicep' = {
  name: keyvaultName
  params: {
    name: keyvaultName
    location: location
    tags: tags
    objectId: deploymentPrincipalId
  }
}

@allowed([
  'Standard_LRS'
  'Standard_ZRS'
  'Standard_GRS'
  'Standard_GZRS'
  'Standard_RAGRS'
  'Standard_RAGZRS'
  'Premium_LRS'
  'Premium_ZRS'
])
@description('Storage SKU')
param storageSkuName string = 'Standard_LRS'

@allowed(['Storage', 'StorageV2', 'BlobStorage', 'FileStorage', 'BlockBlobStorage'])
param storageKind string = 'StorageV2'

// module: Storage Account
module storageAccount './modules/storage-account.bicep' = {
  name: storageNameCleaned
  params: {
    name: storageNameCleaned
    containerName: containerName
    location: location
    tags: tags
    kind: storageKind
    skuName: storageSkuName
  }
}

// Main AI Hub deployment
// module: AI Hub
module aiHub './modules/ai-hub.bicep' = {
  name: aiHubName
  params: {
    nameAiHub: aiHubName
    aiProjectName: aiProjectName
    location: location
    tags: tags
    aiHubFriendlyName: aiHubFriendlyName
    aiProjectFriendlyName: aiProjectFriendlyName
    aiHubDescription: aiHubDescription
    aoiID: aoi.outputs.aoi_id
    aoiEndpoint: aoi.outputs.aoi_endpoint
    keyVaultID: keyVault.outputs.id
    storageID: storageAccount.outputs.id
    applicationInsightsID: monitor.outputs.appInsightsId
  }
  dependsOn: [
    aoi
    keyVault
    storageAccount
    monitor
  ]
}

output containerName string = storageAccount.outputs.containerName
output storageId string = storageAccount.outputs.id
output storageName string = storageAccount.outputs.name
output sasToken string = storageAccount.outputs.sasToken
output containerEndpoint string = storageAccount.outputs.containerEndpoint

output applicationInsightsName string = monitor.outputs.appInsightsName
output logAnalyticsWorkspaceName string = monitor.outputs.logAnalyticsWorkspace
output keyvaultName string = keyVault.outputs.name
output aoiName string = aoi.outputs.aoiName
output aiHubName string = aiHub.outputs.aiHubName
output aiHubId string = aiHub.outputs.aiHubId
output aiProjectName string = aiHub.outputs.aiProjectName
output aiProjectId string = aiHub.outputs.aiProjectId
