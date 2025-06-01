# Title of the sample
Power Automate flow to automate sharing of a Canvas App

## Summary

This sample is a cloud flow that can be used to automate sharing of a canvas app. This flow initializes App ID variable & then uses a Switch condition to set the App ID variable based on the App Name present in a SharePoint List. It then leverages Apply to each to get users from SharePoint list, and uses Get User Entra ID action to get the user id based on email address. Finally, Edit App Role Assignment action is used to share the canvas app.

![Flow overview](/samples/power-automate-flow-to-share-an-app/assets/flow-overview.png)
![Flow overview](/samples/power-automate-flow-to-share-an-app/assets/switch-case.png)
![Flow overview](/samples/power-automate-flow-to-share-an-app/assets/apply-to-each.png)


## Applies to

![Power Automate](https://img.shields.io/badge/Power%20Automate-No-red "Yes")


## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-No-red.svg "Does not rely on experimental features")

## Contributors

* [Author Name](https://github.com/vipulj03/)

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 05, 2025|Initial release
----------------------------------
2.0|June 01, 2025|Updated Version with suggested changes

## Prerequisites
* This app uses Microsoft Entra ID connection.
* This app uses Edit App Role Assignment action.
* This app uses SharePoint as a data source and requires a SharePoint List with the following fields:
List Name: App Sharing
List Fields:
1. Users (Person or Group) => allow multiple selection = yes
2. AppName (Choice) => E.g. - names of your app in the environment
3. AppID (Single line of text) => enter the app ID of your app. This value will ve read dynamically in the flow.

## Features

This sample illustrates the following concepts:
* Automate the sharing of Canvas App, instead of manually sharing the app with multiple users
* Use of Switch case in power automate flow
* Use of Microsoft Entra ID action to get the user id
* Use of Edit App Role Assignment action to assign the users to an app

### Using the solution zip

* [Download](./solution/AppSharing.zip) the `.zip` from the `solution` folder
* Import the solution `.zip` file using **Solutions** > **Import Solution**