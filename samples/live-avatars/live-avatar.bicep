// Parameters used in the script
param avatar_name string = 'liveavatar-yourname'
param openai_instance_name string = 'openai-name'
param openai_deploymentname string = 'nameofdeployment'
param location string = resourceGroup().location

// Create resource to generate avatars
resource liveavatar 'Microsoft.CognitiveServices/accounts@2023-10-01-preview' = {
  name: avatar_name
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'SpeechServices'
  identity: {
    type: 'None'
  }
  properties: {
    networkAcls: {
      defaultAction: 'Allow'
      virtualNetworkRules: []
      ipRules: []
    }
    publicNetworkAccess: 'Enabled'
  }
}

// Create OpenAI services to generate responses
resource OpenAI 'Microsoft.CognitiveServices/accounts@2023-10-01-preview' = {
  name: openai_instance_name
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    customSubDomainName: openai_instance_name
    publicNetworkAccess: 'Enabled'
  }
}

//Deploy a model onto OpenAI
resource deploymentModel 'Microsoft.CognitiveServices/accounts/deployments@2023-10-01-preview' = {
  parent: OpenAI
  name: openai_deploymentname
  sku: {
    name: 'Standard'
    capacity: 120
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'text-davinci-001'
      version: '1'
    }
    currentCapacity: 120
  }
}

// Responsible AI - So add a blocking filter
resource raiPolicy 'Microsoft.CognitiveServices/accounts/raiPolicies@2023-10-01-preview' = {
  name: 'Microsoft.Default'
  parent: OpenAI
  properties: {
    mode: 'Blocking'
    contentFilters: [
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Prompt'
      }
      {
        allowedContentLevel: 'Medium'
        blocking: true
        enabled: true
        source: 'Completion'
      }
    ]
  }
}
