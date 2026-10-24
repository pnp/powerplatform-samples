// params

@description('Log Analytics Workspace name')
param namelaw string

@description('Application Insights name')
param nameappins string

@description('Resource Location')
param location string

@description('Tags')
param tags object

// resource

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: namelaw
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 90
    workspaceCapping: {
      //dailyQuotaGb: '0.05'
      dailyQuotaGb: 1
    }
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: nameappins
  location: (((location == 'eastus2') || (location == 'westcentralus')) ? 'southcentralus' : location)
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

// outputs

output appInsightsName string = applicationInsights.name
output appInsightsId string = applicationInsights.id
output logAnalyticsWorkspace string = logAnalyticsWorkspace.name
