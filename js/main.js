
/*  #########
    CONSTANTS
    Stuff that shouldn't bulge unless I learnt of forgot something...
*/
var cardConst = {
    cardKinds : ['key', 'character', 'word', 'sentence', 'text'],
    cardLevels : 5, // -> http://en.wikipedia.org/wiki/Spaced_repetition
    cardChineseClass : 'card__chinese',
    cardPinyinClass : 'card__pinyin',
    cardTranslationClass : 'card__translation',
}

var ids = {
    learningCard : "learning-card",
    cardForm : "card-form"
}
var appTitle = "学习stories";


/*  #######
    OBJECTS
    Main prototypes for this app's blocks of knowledge
*/

function Deck(cards) {
    this.cards = cards;
  /*this.owner = owner;
    this.creator = creator;
    this.creationDate = setNowTime();
    this.modifDate = setNowTime();
    this.past = '0';*/
}

function Card(chinese, pinyin, translation) {
    this.chinese = chinese;
    this.pinyin = pinyin;
    this.translation = translation;
    /*this.sound = sound;
    this.kind = kind;
    this.blocks = blocks;
    this.level = level;
    this.owner = owner;
    this.creator = creator;
    this.creationDate = setNowTime();
    this.modifDate = setNowTime();
    this.past = '0';
    this.uniqueId = setCardId();*/
}


/*  #### ####
    MAIN CODE
    Here goes the code that's gonna be executed
*/

    console.log("Hello, stranger ! Stop looking at my innards and learn Chinese.");
    //var cardA = new Card('汉字', 'hàn zi', 'Chinese character', false, cardConst.cardKinds[2], ['汉', '字'], 0, 'Pierre');
    //var cardA = new Card('汉字', 'hàn zi', 'Chinese character');
    //var cardB = new Card('汉', 'hàn', 'About Chinese language');
    //var cardC = new Card('字', 'zi', 'Character');
    //var mainDeck = new Deck([cardA, cardB, cardC], 'Pierre', 'Pierre');

    //var mainDeck = new Deck([]);

    var bodyHTML = document.getElementsByTagName('body')[0];

    //learnCardsOneByOne(bodyHTML, mainDeck.cards);
    //saveNewCards(bodyHTML, mainDeck.cards);

    main(bodyHTML);

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

        var mainMenuLocation = document.createElement('div');
            mainMenuLocation.className = 'mainmenu__location';
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
            var cardToSaveHTML = document.getElementById(cardId);
            var cardToSave = createCardFromHTML(cardToSaveHTML);

            //cardToDeck(cardToSave, mainDeck.cards);
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

    // EDIT A CARD
    // -> get the card form and put the card you want to edit in it
    // -> empty the form for the next card
    // -> get a button to go to learnCardsOneByOne
    function editCards(location, deck) {
        location.innerHTML = '';

        var cardForm = cardFormHTML();
    };

/* stop : SCREEN STATES */
/* #####################*/

/* ######################*/
/* start : BUILDING BLOCKS OF APP */

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

    function nextCardButton() {
        var button = document.createElement('button');
            button.setAttribute('id', 'next-button');
            button.textContent = 'Next';

        return button;
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
