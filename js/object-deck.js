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

function Deck(name) {

    /* VARIABLES */
    this.name = name,
    this.dateCrea = Date.now(),
    this.datesModif = [], /* Each time a card is learnt, seen or edited */

    /* CARDS */
    this.cards = [],


    /* MAIN FUNCTIONS - CREATES HTML */

    /* LOOK AT CARDS
       Simply browse through the Cards, without changing anything */
    this.lookAtCards = function() {

        // VARIABLES
        var deckObject = this;

        // HTML
        var lookHTML = document.createElement('section');
            lookHTML.className = 'deck__look';

            var cardHTML = deckObject.cards[0].createHTML('look');

            var nextButton = document.createElement('button');
                nextButton.className = 'btn btn-next';
                nextButton.textContent = 'Next';

        lookHTML.appendChild(cardHTML);
        lookHTML.appendChild(nextButton);

        // BEHAVIORS
        nextButton.addEventListener('click', function(e) {
            var previousCard = deckObject.cards.shift();
            deckObject.cards.push(previousCard);
            cardHTML = deckObject.cards[0].createHTML('look'); /* DOESN'T UPDATE THE HTML !!*/

            showAllDeck(deckObject);
        }, false);

        return lookHTML;

    },

    /* LEARN CARDS
       Look at cards one by one, hiding parts of it according to its
       learning level. Put them back in the deck according to its
       learning level & if you know it. */
    this.learnCards = function() {

    },

    /* ADD CARDS
       Add New Cards to this deck, one by one. */
    this.addCards = function() {

    }


}
