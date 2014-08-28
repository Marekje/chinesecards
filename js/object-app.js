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

        /* BASIC CONTENT */
        var mainDeck = new Deck('mainDeck');

        var card1 = new Card('一个人', 'yi ge ren', 'one person');
        var card2 = new Card('两个人', 'liang ge ren', 'two people');
        var card3 = new Card('三个人', 'san ge ren', 'three people');
        var card4 = new Card('四个人', 'si ge ren', 'four people');
        var card5 = new Card('五个人', 'wu ge ren', 'five people');
        var card6 = new Card('六个人', 'liu ge ren', 'six people');

        mainDeck.cards.push(card1);
        mainDeck.cards.push(card2);
        mainDeck.cards.push(card3);
        mainDeck.cards.push(card4);
        mainDeck.cards.push(card5);
        mainDeck.cards.push(card6);

        theApp.decks.push(mainDeck);
        showAllDeck(theApp.decks[0]);

        /* HTML BUILDING */
        /* App */
        var appHTML = document.createElement('div');
            appHTML.id = 'appContainer';
            appHTML.className = 'container';

        /* Menu */
        var look  = Plans.button('action', 'Look');
        var learn = Plans.button('action', 'Learn');
        var add   = Plans.button('action', 'Add');

        var menu = theApp.createMenuHTML([look, learn, add]);

        /* Main location*/
        var mainContent = theApp.createMainContentHTML();

        appHTML.appendChild(menu);
        appHTML.appendChild(mainContent);

        look.addEventListener('click', function(e) {
            theApp.decks[0].whatShouldIDo();
            mainContent.innerHTML = '';
            mainContent.appendChild(theApp.decks[0].showCardsOneByOne('look'));
        }, false);
        learn.addEventListener('click', function(e) {
            theApp.decks[0].whatShouldIDo();
            mainContent.innerHTML = '';
            mainContent.appendChild(theApp.decks[0].showCardsOneByOne('learn'));
        }, false);
        add.addEventListener('click', function(e) {
            theApp.decks[0].whatShouldIDo();
            mainContent.innerHTML = '';
            mainContent.appendChild(theApp.decks[0].addCardsOneByOne());
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
    }


    /*
        CREATE MENU HTML
        create a simple menu for switching between different actions
    */
    this.createMainContentHTML = function() {
        var contentHTML = document.createElement('section');

            //contentHTML.appendChild(this.decks[0].showCardsOneByOne('look'));
            contentHTML.appendChild(this.decks[0].addCardsOneByOne());

        return contentHTML;
    }

    /* SAVE DECKS TO LOCALSTORAGE */


    /* GET DECKS FROM LOCASTORAGE*/
}
