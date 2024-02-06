# Create Notes From Canvas

## Summary

This Canvas App is designed to handle notes related to an OOB (out-of-the-box) account table. Despite the default Notes table lacking an attachment column, we’ve devised a workaround by creating a custom card with an attachment control.

Key Features:

Users can add, remove, and undo attachments.

Binary data of attached images is captured and stored.

The app supports various document types.

![Screenshot 2023-09-02 130516](./assets/Screenshot%202023-10-21%20160340.png)


## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-Yes-green "Yes")

## Compatibility
![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-No-red.svg "Does not rely on experimental features")

## Contributors

* [Shaheer Ahmad](https://github.com/shaheerahmadch)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 06, 2024|Initial release

## Prerequisites

* OOB Notes Table
* OOB Accounts Table


## Solution Components

The following solution components are used in this sample:

* Create Notes From Canvas (Canvas App)
* Accounts Table (Dependency)
* Notes Table (Dependency)

## Minimal Path to Awesome

1. [Download](./solution/create-notes-from-canvas.zip) the solution `.zip` from the `solution` folder.
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

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=create-notes-from-canvas&authors=@shaheerahmadch&title=create-notes-from-canvas%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=create-notes-from-canvas&authors=@shaheerahmadch&title=create-notes-from-canvas%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=create-notes-from-canvas&authors=@shaheerahmadch&title=create-notes-from-canvas%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/create-notes-from-canvas" />
