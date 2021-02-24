# Status Indicator for Power Apps

## Summary

Short summary on functionality and used technologies.

This sample shows how to add a status indicator in a display form. This uses a train stop style user interface to show a progression of a status field from New to Completed. It provides the user with visibility into the status of their request providing a better experience for them.

### Home Screen
![Status Indicator Home Screen](./assets/powerapp-statusindicator.jpg)

### Display Screen
![Status Indicator Display Screen](./assets/powerapp-statusindicator2.jpg)


## Applies to

- [x] papps

- [ ] pautomate

- [ ] portals

- [ ] pva


## Prerequisites

> The solution requires a SharePoint site with an Issue Tracker list. Instructions below.

## Solution

Solution|Author(s)
--------|---------
Status-Indicator-PowerApp | Derek Cash-Peterson ([@spdcp](https://twitter.com/spdcp))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 24, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

### Data Sources 
This app uses SharePoint as a data source and requires a single issues list created from the Issues Template SharePoint Lists.

- Clone this repository
- Create a new list based on the Issue tracker template called "Issue tracker"
- Go to make.powerapps.com
- Select "New App" and "Canvas" from the dropdown
- Click "Open" from the left hand side
- Choose the "Browse"
- Navigate to the location where you cloned this repo
- Select the data tab in the left hand side
- Delete Issue tracker from the list of data sources in the app
- Create a new SharePoint data source linked to the Issue tracker list in your environment
- Save and Publish

### Create New SharePoint data connection

1. In the data tab click add data and enter SharePoint in the search bar.  
![SharePoint data source](./assets/sp-data-source1.jpg)
2. Enter the url of the list where the Issue tracker list was created.  
![SharePoint data source enter list](./assets/sp-data-source2.jpg)
3. Select Issue tracker from the listing of lists in the site and click Connect.  
![SharePoint data source enter list](./assets/sp-data-source3.jpg)

### Notes
If you would like to unpack and repack the .msapp you can use the [Power App Language Tooling](https://github.com/microsoft/PowerApps-Language-Tooling).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/readme-template" />