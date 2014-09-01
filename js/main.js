"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var location = document.querySelector('body');
    var theApp = new App(location);

    /* start : DROPBOX Initialization

    var client = new Dropbox.Client({ key: "p5f8sx16gteu30n" });
    client.authenticate(function(error, client) {
        if (error) {
            // Replace with a call to your own error-handling code.
            //
            // Don't forget to return from the callback, so you don't execute the code
            // that assumes everything went well.
            return showError(error);
        }

        // Replace with a call to your own application code.
        //
        // The user authorized your app, and everything went well.
        // client is a Dropbox.Client instance that you can use to make API calls.
        doSomethingCool(client);
    });
     stop : DROPBOX initialization*/

    location.appendChild(theApp.main());
});

function main() {
    console.log('Hello, world !');
};

/*
    SHOW ALL DECK
    Debugging function
*/
function showAllDeck(deck) {
    var showDeck = deck.name + ':';
    for (var i=0; i<deck.cards.length; i++) {
        showDeck += ' ' + deck.cards[i].chinese.content;
    }
    console.log(showDeck);
};

/*
    COMPARE NUMBERS
    Array sorting function
    -> http://devdocs.io/javascript/global_objects/array/sort
*/
function compareNumbers(a, b) {
  return a - b;
}
/*
    GET A RANDOM INTEGER
    -> http://devdocs.io/javascript/global_objects/math/random
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* DROPBOX */
