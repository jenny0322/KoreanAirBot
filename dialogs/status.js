var request = require("request");
var builder = require('botbuilder');


var askFlightNumber = function(session){
        builder.Prompts.text(session,"What flight number are you interested in?");
    };

   var getFlightStatus = function(session, results) {
        session.send("Click here for that information http://flightaware.com/live/flight/"+ results.response);
        //session.endDialog();
        session.replaceDialog("/");

    };

module.exports.askFlightNumber = askFlightNumber;
module.exports.getFlightStatus = getFlightStatus;