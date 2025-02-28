// params

@description('AI Hub name')
param nameAiHub string
param aiProjectName string

@description('Resource Location')
param location string

@description('Tags')
param tags object

param aiHubFriendlyName string
param aiProjectFriendlyName string
param aiHubDescription string
param aoiID string
param aoiEndpoint string
param keyVaultID string
param storageID string
param applicationInsightsID string

// resource
resource aiHub 'Microsoft.MachineLearningServices/workspaces@2023-08-01-preview' = {
  name: nameAiHub
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    friendlyName: aiHubFriendlyName
    description: aiHubDescription

    // dependent resources
    keyVault: keyVaultID
    storageAccount: storageID
    applicationInsights: applicationInsightsID
  }
  kind: 'hub'

  // Azure OpenAI connection
  resource aoiServicesConnection 'connections@2024-01-01-preview' = {
    name: '${nameAiHub}-connection-AzureOpenAI'
    properties: {
      category: 'AzureOpenAI'
      target: aoiEndpoint
      authType: 'ApiKey'
      isSharedToAll: true
      credentials: {
        key: '${listKeys(aoiID, '2021-10-01').key1}'
      }
      metadata: {
        ApiType: 'Azure'
        ResourceId: aoiID
      }
    }
  }
}

resource aiHubProject 'Microsoft.MachineLearningServices/workspaces@2024-04-01' = {
  name: aiProjectName
  location: location
  kind: 'Project'
  identity: {
    type: 'SystemAssigned'
  }
  sku: {
    name: 'Basic'
  }
  properties: {
    friendlyName: aiProjectFriendlyName
    hubResourceId: aiHub.id
  }
  tags: tags
}

// outputs
output aiHubName string = aiHub.name
output aiHubId string = aiHub.id
output aiProjectName string = aiHubProject.name
output aiProjectId string = aiHubProject.id
