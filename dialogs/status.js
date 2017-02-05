var request = require("request");
var builder = require('botbuilder');


var askFlightNumber = function(session){
        builder.Prompts.text(session,"What flight number are you interested in?");
    };

var getFlightStatus = function(session, results, next) {
        session.send("Click here for that information http://flightaware.com/live/flight/"+ results.response);
         next();
    };

var askFlightFligtStatusAgain = function(session, results){

builder.Prompts.choice(session,"Do you want to check the status of another flight?", ["Yes", "No"]);
};

var redirectPrompt = function(session, results){
if (results.response) {
        var selection = results.response.entity;
        switch (selection) {
            case "Yes":
                session.replaceDialog('/status');
                break;
            default:
                session.replaceDialog('/');
                break;
    }
         }
};

module.exports.askFlightNumber = askFlightNumber;
module.exports.getFlightStatus = getFlightStatus;
module.exports.askFlightFligtStatusAgain = askFlightFligtStatusAgain;
module.exports.redirectPrompt = redirectPrompt;
