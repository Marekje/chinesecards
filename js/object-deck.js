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

    this.howMuchUnLearnt = function() {
        var that = this;
        var number = 0;

        for (var i=0; i<that.cards.length; i++) {
            if (!that.cards[i].hasBeenSeen()) {
                number++;
            } else {
                return number;
            }
        }

        return number;
    }

    /* WHAT SHOULD I DO WITH THE NEW CARD */
    this.whatShouldIDo = function() {
        var that = this;
        var card = this.cards.shift();
        var empty = card.isAnEmptyCard(); /* true if empty, false is not empty */
        var learnt = card.hasBeenSeen(); /* true if there is at least a 2 or 3 in the marks*/
        var howMuchLearning = card.isWellKnown(); /* 0 if user didn't know the card last\
                                                     time. the bigger the number, the more
                                                     well-known the card*/

        if (empty) {
            /* Do Nothing */
        } else if (!learnt) {
            var unLearntCards = that.howMuchUnLearnt();
            that.cards.splice(unLearntCards, 0, card);
        } else if (howMuchLearning === 0) {
            this.cards.splice(2, 0, card);
        } else {
            var spliceLvl = howMuchLearning*howMuchLearning; /* the better
                          you know it, the more space betwwen views */
            if (this.cards.length < spliceLvl) {
                this.cards.push(card);
            } else {
                this.cards.splice(spliceLvl, 0, card);
            }
        }

        this.saveDeckToLS();
    }

    /* MAIN FUNCTIONS - CREATES HTML */

    /* LOOK AT CARDS
       Simply browse through the Cards, without changing anything */
    this.showCardsOneByOne = function(cardsState) {

        // VARIABLES
        var that = this;
        var state = cardsState ? cardsState : 'learn';
        var newCard = that.getNextCard(cardsState);

        // HTML
        var nextButton = Plans.button('action', 'Next');
        var showCardsHTML = Plans.doCardsOneByOne(newCard, [nextButton]);

        // BEHAVIORS
        newCard.addEventListener('keyup', function(e) {
            that.saveDeckToLS();
        }, false);
        nextButton.addEventListener('click', function(e) {

            that.whatShouldIDo();
            var nextCard = that.getNextCard(cardsState);

            that.replaceCard('deckOneCard', nextCard);
            showAllDeck(that);

            if (cardsState === 'edit') {
                var firstItem = nextCard.querySelector('.card-item');
                firstItem.focus();
            }

        }, false);

        return showCardsHTML;
    },

    /*
        ADD NEXT CARD
        show the next card
    */
    this.getNextCard = function(state) {
        var that = this;
        var newCard;

        if (state === 'edit' || !that.cards[0]) {
            newCard = new Card();
            that.cards.unshift(newCard);
            return newCard.createHTML('edit');
        } else {
            newCard = that.cards[0];
            return newCard.createHTML(state);
        }


    },

    /* REPLACE CARD
        replace a car dby another
        cardBoxId : the id of the box containing the card to replace
    */
    this.replaceCard = function(cardBoxId, newCard) {
        var cardLocation = document.querySelector('#'+cardBoxId);
        cardLocation.innerHTML = '';
        cardLocation.appendChild(newCard);
    }

    /* SAVE DECK TO LS
        -> DON'T FORGET TO CHECK App.saveDecksToLS()
           BEFORE ANY MODIFICATION !!!!
    */
    this.saveDeckToLS = function() {
        var deckJSON = JSON.stringify(this.cards);
        localStorage.setItem(this.name, deckJSON);
    }

}
