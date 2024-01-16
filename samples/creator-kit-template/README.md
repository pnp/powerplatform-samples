# Creator Kit Template

## Summary

Discover a seamless experience with our responsive canvas app – Enjoy a familiar interface with modern convenience, making communication a breeze.

📢 This project has been a labor of love, and it's now ready for you to explore. With this app, you can:

📱 Enjoy a user-friendly, responsive design

🌐 Manage your Accounts & Contacts

📢 Upload Documents to SharePoint

![Screenshot 2023-09-02 130516](./assets/Screenshot%202023-10-21%20160340.png)


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

* [Creator Kit](https://learn.microsoft.com/power-platform/guidance/creator-kit/overview?wt.mc_id=studentamb_280505)
* SharePoint Site (For Document Upload)

## Solution Components

The following solution components are used in this sample:

* Creator Kit Template (Canvas app)
* Documents (Environment Variable)
* SharePoint Connection Reference (Connection Reference)
* SharePoint Site (Environment Variable)
* Upload a File to SharePoint (Flow)

## Minimal Path to Awesome

1. [Download](./solution/creator-kit-template.zip) the solution `.zip` from the `solution` folder.
2. Within **https://make.powerapps.com**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded.
3. Follow the on-screen instructions to deploy the application.
4. Access the Creator Kit Template Canvas App.

## Using the Source Code

You can also use the [Power Apps CLI](https://aka.ms/pac/docs) to pack the source code by following these steps:

1. Clone the repository to a local drive.
2. Pack the source files back into `.zip` file:
   ```bash
   pac solution pack --folder pathtosourcefolder --zipfile pathtosolution  --processCanvasApps
   ```

## Features

This sample illustrates the following concepts:

* Streamlined messaging process
* Visually appealing phone layout UI/UX
* Real-time collaboration

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=creator-kit-template&authors=@shaheerahmadch&title=creator-kit-template%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=creator-kit-template&authors=@shaheerahmadch&title=creator-kit-template%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=creator-kit-template&authors=@shaheerahmadch&title=creator-kit-template%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/creator-kit-template" />
