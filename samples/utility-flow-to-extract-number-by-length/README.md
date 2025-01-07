# Utility flow to extract number by length

## Summary

This sample is a reusable child cloud flow that can be used for extracting a number by its length from a string. This flow takes input string and length of a digit or number to be extracted an its input parameters. This child flow can be called from the parent flow with the appropriate input parameters.

![Flow overview](/samples/utility-flow-to-extract-number-by-length/assets/flow-overview.png "Flow overview")

## Applies to

![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-green.svg "Does not use Premium license")
![On-Premises Connectors](https://img.shields.io/badge/On--Premises%20Connectors-No-green.svg "Does not use on-premise connectors")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-Not%20Required-green.svg "Does not use custom connectors")

## Contributors

* [Manish Solanki](https://github.com/Solanki-Manish)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 2, 2025|Initial release

## Prerequisites

The caller parent flow should be solution aware to call this child flow using "Run a Child Flow" action.

## Minimal Path to Awesome

### Import Solution

* [Download](./solution/utility-flow-to-extract-number-by-length.zip) the `.zip` from the `solution` folder
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

* Reusablility using child flow 
* Perform string parsing to extract number by its length from a given input text or string 
* Use of Select & Filter action
* Expression

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=utility-flow-to-extract-number-by-length&authors=@Solanki-Manish&title=utility-flow-to-extract-number-by-length).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=utility-flow-to-extract-number-by-length&authors=@Solanki-Manish&title=utility-flow-to-extract-number-by-length).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=utility-flow-to-extract-number-by-length&authors=@Solanki-Manish&title=utility-flow-to-extract-number-by-length).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/utility-flow-to-extract-number-by-length" aria-hidden="true" />
