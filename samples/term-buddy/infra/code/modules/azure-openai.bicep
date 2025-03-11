// params

@description('Azure OpenAI name')
param name string

@description('Resource Location')
param location string

@description('Tags')
param tags object

// resource

resource open_ai 'Microsoft.CognitiveServices/accounts@2022-03-01' = {
  name: name
  location: location
  tags: tags
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: toLower(name)
  }
}

resource open_ai_gpt4o 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  name: '${name}-gpt4o'
  sku: {
    capacity: 10
    name: 'GlobalStandard'
  }
  parent: open_ai
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: '2024-08-06'
    }
    raiPolicyName: 'Microsoft.Default'
    versionUpgradeOption: 'OnceCurrentVersionExpired'
  }
}

// outputs
output aoi_id string = open_ai.id
output aoi_endpoint string = open_ai.properties.endpoint
output aoiName string = open_ai.name
