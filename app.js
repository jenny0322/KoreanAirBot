var restify = require('restify');
var builder = require('botbuilder');
var https = require('https');
var querystring = require('querystring');
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
        session.replaceDialog('/promptButtons');
    }
]);

bot.dialog('/promptButtons', [
    function (session) {
        var choices = [
            "Korean Air FAQ", 
            "Flight Status"
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
                case "Flight Status":
                    session.replaceDialog('/status');
                    break;
                default:
                    session.reset('/');
                    break;
            }
        }
    }
]);

bot.dialog('/faq', [
    function (session) {
        builder.Prompts.text(session,"What is your question?");
    },     
   function (session, results) {
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
            if (error) throw new Error(error);
                session.send(body.answer);
                session.replaceDialog('/');
            }); 

  }]);

  bot.dialog('/status', [
    function (session) {
        builder.Prompts.text(session,"What flight number are you interested in?");
    },     
   function (session, results) {
        session.send("You flight will arrive in 30 minutes in DFW.");
        session.replaceDialog('/');
  }]);