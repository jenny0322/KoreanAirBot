var request = require("request");
var builder = require('botbuilder');

var whatIsYourQuestion = function (session) {
    builder.Prompts.text(session,"What is your question?");
};
     
var getFAQAnswer =  function (session, results, next) {
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
           session.send(body.answer);
           next();
        }
    });
}

var checkAnotherQuestion = function(session, results) {
    var choices = ["Yes", "No"];
    builder.Prompts.choice(session, "Do you have another FAQ question?", choices)
};

var routeAfterAnotherFAQCheck = function(session, results) {
    if (results.response.entity == "Yes") {
        session.replaceDialog('/faq')
    } else {
        session.replaceDialog('/');
    }
}

module.exports.whatIsYourQuestion = whatIsYourQuestion;
module.exports.getFAQAnswer = getFAQAnswer;
module.exports.checkAnotherQuestion = checkAnotherQuestion;
module.exports.routeAfterAnotherFAQCheck = routeAfterAnotherFAQCheck;