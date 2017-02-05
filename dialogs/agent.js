var request = require("request");
var builder = require('botbuilder');

var contactAnAgent = function (session) {
    builder.Prompts.text(session,"Contact information for Korean Air can be found here: https://www.koreanair.com/content/koreanair/global/en/customer-support.html#cta-large=/global/en/customer-support/contact-us/service-centers.html");
    session.replaceDialog('*:/')
};

module.exports.contactAnAgent = contactAnAgent;