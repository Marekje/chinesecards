
/*  #########
    CONSTANTS
    Stuff that shouldn't bulge unless I learnt or forgot something...
*/
var cardConst = {
    cardKinds : ['key', 'character', 'word', 'sentence', 'text'],
    cardChineseClass : 'card__chinese',
    cardPinyinClass : 'card__pinyin',
    cardTranslationClass : 'card__translation',
}
var appTitle = "学习 - xuéxi";


/*  #######
    OBJECTS
    Main prototypes for this app's blocks of knowledge
*/

function App(appLocation) {

    /* PARAMS*/
    this.location = appLocation,

    /* CONTENT */
    this.title = '学习stories';
    this.decks = [new Deck],

    /* METHODS */

    /* --- /!\ THE MAIN FUNCTION /!\ --- */
    // CREATE HTML
    // -> Creates the whole HTML for the whole app.
    // -> Inside, you'll find a menu, a place for the main stuff you're doing...
    this.createHTML = function() {
        //appLocation.appendChild(this.decks[0].showAllCardsHTML());
        //appLocation.appendChild(this.decks[0].showCardsOneByOne(this.decks[0]));

        var mainContent = document.createElement('section');
            mainContent.id = 'mainContent';
            mainContent.className = 'container';

            mainContent.appendChild(this.decks[0].showCardsOneByOne(this.decks[0]))

        var mainMenu = document.createElement('nav');
            mainMenu.id = 'mainMenu';
            mainMenu.className = 'menu';

            mainMenu.appendChild(createLogoHTML(appTitle));
            mainMenu.appendChild(learnAction('mainContent', app.decks[0]));
            mainMenu.appendChild(addAction('mainContent'));

        appLocation.appendChild(mainMenu);
        appLocation.appendChild(mainContent);
    }

    //
    this.addCardsToDeck = function() {
        var theNewCard = new Card();
        appLocation.appendChild(theNewCard.createEditableHTML(theNewCard));
        this.decks[0].addCard(theNewCard);


        // THIS WORKS
        // ADD A BUTTON TO RUN addCardsHTML again
        // ADD A FRACKING MENU :P
    }
}

function Deck() {

    /* PARAMS */
    this.dateCrea = Date.now(),
    this.datesModif = [],

    /* CONTENT */
    this.cards = [],

    /* METHODS */

    // UPDATE THE DATESMODIF AR
    // -> add a new date to the this.datesModif array
    this.updateDatesModif = function() {
        this.datesModif.push(Date.now);
    },

    // ADDCARD
    // -> add a Card to the this.cards array
    this.addCard = function(newCard) {
        if (newCard.chinese) {
            this.cards.push(newCard);
        }
    }

    // JUST LEARNT IT
    // -> take the previous card
    // -> IMPROVEMENT : USE THE LEVEL OF LEARNING
    //      TO KNOW HOW FAR IN THE DECK TO SPLICE
    //      THIS CARD.
    this.justLearntIt = function(boolean) {
        var previousCard = this.cards.shift();

        if (boolean) {
            this.cards.push(previousCard);
        } else {
            this.cards.splice(5, 0, previousCard); //add the card at the fifth place of the deck
        }
    };

    // SHOW ONE CARD
    // -> returns a card in HTML
    this.showOneCard = function(index) {
        var card = this.cards[index].createHTML();
        return card;
    }

    // NEXT CARD
    // -> ARRANGE A CARD LEARNT
    // -> SHOW THE NEXT ONE

    // SHOW ALL CARDS AT ONCE
    // -> Shows every Card next to each other
    this.showAllCardsHTML = function() {
        console.log('Deck.showAllCardsHTML()');
        var cardsHTML = document.createElement('section');
            cardsHTML.className = 'allcards';
        for (i=0; i<this.cards.length; i++) {
            cardsHTML.appendChild(this.cards[i].createHTML());
        }
        return cardsHTML;
    }

    // SHOW ALL CARDS ONE BY ONE
    // -> Shows every card of the deck, one by one.
    // -> Doesn't update anything in the Cards
    this.showCardsOneByOne = function(deck) {
        console.log('Deck.showCardsOneByOne()');

        // DATA
        cardBlockId = 'cardBlock';

        // SECTION
        var cardsHTML = document.createElement('section');

        // SHOW A CARD HERE
        var cardBlockHTML = document.createElement('div');
            cardBlockHTML.id = cardBlockId;
            cardBlockHTML.appendChild(deck.cards[0].createHTML());

        // MODIFY/CHANGE THE CARD HERE
        var editCardHTML = document.createElement('div');
            editCardHTML.id = 'cardToolbarBlock';

            //EDIT BUTTON
            var editButton = document.createElement('button'); // NOT FUNCTIONAL YET
                editButton.textContent = 'Edit';

            // NEXT CARD BUTTON
            var nextCardButton = nextCardButtonHTML();
                nextCardButton.addEventListener('click', function() {
                    var location = document.querySelector('#'+cardBlockId);
                    location.innerHTML = '';
                    deck.justLearntIt(true);
                    location.appendChild(deck.showOneCard(0));
                }, false)

            editCardHTML.appendChild(editButton);
            editCardHTML.appendChild(nextCardButton);

        // ADD EVERYTHING TO THE SECTION
        cardsHTML.appendChild(cardBlockHTML);
        cardsHTML.appendChild(editCardHTML);


        return cardsHTML;
    }
}

function Card(chinese, pinyin, translation) {

    /* PARAMS */
    this.dateCrea = Date.now(),
    this.datesModif = [],

    /* CONTENT */
    this.chinese = new CardItem(chinese),
    this.pinyin = new CardItem(pinyin),
    this.translation = new CardItem(translation),

    /* METHODS */

    this.updateDatesModif = function() { this.datesModif.push(Date.now); },

    // CREATEHTML
    // -> makes an HTML version of the Card
    // -> returns it
    this.createHTML = function() {

        var cardHTML = document.createElement('div');
            cardHTML.className = 'card';

        cardHTML.appendChild(this.chinese.createHTML('chinese'));
        cardHTML.appendChild(this.pinyin.createHTML('pinyin'));
        cardHTML.appendChild(this.translation.createHTML('translation'));

        return cardHTML;
    }

    // MAKES AND EDITABLE HTML VERSION OF THE CARD
    // -> Creates an editable HTML version of the Card
    // -> Saves it instantly in the Card Object
    // -> Adds it to the only deck in the list (WHEN SEVERAL DECKS, TAKE ACTIVE DECK)
    this.createEditableHTML = function(newCard) {
        var cardHTML = document.createElement('div');
            cardHTML.className = 'card';

        cardHTML.appendChild(this.chinese.createEditableHTML('chinese'));
        cardHTML.appendChild(this.pinyin.createEditableHTML('pinyin'));
        cardHTML.appendChild(this.translation.createEditableHTML('translation'));

        cardHTML.addEventListener('keyup', function(e) {
            var chineseHTML = this.querySelector('.card__item--chinese').textContent;
            var pinyinHTML = this.querySelector('.card__item--pinyin').textContent;
            var translationHTML = this.querySelector('.card__item--translation').textContent;

            newCard.chinese.content = chineseHTML;
            newCard.pinyin.content = pinyinHTML;
            newCard.translation.content = translationHTML;

        }, false)

        return cardHTML;
    }
}

function CardItem(content) {

    /* PARAMS */
    this.dateCrea = Date.now(), // the creation date
    this.datesModif = []; //the last modif date

    /* CONTENT */
    this.content = content, // a string, such as "汉字" or "hanzi"
    this.marks = new ItemMarks(),

    /* METHODS */

    // CREATEHTML
    // -> makes an HTML version of the item
    // -> returns it
    this.createHTML = function(specificClass) {
        var itemHTML = document.createElement('div');
            itemHTML.className = 'card__item card__item--'+specificClass;;
            itemHTML.textContent = this.content;

        return itemHTML;
    }

    // MAKES AN EDITABLE HTML VERSION OF THE CARDITEM
    // -> Instantly updates the CardItem Object
    this.createEditableHTML = function(specificClass) {
        var itemHTML = document.createElement('div');
            itemHTML.className = ' card__item card__item--editable card__item--'+specificClass;;
            itemHTML.setAttribute('contenteditable', 'true');
            itemHTML.textContent = this.content;

        return itemHTML;
    }

}

function ItemMarks() {
    this.marks = [0], // the marks the item got : [1, 1, 2, 3, 4, 4, 4, 4, 5] (0 == not seen yet)
    this.marksDates = [Date.now()], // the dates when the marks happened : [timestamp, timestamp, ...]
    this.dateCrea = Date.now(),

    // addMark
    // -> Add a new mark in the marks array
    // -> Add the date in the marksDates array
    this.addMark = function(boolean) {
        lastMark = this.marks.length;
        boolean ? this.marks.push(lastMark+1) : this.marks.push(lastMark);
    }
}

/*  #### ####
    MAIN CODE
    Here goes the code that's gonna be executed
*/

    console.log("Hello, stranger ! Stop looking at my innards and learn Chinese.");

    var bodyHTML = document.getElementsByTagName('body')[0];

    //learnCardsOneByOne(bodyHTML, mainDeck.cards);
    //saveNewCards(bodyHTML, mainDeck.cards);

    var card1 = new Card('一', 'yi', 'one');
    var card2 = new Card('二', 'er', 'two');
    var card3 = new Card('三', 'san', 'three');
    var card4 = new Card('四', 'si', 'four');
    var card5 = new Card('五', 'wu', 'five');
    var card6 = new Card('六', 'liu', 'six');
    var card7 = new Card('七', 'qi', 'seven');

    var appLocation = document.querySelector('body');
    var app = new App(appLocation);

    app.decks[0].addCard(card1);
    app.decks[0].addCard(card2);
    app.decks[0].addCard(card3);
    app.decks[0].addCard(card4);
    app.decks[0].addCard(card5);
    app.decks[0].addCard(card6);
    app.decks[0].addCard(card7);

    app.createHTML();


/* end : MAIN CODE
##################
*/

/*  #########
    FUNCTIONS
    All the functions I need, unless they belong to a specific object
*/

/* ######################*/
/* start : SCREEN STATES */

    // MAIN
    // -> show a card
    // -> Add a way to (show the next card)+(change the first card's number of view) when you click a button
    function main(location) {
        var deck = createDeck();
        location.innerHTML = '';

        var mainMenuLocation = document.createElement('nav');
            mainMenuLocation.className = 'mainmenu__location mainnav';
        location.appendChild(mainMenuLocation);

        var contentLocation = document.createElement('div');
            contentLocation.className = 'content__location';
        location.appendChild(contentLocation);

        //add a menu to choose between learning and adding cards
        navigateTheApp(mainMenuLocation, deck);

        //After refresh, learn cards if the deck is not empty, otherwise add cards
        if (deck.cards.length === 0) {
            saveNewCards(contentLocation, deck);
        } else {
            learnCardsOneByOne(contentLocation, deck);
        }
    }

    // NAVIGATE THROUGH THE APPLICATION
    // -> Shows a menu
    // -> The menu helps you navigate through the app
    function navigateTheApp(location, deck) {
        location.innerHTML = '';

        // Logo
        var logo = createLogoHTML(appTitle);

        // Menu
        var items = [
            ['Learn', 'learncards-link'],
            ['Add', 'addcards-link']
        ];
        var mainMenu = mainMenuHTML(items);

        location.appendChild(logo);
        location.appendChild(mainMenu);

        document.getElementById('learncards-link').addEventListener('click', function(e) {
            var contentLocation = document.querySelector('.content__location')
            learnCardsOneByOne(contentLocation, deck);
        }, false)
        document.getElementById('addcards-link').addEventListener('click', function(e) {
            var contentLocation = document.querySelector('.content__location')
            saveNewCards(contentLocation, deck);
        }, false)
    }


    // LEARN CARDS ONE BY ONE
    // -> show a card
    // -> Add a way to (show the next card)+(change the first card's number of view) when you click a button
    function learnCardsOneByOne(location, deck) {
        location.innerHTML = ''; //empty the place where I put the card-to-be-learned
        cardId = ids.learningCard; //an ID making it easy for the button to know its Card

        var cardToShow = oneCardHTML(deck.cards[0]);
            cardToShow.setAttribute('id', cardId); //Add the ID to the Card
        var nextButton = nextCardButton();

        location.appendChild(cardToShow); // Just HTML, no JS
        location.appendChild(nextButton); // Just HTML, no JS

        //This will make magic happend in the HTML :
        nextButton.addEventListener('click', function(e) {

            // Push the previous Card back to the end of the deck
            sortFirstCard(deck.cards, 'end');
            //show a new Card
            learnCardsOneByOne(location, deck);
            //save the deck
            saveDeckToLocalStorage(deck);

        }, false)
    };

    // SEE ALL CARDS
    // -> see all cards in the same window, with as little scrolling as possible
    function seeAllCards() {};

    // SAVE NEW CARDS
    // -> get a form that saves a card
    // -> empty the form for the next card
    // -> get a button to go to learnCardsOneByOne
    function saveNewCards(location, deck) {
        location.innerHTML = '';
        formId = ids.cardForm;

        var cardForm = cardFormHTML();
            cardForm.setAttribute('id', formId);
        var nextButton = nextCardButton();

        location.appendChild(cardForm);
        location.appendChild(nextButton);

        nextButton.addEventListener('click', function(e) {
            var cardToSaveForm = document.getElementById(formId);
            var cardToSave = createCardFromForm(cardToSaveForm);

            addCardToDeck(cardToSave, deck.cards, 'beginning');
            saveDeckToLocalStorage(deck);

            saveNewCards(location, deck);

        }, false)

    };

/* stop : SCREEN STATES */
/* #####################*/

/* ######################*/
/* start : BUILDING BLOCKS OF APP */

    // LEARN ONE CARD
    function learnOneCard(card) {
        var cardHTML = oneCardHTML(card);
        return cardHTML;
    }

    //if a deck exists in LocalStorage, get it, else create one
    function createDeck() {
        var deck = getDeckFromLocalStorage('maindeck');
        if (!deck) {
            deck = new Deck([]);
        }
        return deck;
    }

    // PUT A CARD YOU JUST SAW BACK TO ITS DECK
    // card : Card object
    // deck : Deck object
    // You just saw a card, you know it or you don't
    // The card goes back to the end of its deck, with updated informations
    // IT SHOULD CHECK if the card exists already or not, and then update the deck according to that
    function cardToDeck(card, deck) {
        deck.push(card);

        var deckShow = '';
        for (i=0; i<deck.length; i++) {
            deckShow += ' - ' + deck[i].chinese;
        }

    }

    // SWITCH CARD FROM deck[0] TO deck[place]
    // Possible places : next | (number||last) | last
    // -> (deck)
    function sortFirstCard(deck, position) {
        var card = deck.shift();
        //deck.push(card);
        addCardToDeck(card, deck, position);
    }

    // ADD A NEW CARD TO A DECK
    // (Card object, Deck object, Position you want to put the Card in the Deck)
    // Possible positions : beginning, end, number||end
    function addCardToDeck(card, deck, position) {
        if(position === 'beginning') {
            deck.unshift(card);
        } else if (position === 'end') {
            deck.push(card);
        } else {
            position<deck.length ? deck.splice(position, 0, card) : deck.push(card);
        }
    }

    // createCardFromHTML
    // -> Get the HTML of a Card
    // -> Return a brand new Card object
    function createCardFromHTML(cardHTML) {

        var chinese = cardHTML.querySelector('.' + cardConst.cardChineseClass).textContent;
        var pinyin = cardHTML.querySelector('.' + cardConst.cardPinyinClass).textContent;
        var translation = cardHTML.querySelector('.' + cardConst.cardTranslationClass).textContent;

        var cardToSave = new Card(chinese, pinyin, translation);

        return cardToSave;
    }

    // createCardFromForm
    // -> Get a HTML Form for a Card
    // -> Return a brand new Card object
    function createCardFromForm(form) {

        var chinese = form.querySelector('input'+'.' + cardConst.cardChineseClass).value;
        var pinyin = form.querySelector('input'+'.' + cardConst.cardPinyinClass).value;
        var translation = form.querySelector('input'+'.' + cardConst.cardTranslationClass).value;

        var cardToSave = new Card(chinese, pinyin, translation);

        return cardToSave;
    }

/* stop : BUILDING BLOCKS OF APP */
/* ######################*/

/* ######################*/
/* start : HTML TEMPLATES */

    function oneCardHTML(card) {

        var cardHTML  = document.createElement('div');
            cardHTML.className = 'card';
            cardHTML.id = card.uniqueId;

        cardHTML.appendChild(itemHTML('p', cardConst.cardChineseClass, card.chinese));
        cardHTML.appendChild(itemHTML('p', cardConst.cardPinyinClass, card.pinyin));
        cardHTML.appendChild(itemHTML('p', cardConst.cardTranslationClass, card.translation));

        return cardHTML;
    };
    function cardFormHTML(card) {
        if(card) { console.log('there\'s a card, fill in the form with it !');};

        var uniqueRef = 0;

        var cardFormHTML = document.createElement('form');
            cardFormHTML.className = 'card-form';

            var cardChinese = formGroup_Input_HTML('Chinese', 'hanzis', cardConst.cardChineseClass, uniqueRef);
            uniqueRef++;

            var cardPinyin = formGroup_Input_HTML('Pinyin', 'pinyin', cardConst.cardPinyinClass, uniqueRef);
            uniqueRef++;

            var cardTranslation = formGroup_Input_HTML('Translation', 'french or english', cardConst.cardTranslationClass, uniqueRef);
            uniqueRef++;

        cardFormHTML.appendChild(cardChinese);
        cardFormHTML.appendChild(cardPinyin);
        cardFormHTML.appendChild(cardTranslation);

        return cardFormHTML;
    };


    function formGroup_Input_HTML(labelName, placeholder, nameOfClass, uniqueRef, inputContent) {

        var formGroup = document.createElement('div');
            formGroup.className = uniqueRef + ' card__form-group';

            var formGroupLabel = document.createElement('label');
                formGroupLabel.className = nameOfClass + ' card__label';
                formGroupLabel.setAttribute('for', uniqueRef); //[for="XX"]
                formGroupLabel.textContent = labelName + ' :';

            var formGroupInput = document.createElement('input');
                formGroupInput.className = nameOfClass + ' card__input';
                formGroupInput.setAttribute('id', uniqueRef); //[id="XX"]
                formGroupInput.setAttribute('placeholder', placeholder)
                formGroupInput.value = inputContent ? inputContent : ''; //Ternary

        formGroup.appendChild(formGroupLabel);
        formGroup.appendChild(formGroupInput);

        return formGroup;
    };

    function itemHTML(nameOfElement, nameOfClass, content) {
        var itemHTML = document.createElement(nameOfElement);
            itemHTML.className = nameOfClass;
            itemHTML.textContent = content;

        return itemHTML;
    };

    // CREATE A MENU ( [ [itemname, itemId itemFunction], [itemName, itemId, itemFunction] ] )
    function mainMenuHTML(items) {

        var mainListHTML = document.createElement('ul');
            mainListHTML.className = 'mainmenu';

            for(var i=0; i<items.length; i++) {
                var item = document.createElement('li');
                    item.className = 'mainmenu__item';

                    var link = document.createElement('a');
                        link.setAttribute('href', '#');
                        link.setAttribute('id', items[i][1]);
                        link.className = 'mainmenu__link';
                        link.textContent = items[i][0];

                    item.appendChild(link);
                mainListHTML.appendChild(item);
            }

        return mainListHTML

    }

    //NEXT CARD BUTTON
    // ->
    function nextCardButtonHTML() {
        var button = document.createElement('button');
            button.setAttribute('id', 'next-button');
            button.className = 'btn btn__action btn__main-action';
            button.textContent = 'Next';

        return button;
    };

    // CREATE A LOGO ('string')
    // -> get a text and a link to the "Home"
    // -> Put it inside a box
    // -> returns a HTML with a logo inside
    function createLogoHTML(text) {
        var logoHTML = document.createElement('h1');
            logoHTML.textContent = text;
        return logoHTML;
    }

/* end : HTML TEMPLATES */
/* ######################*/

/* ######################*/
/* start : ACTIONS BUTTONS */

    // ACTION : LEARN
    // -> creates a button [Learn]
    // -> AddEvent to the button
    // -> The event modifies the 'target' html so as to show the 'learn' action
    // -> 'target' is the id of the place where you'll show the [learn]
    function learnAction(target, deck) {
        var learnHTML = document.createElement('button');
            learnHTML.className = 'btn';

            // CONTENT
            var learnIcon = document.createElement('span');
                learnIcon.textContent = '学 ';
                learnIcon.className = 'btn__icon';

            var learnText = document.createElement('span');
                learnText.textContent = 'learn';
                learnText.className = 'btn__label';

            learnHTML.appendChild(learnIcon);
            learnHTML.appendChild(learnText);

            // EVENT
            learnHTML.addEventListener('click', function(e) {
                var location = document.getElementById(target);
                location.innerHTML = '';

                location.appendChild(deck.showCardsOneByOne(deck));

            }, false);

        return learnHTML;
    }

    // ACTION : LEARN
    // -> creates a button [Learn]
    // -> AddEvent to the button
    // -> The event modifies the 'target' html so as to show the 'learn' action
    // -> 'target' is the id of the place where you'll show the [learn]
    function addAction(target) {
        var addHTML = document.createElement('button');
            addHTML.className = 'btn';

            // CONTENT
            var addIcon = document.createElement('span');
                addIcon.textContent = '十 ';
                addIcon.className = 'btn__icon';

            var addText = document.createElement('span');
                addText.textContent = 'add';
                addText.className = 'btn__label';

            addHTML.appendChild(addIcon);
            addHTML.appendChild(addText);

            // EVENT
            addHTML.addEventListener('click', function(e) {

                var location = document.getElementById(target);
                location.innerHTML = '';

                location.appendChild(app.addCardsToDeck());

            }, false);

        return addHTML;
    }


/* end : ACTIONS BUTTONS */
/* ######################*/

/* ######################*/
/* start : LOCALSTORAGE */
    function saveDeckToLocalStorage(deck) {
        var deckToSave = JSON.stringify(deck)
        localStorage.setItem('maindeck', deckToSave);
        console.log('saved' + localStorage.getItem('maindeck'));
    }

    function getDeckFromLocalStorage() {
        var savedDeck = localStorage.getItem('maindeck');
        if (savedDeck) {
            console.log('Got the deck !')
            deck = JSON.parse(savedDeck);
        } else {
            console.log('there is no deck (yet) in LocalStorage.')
            return false;
        }
        return deck;
    }
/* stop : LOCALSTORAGE */
/* ######################*/

/* ###################### */
/* GENERIC HELPER FUNCTIONS */

//get a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* stop : GENERIC HELPER FUNCTIONS */
/* ############################### */
