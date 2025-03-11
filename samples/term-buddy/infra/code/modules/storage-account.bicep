@minLength(3)
@maxLength(24)
@description('storage account name')
param name string

@description('storage account name')
param containerName string

@description('Resource Location')
param location string

@description('Tags')
param tags object

@description('skuName')
param skuName string

@description('kind')
param kind string

// resource
resource storage 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: name
  location: location
  tags: tags
  sku: {
    name: skuName
  }
  kind: kind
  properties: {
    encryption: {
      keySource: 'Microsoft.Storage'
      services: {
        blob: {
          enabled: true
        }
        file: {
          enabled: true
        }
      }
    }
    supportsHttpsTrafficOnly: true
  }
}

// Storage Account - Blob
resource blob 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  name: 'default'
  parent: storage
  properties: {
    deleteRetentionPolicy: {
      enabled: true
      days: 7  // Set the retention days as per your requirement
    }
  }
}

// Storage Account - Container
resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: containerName
  parent: blob
  properties: {
    publicAccess: 'None'
  }
}

// Config SAS token

var sasConfig = {
  signedResourceTypes: 'sco'
  signedPermission: 'rl'
  signedServices: 'b'
  signedExpiry: '2025-08-25T00:00:00Z'
  signedProtocol: 'https'
  keyToSign: 'key2'
}

output sasToken string = storage.listAccountSas(storage.apiVersion, sasConfig).accountSasToken
output containerEndpoint string = 'https://${name}.blob.core.windows.net/${containerName}'

output name string = storage.name
output id string = storage.id
output containerName string = container.name
