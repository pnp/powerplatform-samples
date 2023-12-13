# Live Avatar

## Summary

This sample illustrates how to use OpenAI services in Power Apps to generate answers to questions and visualize them with **Live Avatars** generated with the Text-to-Speech services on Azure.

https://github.com/Ionavoss/powerplatform-samples/assets/46789417/aca2939c-9dc5-4c00-bf41-ba5b224cda20

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-Yes-green "Yes")
![Power Automate](https://img.shields.io/badge/Power%automate-Yes-green "Yes")
![Azure](https://img.shields.io/badge/Azure-Yes-green "Yes")
![Power BI](https://img.shields.io/badge/Power%20BI-No-red "No")
![Power Pages](https://img.shields.io/badge/Power%20Pages-No-red "No")
![Power Virtual Agents](https://img.shields.io/badge/Power%20Virtual%20Agents-No-red "No")
![Dataverse](https://img.shields.io/badge/Dataverse-No-red "No")
![AI Builder](https://img.shields.io/badge/AI%20Builder-No-red "No")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-No-red "No")
![Power Fx](https://img.shields.io/badge/Power%20Fx-No-red "No")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Required-green.svg "Premium license required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-Yes-green.svg "Does rely on experimental features")

## Contributors

- [Iona Varga](https://github.com/Ionavoss)
- [Daniel Laskewitz](https://github.com/laskewitz)

## Version history

Version|Date|Comments
-------|----|--------
1.0|December 12, 2023|Initial release

## Features

This sample illustrates how to send a prompt to OpenAI services in Azure with Power Automate and visualize the response with the **Live Avatar** service from Azure. 

## Minimal Path to Awesome

* [Download](./assets/InstallBicep.ps1) the `InstallBicep.ps1` from the `assets` folder
* Run the PowerShell script to install Bicep
* [Download](./assets/live-avatar.bicep) the `.Bicep` template and [Download](./assets/DeployBicep.ps1) the `DeployBicep.ps1` from the `assets` folder
* Modify the `DeployBicep.ps1` file, change the parameters to the desired values 
* [Download](./solution/LiveAvatar_1_0_0_1.zip) the `.zip` from the `solution` folder
* Within **Power Apps Studio**, import the solution `.zip` file using **Solutions** > **Import Solution** and select the `.zip` file you just packed.
* Set the environment variables to the values inserted into the `DeployBicep.ps1` file.
* In Azure OpenAI, copy the API Key and paste in the Environment variable
* In Azure AI Services, copy the API Key for the TTS-service and paste it in the Environment variable

The environment variables are as follow:

| Environment Variable     | What needs to be provided      |
|--------------------------|--------------------------------|
| Env-aiServicesApiKey     | Key from the Azure AI Services |
| Env-OpenAIDeploymentName | Maps to $openai_deploymentname |
| Env-OpenAIResourceName   | Maps to $openai_instance_name  |
| Env-OpenAIApiKey         | Key from the OpenAI services   |
| Env-azureRegion          | Default region westeurope      |

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT. TESTED WITHIN REGION WESTEUROPE, OTHER REGIONS MIGHT NOT WORK**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

## For more information

* [Overview of creating apps in Power Apps](https://docs.microsoft.com/powerapps/maker/)
* [Power Apps canvas apps documentation](https://docs.microsoft.com/powerapps/maker/canvas-apps/)

---
