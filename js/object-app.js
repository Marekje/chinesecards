/* object :
    APP
    The main object. The one who's gonna make stuff happen in the browser !
    - Save decks in LocalStorage
    - Get decks fron localStorage
    - Generate the app's HTML
*/

"use strict";

function App(location) {

    /* VARIABLES */
    this.location = location,

    /* CONTENT */
    this.decks = [],

    /* METHODS */

    /*
        MAIN
        The method, the one that creates everything !
    */
    this.main = function() {
        var theApp = this;
        var location = theApp.location;

        //theApp.decks.push(mainDeck);
        this.getDecksFromLS();
        showAllDeck(theApp.decks[0]);

        /* HTML BUILDING */
        /* App */
        var appHTML = document.createElement('div');
            appHTML.id = 'appContainer';
            appHTML.className = 'container';

        /* Menu */
        var learn = Plans.button('action', 'Learn');
        var add   = Plans.button('action', 'Add');

        var menu = theApp.createMenuHTML([learn, add]);

        /* Main location*/
        var mainContent = theApp.createMainContentHTML();

        appHTML.appendChild(menu);
        appHTML.appendChild(mainContent);

        learn.addEventListener('click', function(e) {
            theApp.decks[0].whatShouldIDo();
            theApp.saveDecksToLS();
            mainContent.innerHTML = '';
            mainContent.appendChild(theApp.decks[0].showCardsOneByOne('learn'));
        }, false);
        add.addEventListener('click', function(e) {
            theApp.decks[0].whatShouldIDo();
            theApp.saveDecksToLS();
            mainContent.innerHTML = '';
            mainContent.appendChild(theApp.decks[0].showCardsOneByOne('edit'));
        }, false);

        return appHTML;
    }

    /*
        CREATE MENU HTML
        create a simple menu for switching between different actions
    */
    this.createMenuHTML = function(buttons) {
        var menuHTML = document.createElement('nav');
            menuHTML.className = 'nav';

            var logo = document.createElement('h1');
                logo.className = 'nav__logo';
                logo.textContent = '学习';

            var list = document.createElement('ul');
                list.className = 'nav__menu menu';

                for (var i=0; i<buttons.length; i++) {
                    list.appendChild(buttons[i]);
                }

            menuHTML.appendChild(logo);
            menuHTML.appendChild(list);

        return menuHTML;
    },


    /*
        CREATE MENU HTML
        create a simple menu for switching between different actions
    */
    this.createMainContentHTML = function() {
        var contentHTML = document.createElement('section');

            contentHTML.appendChild(this.decks[0].showCardsOneByOne('learn'));

        return contentHTML;
    },

    /* SAVE DECKS TO LOCALSTORAGE */
    this.saveDecksToLS = function() {
        var decksToSave = this.decks;

        var decksNames = [];
        var decksNamesJSON;
        for (i=0; i<decksToSave.length; i++) {

            decksNames.push(decksToSave[i].name);

            var deckCardsJSON = JSON.stringify(decksToSave[i].cards);
            localStorage.setItem(decksToSave[i].name, deckCardsJSON);
        }

        decksNamesJSON = JSON.stringify(decksNames);
        localStorage.setItem('decksNames', decksNamesJSON);
    },

    /* GET DECKS FROM LOCASTORAGE*/
    this.getDecksFromLS = function() {
        var theApp = this;
        var decksNamesJSON = localStorage.getItem('decksNames');
        var decksNames = JSON.parse(decksNamesJSON);
        if (decksNames) {
            for (var i=0; i<decksNames.length; i++) {
                var deck = new Deck(decksNames[i]);
                var deckCards = localStorage.getItem(decksNames[i]);
                if (deckCards) {
                    deckCards = JSON.parse(deckCards);
                    for (var i=0; i<deckCards.length; i++) {
                        var card = theApp.createCardFromArray(deckCards[i]);
                        deck.cards.push(card);
                    }
                } else {
                    deck.cards = [];
                }
                this.decks.push(deck);
            }
        } else {
            var theDeck = new Deck('activeDeck');
            this.decks.push(theDeck);
        }
    },

    /* SET CARD FROM AN ARRAY OF VALUES
        such as when you get a card back from localStorage
        -> gets an array
        -> gives back a card
    */
    this.createCardFromArray = function(cardArray) {
        var card;
        var cardCrea = cardArray.dateCrea;
        var cardDatesModif = cardArray.datesModif;
        card = new Card(undefined, undefined, undefined, cardCrea, cardDatesModif);

        var cardItems = [cardArray.chinese, cardArray.pinyin, cardArray.translation];

        for (var i=0; i<cardItems.length; i++) {
            var cardIContent = cardItems[i].content;
            var cardICrea = cardItems[i].dateCrea;
            var cardIModif = cardItems[i].datesModif;
            var cardIMarks = cardItems[i].marks;
            var cardIMarksDates = cardItems[i].marksDates;
            cardItems[i] = new CardItem(cardIContent, cardICrea, cardIModif, undefined, cardIMarks, cardIMarksDates);
        }

        card.chinese = cardItems[0];
        card.pinyin = cardItems[1];
        card.translation = cardItems[2];

        return card;
    }


}
