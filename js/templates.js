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

            var editDiv = document.createElement('div');
                editDiv.className = 'card__edit';
                editDiv.appendChild(editButton);

            cardHTML.appendChild(chineseItem);
            cardHTML.appendChild(pinyinItem);
            cardHTML.appendChild(translationItem);
            cardHTML.appendChild(editButton);

        return cardHTML;
    },

    /* CARD ITEM */
    /*
        an item, usually shown in a card
        content : the item's text
    */
    cardItem : function(content) {
        var itemHTML = document.createElement('div');
            itemHTML.className = 'card__item';
            itemHTML.textContent = content;

        return itemHTML;
    },

    /* BUTTON : EDIT
        states : 'fixed' || 'editable'
    */

    editButton : function() {
        var editButtonHTML = document.createElement('button');
            editButtonHTML.className = 'btn btn--edit';
            editButtonHTML.textContent = 'inactive';

        return editButtonHTML;
    }
}
