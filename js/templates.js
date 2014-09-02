var Plans = {


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
