# Demonstration flow on how to process incoming excel email attachments, to group work items by EmailAddress for employees and email them their tasks

## Summary

This sample demonstrates how to receive an Excel File over email, download the file, save it to SharePoint, then process the file by grouping by value EmployeeEmail and then emailing each employee their work items in an HTML Table.
There are instructions and details in the assets folder, in a file called Excel GroupBy Example Phase I.docx

![Flow overview part 1](./assets/Flow_Image_1.jpg "Flow overview part 1")
![Flow overview part 2](./assets/Flow_Image_2.jpg "Flow overview Part 2")
![Flow overview part 3](./assets/Flow_Image_3.jpg "Flow overview Part 3")
![SharePoint Folder Details](./assets/Flow_Image_4.jpg "SharePoint Folder Details")


## Applies to

![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-green.svg "Does not use Premium license")
![On-Premises Connectors](https://img.shields.io/badge/On--Premises%20Connectors-No-green.svg "Does not use on-premise connectors")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-Not%20Required-green.svg "Does not use custom connectors")

## Contributors

* [Michael Gernaey](https://github.com/MichaelGernaey)

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 20, 2025|Initial release

## Prerequisites

### Instructions

* Review the Excel GroupBy Example Phase 1.docx that covers the entire flow from a functional and technical perspective
* Update the Flow based on the configuration details below, setting up your SharePoint Library and Folders, and Email addresses to use.
* If you want the Emails to work, go into the workitems.xlsx file in your assets and update the emails to point to real people
* If you do not you will simply get failed to send emails in your own mailbox
* Please use the workitems.xlsx in the assets folder for your Attachment
* Please use the term workitems for your Emails Subject. This is the email that you will send yourself(or whatever emai you configure) to trigger your flow
* Change the Connections and Folder pointers in the Flow to point to your own SharePoint
* Note: Image Flow_Image_4.jpg shows the folder structure I am using, you can use whatever you like as long as you configure it in the flow that way
* Change the Outlook Trigger Details pointing to the correct folder and account
* Change the Outlook Send Email, Email Addresses in the Catch, Success and if no (false) condition/action areas to send to whomever you like.
* These are emails that are intended to tell operations the status of the flow as part of the "business requirements in the document"
* NOTE: the 10 minute delay is due to the Excel locking issue it will go from seconds to upwards of 10 minutes when used with SharePoint
* The flow triggers when you send the attached workitems.xlsx, with a subject of workitems. Once triggered the flow will validate and then save
* the file in the SharePoint document library and folder you specify in the actions
* It will then process the excel file, grouping by unique Employee Email Address, and then emailing the employee only their workitems

## Minimal Path to Awesome

### Import Solution

* [Download](./solution/flow-excel-groupbyemail-notification-example.zip) the `.zip` from the `solution` folder
* [Import](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/import-update-export-solutions) the `.zip` file using **Solutions** > **Import Solution**.

### Using the source code

You can also use the [Power Apps CLI](https://docs.microsoft.com/powerapps/developer/data-platform/powerapps-cli) to pack the source code by following these steps:

* Clone the repository to a local drive
* Pack the source files back into a solution `.zip` file:

  ```bash
  pac solution pack --zipfile pathtodestinationfile --folder pathtosourcefolder --processCanvasApps
  ```

  Making sure to replace `pathtosourcefolder` to point to the path to this sample's `sourcecode` folder, and `pathtodestinationfile` to point to the path of this solution's `.zip` file (located under the `solution` folder)
* Within **Power Apps Studio**, import the solution `.zip` file using **Solutions** > **Import Solution** and select the `.zip` file you just packed.

## Features

This sample illustrates the following concepts:

* Reusablility
* Use of using Excel  
* Use of using Outlook Triggers
* Email Attachment Processing
* Creating a Unique Email by Grouping Excel Rows by Value
* Terminating Flows to capture Success or Failure into the Flow Detail 28 day Run Logs

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=utility-flow-for-aggregrate-operations-on-array&authors=@Solanki-Manish&title=utility-flow-for-aggregrate-operations-on-array).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=utility-flow-for-aggregrate-operations-on-array&authors=@Solanki-Manish&title=utility-flow-for-aggregrate-operations-on-array).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=utility-flow-for-aggregrate-operations-on-array&authors=@Solanki-Manish&title=utility-flow-for-aggregrate-operations-on-array).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/flow-excel-groupbyemail-notification-example" aria-hidden="true" />
