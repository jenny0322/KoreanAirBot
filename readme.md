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
Korean Air has a FAQ page here: https://www.koreanair.com/content/koreanair/global/en/customersupport.html#faqs And they would like to build a bot that can answer similar questions (and it wouldn’t hurt if it can be useful in other ways too) 
 
Ideally the bot would work on different channels, such as Skype but they have also expressed the interest to have this bot embedded on their website. Some execs mentioned they thing it would be even more interesting if such bot used speech, so users could just talk to it. 

MVP Usecases
--------
1) The system shall provide users with the option to choose they type of help they need (Search FAQ, Search Flight Info, Contact an Agent)
2) FAQ Search: The user will be promted "How may I help you?" the user will then reply with a question. The system will then parse the question and respond back with its best guess.
3) Search Flight Info: The user will be promted for there flight number, the system will then do a bing search to find out flight status for that flight and present that to the user. 
4) Contact an Agent: The user will be provided the 1-800 number to call for help. 

Possible Enhancements
---------------------
1) FAQ Search: Provied LUIS NLP search for questions that the Q&A maker doesnt score an answer high enough on. 
2) Search Flight: Provied a more of a wizard feel. Allowing users to pick the flight by day, departure/arrival city.
3) Contact Agent: Collect user information in the chat bot, esclate via chat to a human.


Design
------
The bot will operate in a loop. First it will present the menu of what it can do to the user. The user will specify what they want to do and the bot will route them down that path. After they finish down that path, the bot will circle back and provde the main menu of options again, incase the user has more questions. 


Technical Goals
---------------
1) Exposure to Bot framework. 
2) Exposure to Node
3) Exposure to Cognative Services (Q and A & Bing Search)

