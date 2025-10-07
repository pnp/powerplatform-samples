# Azure HTTP Key Vault

## Summary

A HTTP Request via Graph API to Azure Key Vault  

![picture of the flow](assets/flow.png)

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-No-red "No")
![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")
![Power BI](https://img.shields.io/badge/Power%20BI-No-red "No")
![Power Pages](https://img.shields.io/badge/Power%20Pages-No-red "No")
![Power Virtual Agents](https://img.shields.io/badge/Power%20Virtual%20Agents-No-red "No")
![Dataverse](https://img.shields.io/badge/Dataverse-No-red "No")
![AI Builder](https://img.shields.io/badge/AI%20Builder-No-red "No")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-No-red "No")
![Power Fx](https://img.shields.io/badge/Power%20Fx-No-red "No")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Required-green.svg "Premium license required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-No-red.svg "Does not rely on experimental features")

## Contributors

* [Divya Akula](https://github.com/divya-akula)



## Version history

Version|Date|Comments
-------|----|--------
1.0|Sep 18, 2022|Initial release
2.0|October 07, 2025|Migration from powerapps-samples repository with solution repacking by [Jan Chlebek](https://github.com/jan-chlebek)

## Minimal Path to Awesome
* [Download](./solution/azure-http-key-vault.zip) the `.zip` from the `solution` folder
* Within **Power Automate**, import the solution `.zip` file using **Solutions** > **Import Solution** and select the `.zip` file you just packed.

## Features

Azure Key vault helps us to securely store passwords ,Power Automate has an inbuilt connector that helps us to retrieve the passwords safely,  but when moving the flows across tenants , we might need to reconfigure the flow for appropriate credentials. To prevent this we can go with the graphapi invocation to azure using the HTTP connector.

This pattern also helps to understand the OAuth way of invoking a Azure or any other resource that supports OAuth.

Prerequisites:
As the app uses HTTP way to connect to Azure platform , the connector would need appropriate permissions to invoke an Azure Resource.To do this
1. User has to navigate to [Azure Portal](https://portal.azure.com)
2. Create new App registration as shown in the below screenshot

![picture of the flow](assets/AppRegistration.png)

3. Once the application is registered,navigate to the **API Permissions** > **Add Permission** > **Select Microsoft Graph** > **APIConnectors.Read.All**

![picture of the flow](assets/AzurePermissionRequest.png)

4. Once the permissions are requested , the administrator has to give the consent before using the HTTP connector

![picture of the flow](assets/AzurePermissionConfiguration.png)



## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=azure-http-key-vault&authors=@divya-akula&title=azure-http-key-vault%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=azure-http-key-vault&authors=@divya-akula&title=azure-http-key-vault%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=azure-http-key-vault&authors=@divya-akula&title=azure-http-key-vault%20-%20).


## For more information

- [Create your first flow](https://docs.microsoft.com/en-us/power-automate/getting-started#create-your-first-flow)
- [Microsoft Power Automate documentation](https://docs.microsoft.com/en-us/power-automate/)



## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/azure-http-key-vault"  aria-hidden="true" />