# Setup

## Solutions
- Mass Travel Core: Contains data model and Mass Travel Hub back-office app
- Mass Travel Automations: Contains Power Automate flows
- Mass Travel Power Pages: Contains Mass Travel Gateway Power Pages

## Solution Import
- Download all the three managed solutions from [source](/source/)
- Import the solutions in your target environment strictly in the following order:
    > Mass Travel Core

    > Mass Travel Automations

    > Mass Travel Power Pages

## Configurations
Below are few configurations mandatory for this soluton to work as expected.

### Import Cities
- Navigate to Mass Travel core solution
- Open the MASS Cities Record table 
- Import the city records that you wish

### Tweak the AI model
The current AI model validates cities within the United States. To validate cities from other countries, follow these steps:

- Navigate to the Mass Travel Power Pages solution.
- Open the AI model "Validate City" and adjust the prompt to include the country or countries where your cities are located

### Turn on the flows
- Turn on all Power Automate flows from the Mass Travel Automations solution if they are not already activated automatically

### Reactivate Power Pages Site
- Navigate to Mass Travel Power Pages and go to the "Mass Travel Gateway" site
- Go to home page in Power Pages and open up the "Inactive sites" tab
- Click on Reactivate button from Mass Travel Gateway site
- Create your own web address and click on done

### Replace default copilot with Custom copilot in Mass Travel Gateway
- Once you reactivate the site, navigate to Setup tab and then to Add Copilot
- Turn on Create copilot and enable copilot on site
- Now it creates a default copilot in Copilot Studio
- To enable the custom copilot provided in the solution, follow these [instructions](https://learn.microsoft.com/en-us/power-pages/getting-started/pva-bot-how-to?tabs=enhanced#update-the-copilot-based-on-your-data-model-version)
