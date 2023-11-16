[
  {
    "name": "pnp-powerplatform-samples-patchtuesday",
    "source": "pnp",
    "title": "patchtuesday",
    "shortDescription": "Methods for calculating Microsoft Patch Tuesday values",
    "url": "https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday",
    "downloadUrl": "https://pnp.github.io/download-partial/?url=https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday",
    "longDescription": [
"Methods for calculating Microsoft Patch Tuesday values. Sample includes (1) an instant cloud flow that will provide a timestamp for Patch Tuesday in the current month, (2) a scheduled cloud flow to run every Tuesday that will determine if it is running on Patch Tuesday, (3) a canvas app that will return a timestamp for Patch Tueday when selecting an arbitrary date, and (4) an instant cloud flow, to support the arbitrary date app.

(1) Instant cloud flow that will provide a timestamp for Patch Tuesday in the current month (see https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday/assets/PatchTuesday.png)

This is a manually-triggered cloud flow that uses built-in PowerFx functions to get the start date for the current month and the day-of-the-week associated with that start date.  The flow then references an array (DaysToAddArray) to look up the number of days to add to the month start date (taking into account the day-of-the-week) to arrive at Patch Tuesday.  This is the most straight-forward way I've found to calculate the Patch Tuesday date without a kludgy set of if/then statements or loops.  Instead, the day-of-week value is used as the index number of the array.  The array values are:
0,0
1,8
2,7
3,13
4,12
5,11
6,10
7,9
For example, if the 1st day of the current month is on a Wednesday, the PowerFx function returns a "3".  The number "13" is stored in index 3 of the array, so 13 days are added to the 1st day of the month.  The final flow statement composes the output text string in timestamp format, which can be used in any necessary subsequent steps.

(2) Scheduled cloud flow to run every Tuesday (see https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday/assets/IsItPatchTuesdayFlow.png)

This is a cloud flow that must be scheduled to run only on every Tuesday.  The purpose is to automate actions that must occur on Patch Tuesday.  Rather than use the method in (1) above to calculate the date of Patch Tuesday, scheduling the flow to run on Tuesdays allows a simple check to be made against today's date to see if today is the "right" Tuesday.  The true/false condition in this flow simply asks if two conditions are met (for a true result):
-Is the start of month date now the same date as the start of month was 7 days ago?
AND
-Is the start of month date now a different date than the start of month was 14 days ago?

(3) Canvas app that will return a timestamp for Patch Tuesday when selecting an arbitrary date (see https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday/assets/ArbitraryPatchTuesdayApp.png)

This is a very simple canvas app that has a date picker control.  Once you select a date, the "On Change" property of the date picker runs a Power Automate flow (see (4) below) to obtain the timestamp associated with Patch Tuesday, relative to the selected date.  That timestamp is returned to a label control in Power Apps".

(4) Instant cloud flow to support the arbitrary date app (see https://github.com/pnp/powerplatform-samples/tree/main/samples/patch-tuesday/assets/ArbitraryPatchTuesdayFlow.png)

This is the cloud flow that is run by the app in (3) above.  The logic is identical to (1) above, with the exception that the date selected in the app's date picker control is used, rather than today's date, to get the first day of the month."
    ],
    "creationDateTime": "2023-11-16",
    "updateDateTime": "2023-11-16",
    "products": [
      "Power Apps",
      "Power Automate"
    ],
    "tags": [
      "Patch Tuesday"
    ],
    "categories": [
      "CANVAS",
      "CLOUD-FLOW",
    ],
    "metadata": [
      {
        "key": "POWERAPPS-EXPERIMENTAL",
        "value": "No"
      },
      {
        "key": "POWERAPPS-PREMIUM",
        "value": "No"
      },
      {
        "key": "POWERAPPS-ONPREM",
        "value": "No"
      },
      {
        "key": "POWERAPPS-CUSTOMCONNECTOR",
        "value": "No"
      }
    ],
    "thumbnails": [
      {
        "type": "image",
        "order": 100,
        "url": "https://github.com/pnp/powerplatform-samples/raw/main/samples/patch-tuesday/assets/PatchTuesday.png",
        "alt": "Flow preview"
      }
    ],
    "authors": [
      {
        "gitHubAccount": "korebreach",
        "pictureUrl": "https://avatars.githubusercontent.com/u/16405579?v=4",
        "name": "Bob Lamaster"
      }
    ],
    "references": [
      {
      }
    ]
  }
]