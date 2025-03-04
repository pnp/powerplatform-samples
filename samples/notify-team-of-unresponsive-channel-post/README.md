# Notify Team Of Unresponsive Channel Post

## Summary

This sample sends notification alert for an unresponsive channel post to the concern team after a specified period of time internal. The flow will monitor new incoming messages on Microsoft teams channel & remind the team to take the necessary action if no reply is sent by given minutes.

![Flow overview](./assets/flow-overview.png)


## Applies to

* [Power Automate](https://docs.microsoft.com/power-automate/)
* [Microsoft Graph](https://learn.microsoft.com/en-us/graph/)
* [Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/)

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Required-green.svg "Premium license not required")
![On-Premises Connectors](https://img.shields.io/badge/On--Premises%20Connectors-No-green.svg "Does not use on-premise connectors")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-Not%20Required-green.svg "Does not use custom connectors")


## Contributors

* [Manish Solanki](https://github.com/Solanki-Manish)


## Version history

Version|Date|Comments
-------|----|--------
1.0|Feb 1, 2025|Initial release


## Features

This sample illustrates the following concepts:

* Automate the activity of monitoring replies for team messages using standard connectors
* Standard action 'Send a Microsoft Graph HTTP request' 
* Graph API call to queries for a message replies using standard teams action
* Expression


## Prerequisites

### Connection References
The solution includes a connection references.
* Microsoft Teams Connection

### Environment Variable
When importing the solution, there are a variety of environment variables that need to be completed.

Variable|Type|Details
-------|----|--------
Channel ID | String | ID of the Microsoft Teams Channel.
Notification Message | String | Text message for reminder notification.
Teams ID | String | ID of the Microsoft Team Group.
Time limit to respond | String | Allowed time duration in minutes for users to respond.


## Minimal Path to Awesome

### Import Solution

* [Download](./solution/notify-team-of-unresponsive-channel-post.zip) the `.zip` from the `solution` folder
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

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=notify-team-of-unresponsive-channel-post&authors=@Solanki-Manish&title=notify-team-of-unresponsive-channel-post).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=notify-team-of-unresponsive-channel-post&authors=@Solanki-Manish&title=notify-team-of-unresponsive-channel-post).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=notify-team-of-unresponsive-channel-post&authors=@Solanki-Manish&title=notify-team-of-unresponsive-channel-post).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/notify-team-of-unresponsive-channel-post" aria-hidden="true" />
