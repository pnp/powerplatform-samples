# Parameters
$resourceGroupName = "avatar-demo-group" # Change to the name of your resource group
$bicepFilePath = "live-avatar.bicep" # # Change to the name of your path
$avatar_name  = 'ionaavatardemo' # Change to the name of your liking for the Avatar text-to-speech services
$openai_instance_name  = 'openaiforavatardemo' # Change to the name you want for the OpenAI instance
$openai_deploymentname  = 'avatarname' # Change to the name of your OpenAI model deployment

# Install Az module and log on to Azure
Install-Module -Name Az -AllowClobber -Force -Scope CurrentUser
Connect-AzAccount -TenantId 39c9ce23-27e9-464a-8a10-30ea6a6ec26f # Change to your Azure tenant ID
Set-AzContext -Subscription 39c9ce23-27e9-464a-8a10-30ea6a6ec26f # Change to your subscription ID, this step may be obsolete when only 1 subscription is present

# Deploy Bicep file with overridden parameter
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateFile $bicepFilePath -avatar_name $avatar_name -openai_instance_name $openai_instance_name -openai_deploymentname $openai_deploymentname

