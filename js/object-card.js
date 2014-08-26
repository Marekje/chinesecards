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
        cardState ? state = cardState : state = 'look';
        var chineseState, pinyinState, translationState;

        if (cardState === 'look') {
            chineseState = pinyinState = translationState = 'look';
        } else if (cardState === 'edit') {
            chineseState = pinyinState = translationState = 'edit';
        } else if (cardState === 'learn') {

            /* REDO IT USING ARRAY.SORT() */
            /* I tried but couldn't figure out how to re-attribute the sorted
               array to the var...*/

            /* get last marks date for the three of them */
            var chineseState = cardObject.chinese.marks[cardObject.chinese.marks.length-1];
            var pinyinState = cardObject.pinyin.marks[cardObject.pinyin.marks.length-1];
            var translationState = cardObject.translation.marks[cardObject.translation.marks.length-1];

            if (chineseState < pinyinState || chineseState < translationState) {
                console.log('chinese learn');
                chineseState = 'learn';
                pinyinState = translationState = 'look';
            } else if (pinyinState < chineseState || pinyinState < translationState) {
                console.log('pinyin learn');
                pinyinState = 'learn';
                chineseState = translationState = 'look';
            } else if (translationState < chineseState || translationState < pinyinState) {
                console.log('translation learn');
                translationState = 'learn';
                chineseState = pinyinState = 'look';
            } else {
                console.log('IDK learn, so chinese');
                chineseState = 'learn';
                pinyinState = translationState = 'look';
            }
            console.log(cardObject.chinese.marks);
            console.log(cardObject.pinyin.marks);
            console.log(cardObject.translation.marks);
        } else {
            chineseState = pinyinState = translationState = 'look';
            console.log('Card.createHTML does not receive any cardState');
        }

        var chineseHTML, pinyinHTML, translationHTML;

        // CREATE HTML
        chineseHTML = this.chinese.createHTML(chineseState);
        pinyinHTML = this.pinyin.createHTML(pinyinState);
        translationHTML = this.translation.createHTML(translationState);

        var cardHTML = Plans.card('card', state, chineseHTML, pinyinHTML, translationHTML);
            cardHTML.setAttribute('data-state', state ? state : 'look');

        // ADD BEHAVIOR

        return cardHTML;
    }

    /* SWITCH THROUGH LOOK, LEARN AND EDIT IN THE HTML
        ->
    */

}
