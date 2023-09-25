# Incident Reporting Canvas Application

## Summary

The Incident Reporting Canvas Application is a powerful tool designed to streamline incident reporting and enhance data collection. With its unique and visually appealing phone layout UI/UX, this application provides an efficient and user-friendly solution for reporting and managing incidents. Seamlessly integrated with SharePoint, it allows users to upload incident images and related data securely.

![Incident Reporting Canvas App Preview](assets/preview.png)

## Applies to

* [Microsoft Power Apps](https://docs.microsoft.com/powerapps/)

## Authors

Solution|Author(s)
--------|---------
IncidentReportingApp | [Shaheer Ahmad](https://github.com/shaheerahmadch) [LinkedIn](https://www.linkedin.com/in/shaheer-ahmad-ch), 365Connect Community

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 25, 2023|Initial release

## Features

This sample illustrates the following concepts:

* Streamlined incident reporting process
* Visually appealing phone layout UI/UX
* Seamless integration with SharePoint for data storage
* Real-time collaboration and notifications
* Customizable reporting forms
* Data analytics for incident insights

## Prerequisites

Before using this application, ensure you have the following:

* A SharePoint site with the required permissions.
* A SharePoint list named "IncidentReports" with the following columns:
  - Title (Single line of text, Required)
  - Description (Multiple lines of text, Optional)
  - IncidentImage (Image, Optional)
  - IncidentType (Choice, Required)
  - IncidentDate (Date and Time, Required)
* Two connection references:
  - Outlook (for notification emails)
  - Dataverse (for data storage)
* Two environment variables for SharePoint site and list URLs.
* An Automate flow for assigning incidents to the team.
* A Model-Driven App for management.

## Solution Components

The following solution components are used in this sample:

* Incident Reporting Canvas App (Canvas app)
* SharePoint Integration (Connection)
* Dataverse Integration (Connection)
* Outlook Integration (Connection)
* Environment Variables (Power Apps)
* Automate Flow (Power Automate)
* Model-Driven App (Power Apps)

## Data Sources

### Incident Reports List

This SharePoint list contains incident report data, including incident details and uploaded images.

|Type|Internal Name|Required|
|---|---|:---:|
|Single line of text|Title|Yes|
|Multiple lines of text|Description|No|
|Image|IncidentImage|No|
|Choice|IncidentType|Yes|
|Date and Time|IncidentDate|Yes|

## Minimal Path to Awesome

1. [Download](./solutions/IncidentReporting_1_0_0_2.zip) the solution `.zip` from the `solution` folder.
2. Within **https://make.powerapps.com**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded.
3. Follow the on-screen instructions to deploy the application.
4. Access the Incident Reporting Canvas App and start reporting incidents.

## Using the Source Code

You can also use the [Power Apps CLI](https://aka.ms/pac/docs) to pack the source code by following these steps:

1. Clone the repository to a local drive.
2. Pack the source files back into `.zip` file:
   ```bash
   pac solution pack --folder pathtosourcefolder --zipfile pathtosolution  --processCanvasApps
