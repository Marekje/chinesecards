/* CARD object
    function Card(
        chinese : a CardItem object
        pinyin: a CardItem object
        translation: a CardItem object
        dateCrea : a timestamp
        datesModif : an array of timestamps
    )
*/

function Card(chinese, pinyin, translation, dateCrea, datesModif) {

    /* PARAMS */
    this.dateCrea = dateCrea ? dateCrea : Date.now(),
    this.datesModif = datesModif ? datesModif : [],

    /* CONTENT */
    this.chinese = chinese ? chinese : new CardItem(),
    this.pinyin = pinyin ? pinyin : new CardItem(),
    this.translation = translation ? translation : new CardItem(),

    /* METHODS */

    this.lastModif = function() { this.datesModif.push(Date.now); },

    /*
        GET LAST MARKS
        -> Get the last marks for all cardItems
    */
    this.getLastMarks = function() {

        var chineseMark = this.chinese.marks[this.chinese.marks.length-1];
        var pinyinMark = this.pinyin.marks[this.pinyin.marks.length-1];
        var translationMark = this.translation.marks[this.translation.marks.length-1];

        var marks = [chineseMark, pinyinMark, translationMark]

        return marks;
    },
    this.isAnEmptyCard = function() {
        if (this.chinese.content
            || this.pinyin.content
            || this.translation.content) {
            /* do nothing */
            return false;
        } else {
            return true;
        }
    },
    this.hasBeenSeen = function() {
        if (this.chinese.marks[this.chinese.marks.length-1] === 2
            || this.pinyin.marks[this.pinyin.marks.length-1] === 2
            || this.translation.marks[this.translation.marks.length-1] === 2) {
            /* do nothing */
            return true;
        } else {
            return false;
        }
    },
    /* IS WELL KNOWN
       how many right answers since last wrong answer
       should return "0" -> wrong answer last, or "number",
       with the number of right answers after the last wrong one
    */
    this.isWellKnown = function() {
        var that = this;

        var chinLvl = that.chinese.levelKnown();
        var pinyLvl = that.pinyin.levelKnown();
        var tranLvl = that.translation.levelKnown();

        var minLvl = Math.min(chinLvl, pinyLvl, tranLvl);

        return minLvl;
    }

    /* CREATEHTML */
    /*
        -> makes an HTML version of the Card
        -> returns it
        -> can change state from look || learn to edit
        card states : 'look', 'learn', 'edit'

    */
    this.createHTML = function(cardState) {

        // VARIABLES
        var cardObject = this;
        var that = this;
        var state;
        cardState ? state = cardState : state = 'learn';
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

            var chineseKnown = that.chinese.levelKnown();
            var pinyinKnown = that.pinyin.levelKnown();
            var translationKnown = that.translation.levelKnown();

            if (chineseKnown === pinyinKnown === translationKnown === 0) {
                chineseState = pinyinState = translationState = 'look';
            } else if (translationKnown === 0 || translationKnown === 1 ) {
                translationState = 'learn';
                chineseState = pinyinState = 'look';
            } else if (pinyinKnown === 0 || pinyinKnown === 1 ) {
                pinyinState = 'learn';
                chineseState = translationState = 'look';
            } else if (chineseKnown === 0 || chineseKnown === 1 ) {
                chineseState = 'learn';
                pinyinState = translationState = 'look';
            } else {
                /* Randomly choose one to learn : */
                var randLearn = getRandomInt(1, 2);
                chineseState = pinyinState = translationState = 'look';
                if (randLearn === 1) {
                    chineseState = 'learn';
                    pinyinState = 'learn';
                } else if (randLearn === 2) {
                    pinyinState = 'learn';
                    translationState = 'learn';
                }
            }
        } else {
            chineseState = pinyinState = translationState = 'look';
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
