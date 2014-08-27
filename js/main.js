"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var location = document.querySelector('body');
    var theApp = new App(location);

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
