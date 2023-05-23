# Engage with customers using AI generated communication templates for SMS and Email

Imagine you are a school administrator that needs to communicate (SMS or Email) with thousands of contacts in a moment’s notice because of an incoming snowstorm. With Azure Communication Services and Azure OpenAI, we can simplify this experience to help you automatically generate templated messages for different communication channels and audiences. 

![Contoso-School](https://github.com/pnp/powerplatform-samples/assets/43075365/fc299bb0-fc43-46e8-8e81-93725376c85a)

## Table of contents
1.	Architecture Overview
2.	What will you need?
3.	Send messages with Azure Communication Services 
4.	Generate messages templates with Azure OpenAI
5.	Setting up Power App

## Architecture overview
In our solution, to create and send messages to the contacts, we will leverage Power Apps and Power Automate to build our applications and flows. The Power App will enable the school administrator to configure the message they want to send out to contacts. It will be linked to a Dataverse table with the contact information. The Power App will trigger our Power Automate flow which will use Azure OpenAI to create our communication templates for each channel and use Azure Communication Services to send the SMS and Emails to the contacts using their contact information.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/81ce4d5a-f58a-46b6-898e-098e825bd3c7)

## What will you need?
To follow along you will need:
-	An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
-	An active Communication Services resource and connection string. [Create a Communication Services resource](https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource).
  o	From this step make sure to write down the connection string for the Azure Communication Services resource.
-	An active Azure OpenAI resource with a deployed model (text-davinci-003 /  GPT-3). [Create a resource and deploy model](https://learn.microsoft.com/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal).
  o	From this step make sure to write down the model deployment name and the API key.
-	An active Azure Communication Services resource connected to an Email Domain and its connection string. [Get started by connecting an Email Communication Resource with a Azure Communication Resource](https://learn.microsoft.com/azure/communication-services/quickstarts/email/create-email-communication-resource). [Create a free Azure Managed Domain for Azure Communication Services](https://learn.microsoft.com/azure/communication-services/quickstarts/email/add-azure-managed-domains).
  o	From this step make sure to write down the email domain generated.
-	(Optional) An SMS enabled telephone number. [Get a phone number](https://docs.microsoft.com/azure/communication-services/quickstarts/telephony-sms/get-phone-number).
  o	From this step make sure to write down the phone number you purchased.

## Send messages with Azure Communication Services
We will start by creating our first Power Automate Flow to automate sending SMS and Email messages to our users. This flow will start with a Power App (v2) trigger and use Azure Communication Services connectors to send communications to customers.

### Power Automate Flow Creation
To create a flow, go to Power Automate (make.powerautomate.com) to get started. Select to create a new flow on the left navigation bar on the screen. Select Instant Cloud Flow.  Select Power Apps (V2) trigger. Select Create. 

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/cc88e150-9e86-43d0-83de-06a4da2c0d05)

### Configure PowerApps (v2) Trigger
Once we have our trigger, we will configure to accept the phone number and email to which we are sending the message to, as well as the email and SMS messages we are sending. 

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/00b9c4ce-cdb8-44ec-938b-572d86c334b7)

### Sending messages through SMS and Email
Once we have our triggers configured, we will then add two connectors in parallel:
1) Send an SMS using the Azure Communication Services SMS connector
2) Send an Email using the Azure Communication Services Email connector.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/5ef79fc3-12da-44c1-a40d-d0140e196179)

For the SMS connector, we will need to choose the phone number associated with the Azure Communication Services resource you want to send the message from, and then add the Phone Number and SMS message parameters.
For the email connector, we will need to insert the email address associated with the Azure Communication Services resource. Then configure the email with the information of who we want to send to, the subject on the email and the email body. Additional formatting of the email can be added.
Next, let’s set up the flow to create the messages templates we will send.

## Generate messages templates with Azure OpenAI
For this template creation flow, we will leverage Azure OpenAI to take a message description and generate both an SMS and an Email from it. For SMS the message should be short with less than 160 characters. For the Email Azure OpenAI will generate an HTML message that is longer and provides additional details.

### Power Automate Flow Creation
To create a flow, go to Power Automate (make.powerautomate.com) to get started. Select to create a new flow on the left navigation bar on the screen. Select Instant Cloud Flow.  Select Power Apps (V2) trigger. Select Create. 

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/d3efbd1a-2be5-43d7-a9ac-5845c1bf6b53)

### Configure PowerApps (v2) Trigger
Once we have our trigger, we will configure to accept the message description. We will pass the description into a Compose connector to leverage it later in the flow.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/b61b306d-1c8c-46b3-96fa-b706643cb792)

### Configure Prompts
Next, we will compose the prompts we will use to generate our templates. For our flow we will separate this into two parallel flows, one for email and one for SMS.  For both flows, we will use a combination of a Compose connector to put together out prompt and an HTTP connector to make a call to Azure OpenAI to generate our messages. Add two compose connectors in parallel like so:

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/4af26d69-d133-49b1-92b4-680346cc0426)

For email, we will add the following prompt into the compose connector:
_Pretend you are a school principal. Generate an email message to be sent. The email’s audience are to adults who have the kids under their supervision. The email should be formatted using HTML and prettified. The email content should be about:_

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/9f7ca186-0ebb-42dd-abcf-70285f3ca627)

For SMS, we will add the following prompt into the compose connector:
_Pretend you are a school principal. Generate an SMS message to sent. The email’s audience are to adults who have the kids under their supervision.. Maximum 160 characters. The message should be about:_

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/6ad9661c-16f7-44d3-90f0-de5d1891c354)

### Configure Azure OpenAI HTTP Call
Once we have our compose connector configured, we will configure the HTTP connector with our Azure OpenAI endpoint, model deployment name, and prompt. We will have one HTTP connector for SMS and one for email. Add an HTTP connector into the flow for SMS and Email like so:

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/3d7443cf-c248-44e1-80b6-82cc22b973e9)

Then we will configure the connector using the endpoint provided for your Azure OpenAI deployment, the API key for that deployment and the prompt that we want Azure OpenAI to process which in this case we configured in the previous step. The configured connector will look like this.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/66de21d5-a9b7-4740-afa6-6fdea4a1b215)

Alternatively, a built-in completion connector for [AI Builder is available in preview](https://learn.microsoft.com/ai-builder/azure-openai-model-papp).

### Processing the outputs
The HTTP connector will return back to us a JSON object with the response from Azure OpenAI. To make it easier to use the outputs in the rest of our flow, we will use Parse JSON connectors. Add the connector right after each HTTP call connector.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/84d032d0-d449-4e19-bfa5-6684d5bd0dd0)

The connector expects a schema to process the JSON with. Copy and past the schema provided below into the schema box.

```json

{
    "properties": {
        "choices": {
            "items": {
                "properties": {
                    "finish_reason": {
                        "type": "string"
                    },
                    "index": {
                        "type": "integer"
                    },
                    "logprobs": {},
                    "text": {
                        "type": "string"
                    }
                },
                "required": [
                    "text",
                    "index",
                    "logprobs",
                    "finish_reason"
                ],
                "type": "object"
            },
            "type": "array"
        },
        "created": {
            "type": "integer"
        },
        "id": {
            "type": "string"
        },
        "model": {
            "type": "string"
        },
        "object": {
            "type": "string"
        }
    },
    "type": "object"
}


```

### Configure the response
Now that we have the HTTP connector configured and we have parsed out the response, we can finally pass back the generated text to our Power App to show the generated messages to the user. To do this, we will add a connector to Respond to a Power App. This connector we will configure with two values: one for email and one for SMS. There we will configure it using the value below to send back the responses.

```

body('SMS_text')?['choices'][0]['text']

```

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/8185284f-e98b-401e-8361-051426af0591)

## Setting up a Power App
The last step of our lab is to create the UI experience for the school administrator to configure the message they want to send.

### Create Canvas App
First, we will set up a Canvas App in Power Apps. For this case, Canvas Apps will provide a secure place for our school administrators to log into and leverage these capabilities. To create a Canvas App, navigate into Power Apps (make.powerapps.com) and click on the create app button and select Canvas App. Configure the app with a name and select Table for the form factor. 

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/0a9ddaad-f262-4a00-898a-db6fe35aba98)

### Setup input screen
In the Canvas App we will set up two screens. In one screen we will create a page that allows the user to add the description of the message they want to send into a text area. At the bottom, we add a button to trigger the generation of the templates. To set this up, go into the add components section in Power Apps and look for a Text Area and Button component to add into the screen. You can add additional components to prettify as wanted.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/5c4acbe1-0a9c-4251-9bd3-f2fa21ee6bc7)

Now using the flows we created at the beginning we can configure the `Start` button to generate our templates. This button will trigger our first flow to generate the templates for our SMS and Email message. We will add the following `OnSelect` command to that button:

```

Set(templates, CreateTemplate. Run(TextInput1.Text));
Navigate(Screen2, Push)

```

This command will run our CreateTemplate flow with the input text and store the resulting SMS and Email templates on a variable. It will then switch to Screen 2.

### Configure send screen.
In the second screen we will allow the user to see the messages generated using the description provided for each channel before sending it. For SMS, we will use a simple text label to show the message. For Email, we will use an HTML area so we can show the rendered HTML that the bot generated for us. Finally, lets add a button to trigger the sending of the messages. Using the components section in Power Apps, look for Text Label, HTML Area and Button components and add them into the second screen.

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/ce6131ed-d474-4b5e-b4f3-bf2af4c40617)

On Screen 2, we will then configure our `Send` button. We will trigger our second flow to send the SMS and Email. We will add the following `OnSelect` command to the button:

```

ForAll(Contacts, Sendnotifications.Run(‘Phone Number’, ‘Email’, templates.sms, templates.email))

```

This command runs our SendNotification flow for each name in our Contacts database that we created. It passes the Phone Number and Email address for the parent and the templated messages for SMS and Email.

## Initialize a data model in Microsoft Dataverse
For the Power App, a storage table is necessary to keep a record of all the names registered for a notification. We will create a table in Microsoft Dataverse within our Power Platform environment. We will call the table `Contacts List`. We can manually populate the table with some sample rows for which we will add name, phone number, and email address information.

![image](https://github.com/ddematheu2/powerplatform-samples/assets/43075365/7784d63a-60b4-4fa3-a954-cab696ddf0a8)

## Run it.
Now that everything is ready, go back to Screen 1 and press play in your Power App environment. 

![image](https://github.com/pnp/powerplatform-samples/assets/43075365/eb21a4b3-d8b1-403f-b925-565078be00a7)

Try to add a description for the alert and hit start. Once you are happy with the generated message, hit send. (Make sure you have added entries into the Contacts database)

With Azure Communication Services, it is possible to easily build low code flows that leverage SMS and Email to communicate with your customers. Whether it is creating AI generated messages or marketing emails, Azure Communication Services connectors can help your business connect with customers. 
