var restify = require('restify');
var builder = require('botbuilder');
var request = require("request");
require('dotenv').config()
 
//=========================================================
// Bot Setup 
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        session.beginDialog('/promptButtons');
    },
    function(session, results) {
        session.endConversation('Thanks for allowing me to help you. Take care :)!');
    }
]);

bot.dialog('/promptButtons', [
    function (session) {
        var choices = [
            "Korean Air FAQ", 
            "Check Flight Status",
            "Quit"
           ]
        builder.Prompts.choice(session, "How can we help you today?", choices);
    },
    function (session, results) {
        if (results.response) {
            var selection = results.response.entity;
            // route to corresponding dialogs
            switch (selection) {
                case "Korean Air FAQ":
                    session.replaceDialog('/faq');
                    break;
                case "Check Flight Status":
                    session.replaceDialog('/status');
                    break;
                default:
                    session.endDialog();
                    break;
            }
        }
    }
]);

bot.dialog('/faq', [
    function (session) {
        builder.Prompts.text(session,"What is your question?");
    },     
   function (session, results, next) {
        var options = { 
            method: 'POST',
            url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/8ee17435-1c29-4945-bbd4-b1d8eefc7957/generateAnswer',
            headers: 
            { 
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'ocp-apim-subscription-key': process.env.QNA_SUBSCRIPTION_KEY 
            },
            body: 
            { 
                question: results.response 
            },
            json: true 
        };

        request(options, function (error, response, body) {
            if (error) {
                session.send("I had a hard time finding an answer to that question.  Let's try again.")
                session.replaceDialog('/faq');
            } else {
                if ((body.answer == "No good match found in the KB") || (body.answer =="Hmm, you might want to read about that here: raw.githubusercontent.com")) {
                    // try searching on bing for an answer.
                    console.log(body.answer);
                    session.send("Going to try searching on bing...");
                } else {
                    session.send(body.answer);
                    next();
                }
            }
        }); 
    },
    function(session, results) {
        var choices = ["Yes", "No"];
        builder.Prompts.choice(session, "Do you have another FAQ question?", choices)
    }, 
    function(session, results, next) {
        var selection = results.response.entity;
        if (selection == "Yes") {
            session.replaceDialog('/faq');
        } else if (selection == "No") {
            next();
        } else {
            session.endDialog();
        }
    },
    function(session, results) {
        var choices = ["Yes", "No"];
        builder.Prompts.choice(session, "Would you like to check your flight status?", choices);
    },
    function(session, results, next) {
        var selection = results.response.entity;
        if (selection == "Yes") {
            session.replaceDialog('/status');
        } else {
            session.endDialog();
        }
    }
]);

bot.dialog('/status', [
    function (session) {
        builder.Prompts.text(session,"What flight number are you interested in?");
    },     
   function (session, results) {
        session.send("Click here for that information http://flightaware.com/live/flight/"+ results.response);
        session.endDialog();
    }
]);