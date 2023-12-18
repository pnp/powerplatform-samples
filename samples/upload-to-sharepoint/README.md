# Upload to SharePoint

## Summary

Discover a seamless experience uploading Files from Canvas Apps to SharePoint.

📢 This project has been a labor of love, and it's now ready for you to explore. With this app, you can:

📱 Upload a file to SharePoint from Canvas App

![Screenshot 2023-09-02 130516](./assets/Screenshot%202023-11-10%20102848.png)

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-Yes-green "Yes")
![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")

## Compatibility
![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-No-red.svg "Does not rely on experimental features")

## Contributors

* [Shaheer Ahmad](https://github.com/shaheerahmadch)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 17, 2023|Initial release

## Prerequisites

* A SharePoint site

## Solution Components

The following solution components are used in this sample:

* Attachment Upload (Canvas App)
* SharePoint Connection Reference (Connection Referrence)
* SharePoint Site (Environment Variable)
* Upload a File to SharePoint (Flow)


## Minimal Path to Awesome

1. [Download](./solution/upload-to-sharepoint.zip) the solution `.zip` from the `solution` folder.
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

This sample illustrates the following concepts:

* Uploading Files from Canvas App to Sharepoint

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=upload-to-sharepoint&authors=@shaheerahmadch&title=upload-to-sharepoint%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=upload-to-sharepoint&authors=@shaheerahmadch&title=upload-to-sharepoint%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=upload-to-sharepoint&authors=@shaheerahmadch&title=upload-to-sharepoint%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/upload-to-sharepoint" />
