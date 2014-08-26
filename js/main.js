document.addEventListener("DOMContentLoaded", function() {
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

    showAllDeck(mainDeck);

    var body = document.querySelector('body');
    body.appendChild(mainDeck.lookAtCards());
});

function main() {
    console.log('Hello, world !');
};

function showAllDeck(deck) {
    var showDeck = deck.name + ':';
    for (var i=0; i<deck.cards.length; i++) {
        showDeck += ' | ' + deck.cards[i].chinese.content;
    }
    console.log(showDeck);
};
