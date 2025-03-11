// params

@description('key vault name')
param name string

@description('object id of service principal that creates resources on azure')
@minLength(36)
@maxLength(36)
param objectId string

@description('Resource Location')
param location string

@description('Tags')
param tags object

// resource
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'standard'
      family: 'A'
    }
    softDeleteRetentionInDays: 7
    enableSoftDelete: true
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        objectId: objectId
        tenantId: subscription().tenantId
        permissions: {
          keys: ['all']
          secrets: ['all']
          certificates: ['all']
          storage: ['all']
        }
      }
    ]
  }
}

// outputs 
output name string = keyVault.name
output id string = keyVault.id
