var Plans = {

    /* DO SMTG WITH CARDS ONE BY ONE
        -> Creates a template that show a card and a button bar
        card : the HTML for a Card object
        buttons : an Array of HTML buttons
    */
    doCardsOneByOne: function(card, buttons) {

        var doCardsHTML = document.createElement('section');
            doCardsHTML.className = 'deck__learn';

            var cardLocation = document.createElement('div');
                cardLocation.id = 'deckOneCard';
                cardLocation.className = 'deck__card';
                cardLocation.appendChild(card);

            var toolbar = document.createElement('ul');
                toolbar.className = 'deck__toolbar';

                for (i=0; i<buttons.length; i++) {
                    var toolbarButton = document.createElement('li');
                        toolbarButton.appendChild(buttons[i]);
                    toolbar.appendChild(toolbarButton);
                }

        doCardsHTML.appendChild(cardLocation);
        doCardsHTML.appendChild(toolbar);

        return doCardsHTML;
    },

    /* CARD */
    /*
        uniqueId : the card's ID
        state : The card's state, if user's goal is to look, learn or edit it.
        cardItemN : HTML nodes for the different items
    */
    card : function(uniqueId, state, cardItem1, cardItem2, cardItem3, editButton) {
        var cardHTML = document.createElement('article');
            cardHTML.className = 'card';
            cardHTML.id = uniqueId;

            var chineseItem = document.createElement('div');
                chineseItem.className = 'card__chinese';
                chineseItem.appendChild(cardItem1);

            var pinyinItem = document.createElement('div');
                pinyinItem.className = 'card__pinyin';
                pinyinItem.appendChild(cardItem2);

            var translationItem = document.createElement('div');
                translationItem.className = 'card__translation';
                translationItem.appendChild(cardItem3);

            cardHTML.appendChild(chineseItem);
            cardHTML.appendChild(pinyinItem);
            cardHTML.appendChild(translationItem);

        return cardHTML;
    },


    /* BUTTON : EDIT
        states : 'fixed' || 'editable'
    */

    button : function(buttonClass, buttonName) {
        var buttonHTML = document.createElement('button');
            buttonHTML.className = 'btn btn--' + buttonClass;
            buttonHTML.textContent = buttonName;

        return buttonHTML;
    }

    /* SHOW CARDS ONE BY ONE
        a simple template allowing a card on the left and a next button on the
        right, unless I changed the styles...
    */
}
