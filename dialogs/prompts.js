var request = require("request");
var builder = require('botbuilder');

var presentPromptChoices = function (session) {
    var choices = [
        "Korean Air FAQ", 
        "Check Flight Status",
        "Request an Agent",
        "Quit"
        ]
    builder.Prompts.choice(session, "How can we help you today?", choices);
};

var routePromptChoices = function (session, results) {
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
            case "Request an Agent":
                session.replaceDialog('/agent');
                break;
            default:
                session.endDialog();
                break;
        }
    }
};

module.exports.presentPromptChoices = presentPromptChoices;
module.exports.routePromptChoices = routePromptChoices;