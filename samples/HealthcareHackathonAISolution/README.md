# Healthcare AI Chatbot

## Summary

This sample uses a Power Virtual Agents chatbot to diagnose and suggest a fitting doctor based on the user's inputted symptoms.

![picture of the sample](assets/portal-chatbot.png)

## Prerequisites

* A Dataverse user account with access to System Admin Security Role
* An existing Power Pages site (optional, files will be provided in the "powerpages-portalfiles" folder)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.1|Sept. 27, 2023|Initial release

## Applies to

![Power Apps](https://img.shields.io/badge/Power%20Apps-No-red "No")
![Power Automate](https://img.shields.io/badge/Power%20Automate-Yes-green "Yes")
![Power BI](https://img.shields.io/badge/Power%20BI-No-red "No")
![Power Pages](https://img.shields.io/badge/Power%20Pages-Yes-green "Yes")
![Power Virtual Agents](https://img.shields.io/badge/Power%20Virtual%20Agents-Yes-green "Yes")
![Dataverse](https://img.shields.io/badge/Dataverse-Yes-green "Yes")

## Features

The PVA chatbot lets the user input their current symptoms to let the Chatbot diagnose the user via generative answers located in the of the chatbot's topic. 

![picture of the pva step](assets/pva-generativeanswers.png)

After that, the chatbot displays an adaptive card asking for a specific date & time 

![picture of the pva step](assets/pva-adaptive-card.png)

From there, a Power Automate flow in the same topic uses AI to check the user's symptoms for any key words/phrases, then uses that to determine which doctor is the best fit for them based on their specialization. It also checks whether the doctor wil lbe available based on the user's selected date & time on the previous step.

![picture of the pa flow](assets/pa-flow-steps.png)


There are also 2 alternate topics in the chatbot: 
* One for directly setting up a consultation with a specific doctor by specifying the requested doctor and date & time of the appointment
![picture of the consultation pva topic](assets/pva-consultation-1.png)
![picture of the consultation pva topic](assets/pva-consultation-2.png)

* And another one for requesting an ambulance on demand
![picture of the ambulance pva topic](assets/pva-ambulance-1.png)
![picture of the ambulance pva topic](assets/pva-ambulance-2.png)


## Data Sources

* Dataverse

## Minimal Path to Awesome

* Download the **(./solution/HealthcareHackathonAISolution.zip)** solution `.zip` from the `solution` folder
* Within **<https://make.powerapps.com>**, import the `.zip` file via **Solutions** > **Import solution** > **Browse** and select the `.zip` file you just downloaded
* Click next
* Click Import
* Go to the Chatbot and either import it your existing Power Pages site (optional), or open it on a demo website
![picture of the pa flow](assets/pva-custom-demo.png)