function Card(chinese, pinyin, translation) {

    /* PARAMS */
    this.dateCrea = Date.now(),
    this.datesModif = [], /* ONLY EDIT MODIFICATION HERE.
                             LEARNING MODIFICATIONS ARE LOGGED
                             IN THE CARD ITEMS*/

    /* CONTENT */
    this.chinese = new CardItem(chinese),
    this.pinyin = new CardItem(pinyin),
    this.translation = new CardItem(translation),

    /* METHODS */

    this.lastModif = function() { this.datesModif.push(Date.now); },

    /* CREATEHTML */
    /*
        -> makes an HTML version of the Card
        -> returns it
        -> can change state from look||learn to edit
        card states : 'look', 'learn', 'edit'

    */
    this.createHTML = function(cardState) {

        // VARIABLES
        var cardObject = this;
        var state;
        cardState ? state = cardState : state = 'BOF';

        var chineseHTML, pinyinHTML, translationHTML;
        var editCard = Plans.editButton();

        // CREATE HTML
        chineseHTML = this.chinese.createHTML('learn');
        pinyinHTML = this.pinyin.createHTML('look');
        translationHTML = this.translation.createHTML('look');

        var cardHTML = Plans.card('card', state, chineseHTML, pinyinHTML, translationHTML, editCard);
            cardHTML.setAttribute('data-state', state ? state : 'look');

        // ADD BEHAVIOR

        return cardHTML;
    }

    /* SWITCH THROUGH LOOK, LEARN AND EDIT IN THE HTML
        ->
    */

}
