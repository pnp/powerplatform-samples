# Send Inline Image In Teams Channel

## Summary

This sample gets the image from SharePoint document library and post it on *Microsoft Teams* channel using **Power Automate**. The flow utilizes standard **Send Microsoft graph request** action to overcome the payload size limit of 28 KB.

![Flow overview](/samples/Send-Inline-Image-In-Teams-Channel/assets/flow-overview.png "Flow overview")


## Applies to

* [Power Automate](https://docs.microsoft.com/power-automate/)
* [Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/)

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-green.svg "Premium license not required")
![On-Premises Connectors](https://img.shields.io/badge/On--Premises%20Connectors-No-green.svg "Does not use on-premise connectors")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-Not%20Required-green.svg "Does not use custom connectors")


## Contributors

* [Manish Solanki](https://github.com/Solanki-Manish)


## Version history

Version|Date|Comments
-------|----|--------
1.0|May 21, 2024|Initial release


## Features

This sample illustrates the following concepts:

* Post embed image in Teams Channel message
* Overcome the payload size limit (28 KB)
* Send a Microsoft Graph HTTP request using standard action 
* Expression


## Prerequisites

* This Flow requires an image to be present in SharePoint document library (inside site asset).
* A Microsoft Teams with a channel where image needs to be shared via message.

### Connection References
The solution includes two connection references.
* SharePoint Connection
* Microsoft Teams Connection

## Minimal Path to Awesome

### Import Solution

* [Download](./solution/send-inline-image-in-teams-channel.zip) the `.zip` from the `solution` folder
* [Import](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/import-update-export-solutions) the `.zip` file using **Solutions** > **Import Solution**.

### Configure Flow

1. Once the solution is imported, edit it
1. Select **Get file content** action and replace the **Site Address** and the **File Identifier** to point to your SharePoint site and image file.
   ![Configure Get file content action](./assets/config1.png)
1. Select **Get team** action and choose a MS team from the drop down.
   ![Configure Get team action](./assets/config2.png)
1. Save and test the flow.

### Using the source code

You can also use the [Power Apps CLI](https://docs.microsoft.com/powerapps/developer/data-platform/powerapps-cli) to pack the source code by following these steps:

* Clone the repository to a local drive
* Pack the source files back into a solution `.zip` file:

  ```bash
  pac solution pack --zipfile pathtodestinationfile --folder pathtosourcefolder --processCanvasApps
  ```

  Making sure to replace `pathtosourcefolder` to point to the path to this sample's `sourcecode` folder, and `pathtodestinationfile` to point to the path of this solution's `.zip` file (located under the `solution` folder)
* Within **Power Apps Studio**, import the solution `.zip` file using **Solutions** > **Import Solution** and select the `.zip` file you just packed.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=Send-Inline-Image-In-Teams-Channel&authors=@Solanki-Manish&title=Send-Inline-Image-In-Teams-Channel).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=Send-Inline-Image-In-Teams-Channel&authors=@Solanki-Manish&title=Send-Inline-Image-In-Teams-Channel).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=Send-Inline-Image-In-Teams-Channel&authors=@Solanki-Manish&title=Send-Inline-Image-In-Teams-Channel).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/Send-Inline-Image-In-Teams-Channel" aria-hidden="true" />