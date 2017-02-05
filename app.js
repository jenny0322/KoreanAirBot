var restify = require('restify');
var builder = require('botbuilder');
var request = require("request");
var faqDialog = require('./dialogs/faq');
var statusDialog = require('./dialogs/status');
var promptDialog = require('./dialogs/prompts');
var agentDialog = require('./dialogs/agent');
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
    promptDialog.presentPromptChoices,
    promptDialog.routePromptChoices
]);


bot.dialog('/faq', [
    faqDialog.whatIsYourQuestion,
    faqDialog.getFAQAnswer,
    faqDialog.checkAnotherQuestion,
    faqDialog.routeAfterAnotherFAQCheck
]);
bot.dialog('/status', [statusDialog.askFlightNumber, statusDialog.getFlightStatus, statusDialog.askFlightFligtStatusAgain,statusDialog.redirectPrompt]);

bot.dialog('/agent', [agentDialog.contactAnAgent]);

