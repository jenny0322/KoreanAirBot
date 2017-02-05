Korean Air Bot
==============

Disclaimer
----------
This project is NOT affiliated with Korean Air. 

Warrantee
---------
This code is a sample, use at own risk. Please submit a pull request if you find a bug. 

Copyright and License
----------------------
 - Copyright (c) Microsoft Corporation
 - Released under the MIT License (MIT)
 - Please see LICENSE for more information.

Scenario
----
Korean Air has a FAQ page here: https://www.koreanair.com/content/koreanair/global/en/customer-support.html#faqs And they would like to build a bot that can answer similar questions (and it wouldn’t hurt if it can be useful in other ways too) 
 
Ideally the bot would work on different channels, such as Skype but they have also expressed the interest to have this bot embedded on their website. Some execs mentioned they thing it would be even more interesting if such bot used speech, so users could just talk to it. 

Refinements
-----------
- Speech Ask: While we belive that speech would be interesting technically, we do not believe that it would fit into the typical use case for the customer. We believe that most users would be accessing this type of information on the go from mobile devices, likey from busy and noisy air ports. This noisy enviroment is not condusive to go text to speech translation. Additionally, we believe that customers would not be confortable talking about possibly sensitive information in this public setting. 

MVP Usecases
--------
1. The system shall provide users with the option to choose they type of help they need (Search FAQ, Search Flight Info, Contact an Agent)
2. FAQ Search: The user will be promted "How may I help you?" the user will then reply with a question. The system will then parse the question and respond back with its best guess.
3. Search Flight Info: The user will be promted for there flight number, the system will then do a bing search to find out flight status for that flight and present that to the user. 
4. Contact an Agent: The user will be provided the 1-800 number to call for help. 

Possible Enhancements
---------------------
1. FAQ Search: Provied LUIS NLP search for questions that the Q&A maker doesnt score an answer high enough on. 
2. Search Flight: Provied a more of a wizard feel. Allowing users to pick the flight by day, departure/arrival city.
3. Contact Agent: Collect user information in the chat bot, esclate via chat to a human.

Design
------
The bot will operate in a loop. First it will present the menu of what it can do to the user. The user will specify what they want to do and the bot will route them down that path. After they finish down that path, the bot will circle back and provde the main menu of options again, incase the user has more questions. 

Technical Goals
---------------
1. Exposure to Bot framework. 
2. Exposure to Node
3. Exposure to Cognative Services (Q and A & Bing Search)

Lessions Learned
----------------
1. Q and A Maker: It has a great ingestion feature alowing you to import FAQ from a website. However if your FAQ is loaded async via JavaScript it will not load. We downloaded the json and then converted it to a flat HTML Table, uploaded to GitHub and pointed the Q and A tool there. 
2. Q and A Maker: When you point it to a FAQ it pull other metadata from the site. Since we hacked up something and posted it to GitHub, it will now return information about GitHub. Recomendation: either import the FAQ into the Q and A maker via a more robust technqie from your website, or create a simple flat FAQ listing on the site for the Q and A maker to pull from. 
3. Node & Bots: Use nodemon to automate your local dev/try lifecycle. Eliminates the manual work of restarting node over and over and over again. 
4. Node & VS code: open up the terminal (ctrl + `) in VS code. Eliminates the need to have yet another window open with the console. 
5. Node & Environmental Variables: use dotenv to pull in Environmental settings from a config file. Keeping your secrets out of GitHub. 