var restify = require('restify');
var builder = require('botbuilder');
var request = require("request");
var faqDialog = require('./dialogs/faq');
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
    faqDialog.whatIsYourQuestion,
    faqDialog.getFAQAnswer,
    faqDialog.checkAnotherQuestion,
    faqDialog.routeAfterAnotherFAQCheck
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