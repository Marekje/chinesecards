/*  object :
    DECK

    Deck is going to have three main functions :
        - Look at cards (Card[0] + Next  + editCardButton ),
          the cardItems should log marks.push[0] (same level)
        - Learn cards (Card[0] + Next  + editCardButton )
          the cardItems should log marks.push(1 (meaning one
          more level) or 0 (meaning same level))
        - editCard. (Card[0] + Done) (and then go back to the
          previous function)
        - addCards (An empty Card, to be added only if filled)
*/
"use strict";

function Deck(name) {

    /* VARIABLES */
    this.name = name,
    this.dateCrea = Date.now(),
    this.datesModif = [], /* Each time a card is learnt, seen or edited */

    /* CARDS */
    this.cards = [],

    /* HELP METHODS */

    /* WHAT SHOULD I DO WITH THE NEW CARD */
    this.whatShouldIDo = function() {
        var card = this.cards.shift();
        var empty = card.isAnEmptyCard(); /* true if empty, false is not empty*/
        var learnt = card.hasBeenSeen(); /* true if there is at least a 2 or 3 in the marks*/
        var wrong = card.isAWrongAnswer(); /* true if an answer is bad (marks ===1 ) */

        if (empty) {
            /* Do Nothing */
        } else if (!learnt) {
            this.cards.unshift(card);
        } else if (wrong) {
            this.cards.splice(5, 0, card);
        } else {
            this.cards.push(card);
        }
    }

    /* MAIN FUNCTIONS - CREATES HTML */

    /* LOOK AT CARDS
       Simply browse through the Cards, without changing anything */
    this.showCardsOneByOne = function(cardsState) {

        // VARIABLES
        var deckObject = this;
        var state = cardsState ? cardsState : 'look';

        // HTML
        var lookHTML = document.createElement('section');
            lookHTML.className = 'deck__look';

            /* Card */
            var cardLocation = document.createElement('div');
            console.log(deckObject.cards[0]);
            cardLocation.appendChild(deckObject.cards[0].createHTML(state));

            /* Next button*/
            var nextButton = Plans.button('next', 'Next');

        lookHTML.appendChild(cardLocation);
        lookHTML.appendChild(nextButton);

        // BEHAVIORS
        nextButton.addEventListener('click', function(e) {
            deckObject.whatShouldIDo(); /* Does something to the previous card*/

            // ANALYSE THE LEARNED CARD

            var newCardHTML = deckObject.cards[0].createHTML(state); /* DOESN'T UPDATE THE HTML !!*/
            cardLocation.innerHTML = '';
            cardLocation.appendChild(newCardHTML);
            showAllDeck(deckObject);
        }, false);

        return lookHTML;
    }


    /* ADD CARDS ONE BY ONE */
    this.addCardsOneByOne = function() {

        // VARIABLES
        var deckObject = this;
        var newCard = new Card();
            deckObject.cards.unshift(newCard);

        // HTML
        var addCardsHTML = document.createElement('section');
            addCardsHTML.className = 'deck__look';

            /* Card */
            var cardLocation = document.createElement('div');
            cardLocation.appendChild(newCard.createHTML('edit'));

            /* Next button*/
            var nextButton = Plans.button('next', 'Next');

        addCardsHTML.appendChild(cardLocation);
        addCardsHTML.appendChild(nextButton);

        // BEHAVIORS
        nextButton.addEventListener('click', function(e) {
            deckObject.whatShouldIDo(); /* Does something to the previous card*/
            var newNewCard = new Card();
            deckObject.cards.unshift(newNewCard);
            var newCardHTML = newNewCard.createHTML('edit'); /* DOESN'T UPDATE THE HTML !!*/
            cardLocation.innerHTML = '';
            cardLocation.appendChild(newCardHTML);
            showAllDeck(deckObject);
        }, false);

        return addCardsHTML;
    }

}
