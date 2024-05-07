# SharePoint 'My Tools'

## Summary

This is a proof of concept Power Apps solution that was designed to be embedded within a SharePoint site/page as a Web Part. It is designed to provide the user with a customizable list of 'Tools' (known as 'My Tools') which are typically line of business systems that an organization uses and are provided as URLs. 

Through this toolbox, users can get quick access to apps they use frequently in their day to day work. This kind of solution works best when embedded within Intranet sites/Viva Connections.

This was created to fill a gap in SharePoint/Viva Connections and as an alternative to a custom developed SPFx solution. 

The use of a low code/no code Power App means there is no need for custom development.

The look and feel has been designed to replicate that of the out of the box Web Part.

The 'My Tools' end user app is fully responsive so can still render on a SharePoint page on a mobile device.

The solution also includes an 'Admin' Power App which is a separate canvas app, this admin app (typically designed to be accessed through Microsoft Teams or the Power Apps portal) provides a front end for managing tools.

Tools can be marked as 'mandatory' which means all users see the tool by default and it cannot be removed from their list.

The solution is functionally complete but is provided as a POC for you to customise/extend as required.

The end user app uses classic controls and the admin app uses a mix of the new modern controls and classic controls. The admin app is styled using the new Power Apps 'themes' functionality and can be changed simply by choosing a new theme.

The data source comprises of 2 SharePoint lists, one to store the tools and one to store the users and tools they have added to their toolbox. All queries in both Power Apps are delegable.

![Preview](./assets/thumbnail.png)  

![Preview - Edit Tools](./assets/edittools.png)

![Preview - Admin App](./assets/mytoolsadmin.png)

![Preview - List of Apps](./assets/mytoolspowerapps.png)

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-Yes-green "Yes")
![Power Fx](https://img.shields.io/badge/Power%20Fx-Yes-green "Yes")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-Yes-green.svg "Does rely on experimental features")

## Contributors

* [Alex Clark - Microsoft](https://github.com/alexc-MSFT)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|Sep 14, 2023|Initial release

## Prerequisites

* Power Apps environment
* Permissions to edit the page you wish to add the Power App to
* Permissions to roll out the 'Admin' app to Teams (optional)
* SharePoint modern Team Site OR Communication Site
* Permissions to create lists in the above site
* Power Apps 'Creator kit' deployed to the same Power Apps environment - https://learn.microsoft.com/en-us/power-platform/guidance/creator-kit/overview

## Solution Components

The following solution components are used in this sample:

* My Tools (Canvas app)
* My Tools Admin (Canvas app)

## Data Sources

* SharePoint

### Using the sample

Follow the instructions below to deploy this sample to your tenant. Once deployed, the end user app (My Tools) is designed to be embedded within a SharePoint page.

I would recommend using the 'Embed' Web Part and defining your own size. This works much better than the native Power Apps Web Part in terms of how it looks on the page. 

The recommended size is as follows:

Width: 1024px
Height: 340px

It is worth noting that the deployment instructions below assume a proficient level of knowledge of Power Apps and SharePoint Online.

All users who will use the solution will need a Power Apps 'seeded' license.

**Currently users cannot order their own tools, this is defined by the order set in the Admin app.**

## Minimal Path to Awesome

### Create supporting SharePoint lists

#### Tools

1. Create a new list named **Tools** in your SharePoint site.
2. Create the following colummns:

***

Internal name: ToolName

Display name: Tool Name

Type: Single line of text


***


Internal name: ToolImage

Display name: Tool Image

Type: Image


***

Internal name: ToolLink

Display name: Tool Link

Type: Hyperlink

***

Internal name: IsMandatory

Display name: Is Mandatory

Type: Yes/No

Default value: No

***

Internal name: Order

Display name: Order

Type: Number

***

3. Edit the settings for the **Title** field and set it to not required.

#### User Tools

1. Create a new list named **UserTools** in your SharePoint site.
2. Rename the list and add a space so the name becomes **User Tools**.
3. Create the following columns:

***

Internal name: ToolId

Display name: ToolId

Type: Number

***


Internal name: User

Display name: User

Type: Person or Group


***

4. Edit the settings for the **Title** field and set it to not required.

### Import Power Apps solution

1. Download the **[Unmanaged](./solution/sharepoint-mytools.zip)** solution `.zip` from the **solution** folder.

2. Within **<https://make.powerapps.com>**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded.

3. Click next.

4. Click Import. It is worth noting that the solution does not use environment variables at the time of writing due to a bug with SharePoint list environment variables where image columns are used.

5. Edit both the **My Tools** and **My Tools Admin** Apps and update the data sources - you will need to remove the 2 SharePoint lists from the data sources pane and re-add them. They may appear that they are pointing correctly but they will be pointing at the tenant the app was exported from. Simply remove them, point to your SharePoint site and add the 2 lists again.

6. Update the color in the OnStart event to match your SharePoint branding. Locate the below formula and update the hex code. This will update the colors in the app.

`
Set(gblMyToolsColor,"#0078d4");
`

7. Save and publish both Apps. 

8. Get the unique Id for the **My Tools** Power App from your tenant - Navigate to the Power Apps portal, select the app and click **Details** on the menu bar. Copy the **App ID** value.

9. Embed the app in a SharePoint page. You can use the following embed code, replace the GUID after /apps/ with the Id you copied above. Feel free to change the size as you see fit.

`<iframe width="1024px" height="340px" src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&amp;screenColor=rgba(104,101,171,1)&amp;appId=/providers/Microsoft.PowerApps/apps/6cfd9913-5dac-48f8-b096-520fdf9ece6c"></iframe>`

10. Republish your SharePoint page.

11. Share the app with ALL users that have access to/will use your SharePoint site.

12. Share the SharePoint lists with the same users as above, users need READ access to the **Tools** list and READ/WRITE access to the **User Tools** list. Admins will need WRITE access to both lists.

## Using the Source Code

You can also use the [Power Apps CLI](https://aka.ms/pac/docs) to pack the source code by following these steps::

* Clone the repository to a local drive.
* Pack the source files back into `.zip` file:

  ```bash
  pac solution pack --folder pathtosourcefolder --zipfile pathtosolution  --processCanvasApps
  ```

  Making sure to replace `pathtosourcefolder` to point to the path to this sample's `sourcecode` folder, and `pathtosolution` to point to the path of this solution's `.zip` file (located under the `Solutions` folder).
* Within **<https://make.powerapps.com>**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded.
* Click next.
* Click import.
* Follow the steps above to configure and use the apps.

## Features

This sample app is a great way to learn some fundamental Power Apps concepts like:

* Branding out-of-the-box controls
* Creating and using components
* Working with SharePoint as a data source
* Using and creating dialog boxes
* Power Fx Formulas
* Working with local collections
* Building custom UIs
* Responsive design
* Using containers to build responsive layouts
* Working with modern controls

### How to use the solution

#### Creating, editing and deleting tools

Tools can be created, edited and deleted using the Admin app. Simply launch the admin app through Power Apps OR add the admin app to Teams and roll this out to admins.

The admin app is fairly self explanatory and consists of 3 screens:

- All Tools - View of all tools with options to Edit, Delete and search for tools.
- Manage Tools - Table view of all tools with options to Edit, Delete and change the order of tools. Changing the order of tools affects the order that they display to users.
- Create tool - Allows you to create a new tool using a simple form. 

Tools marked as mandatory will appear for all users in their toolbox even if they have not added it (they cannot remove mandatory tools).

![Preview - Admin App Edit Tool](./assets/adminappedittool.png)  

![Preview - Admin App Manage Tools](./assets/adminappmanagetools.png) 

#### End user app

Users can add/remove tools from their toolbox by clicking the **Edit** icon. The star icon allows users to add/remove tools from their toolbox. Mandatory tools do not display this icon.

Users can search for tools using the searchbox in both **Edit** mode and **View** mode.

Clicking the tile for a tool launches the URL configured for the tool in a new window.

Tools are displayed in a horizontal gallery format and can be scrolled.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=sharepoint-mytools&authors=@alexc-MSFT&title=sharepoint-mytools%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=sharepoint-mytools&authors=@alexc-MSFT&title=sharepoint-mytools%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=sharepoint-mytools&authors=@alexc-MSFT&title=sharepoint-mytools%20-%20).

## For more information

* [Overview of creating apps in Power Apps](https://docs.microsoft.com/powerapps/maker/)
* [Power Apps canvas apps documentation](https://docs.microsoft.com/powerapps/maker/canvas-apps/)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/sharepoint-mytools" aria-hidden="true" />