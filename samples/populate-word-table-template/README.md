# Populate Word Table Template

## Summary

Explore a comprehensive guide on automating document generation using Power Automate. This tutorial focuses on dynamically populating a Word template with data retrieved from Microsoft Dataverse and storing the generated document in OneDrive for Business.

🚀 This automation simplifies the document creation process, reducing manual efforts and ensuring consistency in your generated documents.


![Screenshot 2023-09-02 130516](./assets/Screenshot%202024-01-09%20115004.png)

## Applies to

![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")

## Compatibility
![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-No-red.svg "Does not rely on experimental features")

## Contributors

* [Shaheer Ahmad](https://github.com/shaheerahmadch)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 09, 2024|Initial release

## Prerequisites

* Microsoft Power Automate account
* Access to Microsoft Dataverse entities
* OneDrive for Business account

## Solution Components

The following solution components are used in this sample:

* Dataverse (Common Data Service) Connection Reference
* Word Online Business Connection Reference
* OneDrive for Business Connection Reference
* Receipts Table


## Minimal Path to Awesome

1. [Download](./solution/populate-word-table-template.zip) the solution `.zip` from the `solution` folder.
2. Within **https://make.powerapps.com**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded.
3. Follow the on-screen instructions to deploy the application.
4. Access the **Attachment Upload** Canvas App and start reporting incidents.

## Using the Source Code

You can also use the [Power Apps CLI](https://aka.ms/pac/docs) to pack the source code by following these steps:

1. Clone the repository to a local drive.
2. Pack the source files back into `.zip` file:
   ```bash
   pac solution pack --folder pathtosourcefolder --zipfile pathtosolution --processCanvasApps
   ```

## Features

* Manual trigger for document generation
* Retrieving records from Microsoft Dataverse
* Dynamically populating a Word template
* Converting HTML to PDF
* Storing generated documents in OneDrive for Business

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=populate-word-table-template&authors=@shaheerahmadch&title=populate-word-table-template%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=populate-word-table-template&authors=@shaheerahmadch&title=populate-word-table-template%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=populate-word-table-template&authors=@shaheerahmadch&title=populate-word-table-template%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/populate-word-table-template" />
