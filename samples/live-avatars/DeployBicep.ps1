# Parameters
$resourceGroupName = "avatar-demo-group"
$bicepFilePath = "live-avatar.bicep"
$avatar_name  = 'ionaavatardemo'
$openai_instance_name  = 'openaiforavatardemo'
$openai_deploymentname  = 'avatarname'

# Install Az module and log on to Azure
Install-Module -Name Az -AllowClobber -Force -Scope CurrentUser
Connect-AzAccount -TenantId 8ed42453-85a2-4957-935b-a70352369dc2 
Set-AzContext -Subscription 51e2a291-75d0-42b8-a4e4-477e1922dfbd

# Deploy Bicep file with overridden parameter
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateFile $bicepFilePath -avatar_name $avatar_name -openai_instance_name $openai_instance_name -openai_deploymentname $openai_deploymentname

