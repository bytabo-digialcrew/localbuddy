/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const locale = ('de-DE');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const myurl = 'https://bytabo.de/hackathon/push.php?destination=';
const languageStrings = {
    'de-DE': {
        translation: {
            SKILL_NAME: 'asklocalbuddy',
            HELP_MESSAGE: 'Du kannst fragen wo Orte wie der Max Platz, die Toilette oder die Tanzlinde ist. Du kannst auch gerne fragen wer ich bin.',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            GABELMANN_MESSAGE: 'Ich bin Neptun und stehe hier seit 1566. Doch weil ich eine Gabel in der Hand habe, nennen die Bamberger mich nur Gabelmann. schau auf dein Smartphone damit du siehst wie es hier früher war und frag mich auch nach meinem Gedicht.',
            TOILET_MESSAGE:'Die nächste Toilette befindet sich im Kaffee "Der Beck". schau auf dein Smartphone, ich bringe dich hin.',
            MAXPLATZ_MESSAGE: 'Der Maxplatz befindet sich in Bamberg. Vielleicht findest du ihn ja',
            TANZLINDE_MESSAGE: 'Die Tanzlinde befindet sich in Limmersdorf. Das liegt zwischen Bamberg und Bayreuth. Hier findet auch die weltberühmte Limmersdorfer Lindenkirchweih statt. Dieses Jahr kann man die Kirchweih vom 26. bis 29. August besuchen',
            WELCOME_MESSAGE: 'Hallo, hier ist dein local Buddy. Bitte frage mich wer ich bin oder wo in der Nähe etwas interessantes zu finden ist.',
            FOOD_MESSAGE: '100m von dir entfernt ist ein fränkisches Wirtshaus. Guten Appetit, die Speisekarte siehst du auf deinem Smartphone',
            GABELMANN_POEM: 'Hei, do steht der Gobl-Mo! Außn is a Gitter dro. Inna drinna, aus vier Röhrn. tonn sie a weng Wasser möhrn; wenns glitzert in der Sunna, dann merkst, des is a Brunna!',
            RESTAURANT_MESSAGE: 'Du kannst das Schlenkerla in 10 Minuten erreichen. Hier gibt es auch das bekannte Rauchbier. Weitere Vorschläge findest du auf deinem Smartphone',
        },
    },
};

const handlers = {
    'GebOrte': function(){
        console.log("Orte");
        var myContext = this.context;
        var ort = this.event.request.intent.slots.Sign.value;
        ort = ort.toLowerCase();
        var speechOutput = 'Ich kann zu deiner Anfrage '+ ort +' nichts finden';
        console.log('Ort: ' + ort);        
        switch(ort){
            case 'toilette':
            case 'klo':
                ort = 'toilette';
                speechOutput = this.t('TOILET_MESSAGE');
                break;
            case 'maxplatz':
                speechOutput = this.t('MAXPLATZ_MESSAGE');
                break;
            case 'tanzlinde':
                speechOutput = this.t('TANZLINDE_MESSAGE');
                break;
            case 'gabelmann':
            case 'neptun':
                speechOutput = this.t('GABELMANN_MESSAGE');
                break;
            default:
                break;
        }

        var http = require( 'https' );
        //var url = 'http://asklocalbuddy.bytabo.de/push.php?destination='+ort;
        var url = myurl+ort;
        http.get( url, function( response ) {

            response.on( 'data', function( data ) {
                output( speechOutput, myContext );
            });

        });
    },
    'HistoryIntent': function () {
        var myContext = this.context;
        
        var http = require( 'https' );
        //var url = 'http://asklocalbuddy.bytabo.de/push.php?destination=history';
        var url = myurl+'history';
        var speechOutput = this.t('GABELMANN_MESSAGE');
        
        http.get( url, function( response ) {

            response.on( 'data', function( data ) {
                output(speechOutput, myContext);
            });

        });
    },
    'HistoryPoem': function () {
        var myContext = this.context;
        
        var http = require( 'https' );
        //var url = 'http://asklocalbuddy.bytabo.de/push.php?destination=gedicht';
        var url = myurl+'gedicht';
        var speechOutput = this.t('GABELMANN_POEM');
        http.get( url, function( response ) {

            response.on( 'data', function( data ) {
                output(speechOutput, myContext);
            });

        });
    },
    'FoodIntent': function(){
        var myContext = this.context;
        
        var http = require( 'https' );
        //var url = 'http://asklocalbuddy.bytabo.de/push.php?destination=speisekarte';
        var url = myurl+'speisekarte';
        var speechOutput = this.t('FOOD_MESSAGE');
        http.get( url, function( response ) {

            response.on( 'data', function( data ) {
                output(speechOutput, myContext);
            });

        });
    }, 
    'RestaurantIntent': function(){
        var myContext = this.context;
        
        var http = require( 'https' );
        //var url = 'http://asklocalbuddy.bytabo.de/push.php?destination=speisekarte';
        var url = myurl+'restaurants';
        var speechOutput = this.t('RESTAURANT_MESSAGE');
        http.get( url, function( response ) {

            response.on( 'data', function( data ) {
                output(speechOutput, myContext);
            });

        });
    },
    'LaunchRequest': function () {
        var myContext = this.context;
        output(this.t('WELCOME_MESSAGE'), myContext);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t('HELP_MESSAGE');
        var reprompt = this.t('HELP_MESSAGE');
        output(speechOutput, this.context);
        //this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        var myContext = this.context;
        output(this.t('STOP_MESSAGE'), myContext);
    },
    'AMAZON.StopIntent': function () {
        var myContext = this.context;
        output(this.t('STOP_MESSAGE'), myContext);
    },
    'SessionEndedRequest': function () {
        var myContext = this.context;
        output(this.t('STOP_MESSAGE'), myContext);
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function output( text, context ) {
  var response = {
     outputSpeech: {
        type: "PlainText",
        text: text
     },
     card: {
        type: "Simple",
        title: "System Data",
        content: text
     },
  shouldEndSession: true
  };
  context.succeed( { response: response } );
}