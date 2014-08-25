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

    /* CREATEHTML */
    /*
        -> makes an HTML version of the Card
        -> returns it
        -> can change state from look||learn to edit
        card states : 'look', 'learn', 'edit'

    */
    this.createHTML = function(state) {

        // VARIABLES
        var cardObject = this;

        var chineseHTML, pinyinHTML, translationHTML;
        var editCard = Plans.editButton();

        // CREATE HTML
        chineseHTML = this.chinese.createHTML(false, false);
        pinyinHTML = this.pinyin.createHTML(false, false);
        translationHTML = this.translation.createHTML(false, false);

        var cardHTML = Plans.card('card', state, chineseHTML, pinyinHTML, translationHTML, editCard);
            cardHTML.setAttribute('data-state', state ? state : 'look');

        // ADD BEHAVIOR

        return cardHTML;
    }

    /* SWITCH THROUGH LOOK, LEARN AND EDIT IN THE HTML
        ->
    */

}
