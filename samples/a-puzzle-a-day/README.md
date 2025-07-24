# A Puzzle a Day

## Summary

A **Puzzle a Day** is a clever twist on the classic tangram concept. You’re given 8 colorful, irregular shapes and a game board that resembles a 7×7 grid - but with a catch: some cells are blocked and unusable, which changes how the pieces fit.
Your goal: place all the pieces so that they don’t overlap, and exactly two valid cells remain empty - one for the month, and one for the day.

Behind the scenes, the entire game is powered by Named Formulas and User Defined Functions - a modern, maintainable approach to building logic in Power Apps. This design dramatically reduces code duplication, standardizes all calculations, and improves code redability by keeping the logic declarative and modular. Every shape move, rotation, or board update is calculated cleanly and efficiently.

![Game completed](./assets/a-puzzle-a-day.png)
![Game](./assets/a-puzzle-a-day-video.gif)

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-Yes-green "Yes")
![Power Automate](https://img.shields.io/badge/Power%20Automate-No-red "No")
![Power BI](https://img.shields.io/badge/Power%20BI-No-red "No")
![Power Pages](https://img.shields.io/badge/Power%20Pages-No-red "No")
![Power Virtual Agents](https://img.shields.io/badge/Power%20Virtual%20Agents-No-red "No")
![Dataverse](https://img.shields.io/badge/Dataverse-No-red "No")
![AI Builder](https://img.shields.io/badge/AI%20Builder-No-red "No")
![Custom Connectors](https://img.shields.io/badge/Custom%20Connectors-No-red "No")
![Power Fx](https://img.shields.io/badge/Power%20Fx-Yes-green "Yes")

## Compatibility

![Premium License](https://img.shields.io/badge/Premium%20License-Not%20Required-red.svg "Premium license not required")
![Experimental Features](https://img.shields.io/badge/Experimental%20Features-Yes-green.svg "Rely on experimental features")

## Contributors

* [Katerina Chernevskaya](https://github.com/Katerina-Chernevskaya)

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 17, 2025|Initial release

## Prerequisites

Make sure that experimental features are enabled: 
- User-defined functions
- User-defined types
![experimental-features](./assets/experimental-features.png)

## Minimal path to awesome

### Using the solution zip

* [Download](./solution/a-puzzle-a-day.zip) the `.zip` from the `solution` folder
* Within **Power Apps Studio**, import the solution `.zip` file using **Solutions** > **Import Solution** and select the `.zip` file you just packed.

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

- Fully declarative Power Fx architecture: no Power Automate, no connectors - built entirely with Named Formulas, User Defined Functions, and native Power Apps logic.
- Named Formulas as data model:
   - `nfCanva` — generates the board with titles and coordinates
   - `nfShapesDefault` — stores default shape geometry, rotations, positions
   - `nfForbiddenCells` — defines blocked cells on the board
- User Defined Functions (UDFs) for all game logic:
   - `udfShape(shapeName)` — central lookup returning all dynamic shape parameters
   - `udfShapeCanvaCells(shapeName)` — calculates absolute positions of shape cells based on position and rotation
   - `udfMovementAvailability(shapeName)` — returns movement availability in all four directions using smart collision detection
- Modular gameplay functions:
   - `udfMove(...)`, `udfRotate(...)`, `udfRemoveShape(...)` — all actions update both shape position and the board status (_canva)
   - `udfUpdateCanva(...)` — modular board painter used consistently for all shape actions

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, you can [create a new issue](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=a-puzzle-a-day&authors=@Katerina-Chernevskaya&title=a-puzzle-a-day%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=a-puzzle-a-day&authors=@Katerina-Chernevskaya&title=a-puzzle-a-day%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/powerapps-samples/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=a-puzzle-a-day&authors=@Katerina-Chernevskaya&title=a-puzzle-a-day%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/powerplatform-samples/samples/a-puzzle-a-day"  aria-hidden="true" />
