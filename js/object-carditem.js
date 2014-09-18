/* CARDITEM object
    function CardItem(
        content: a string
        dateCrea: a timestamp
        datesModif: an array of timestamps
        question: a string
        marks: an array of numbers
        marksDates: an array of timestamps
    )
*/

function CardItem(content, dateCrea, datesModif, question, marks, marksDates) {

    /* PARAMS */
    this.dateCrea = dateCrea ? dateCrea : Date.now(), /* the creation date */
    this.datesModif = datesModif ? datesModif : [], /* the last modif date */

    /* CONTENT */
    this.content = content ? content : undefined, /* a string, such as "汉字" or "hanzi" */
    this.question = question ? question : 'I don\'t know.',
    this.marks = marks ? marks : [0], /* the marks the item got : [0, 1, 3, 2, 1, 0, 1]
                         0 : 'not seen yet'
                         1 : 'wrong answer'
                         2 : 'look'
                         3 : 'right answer' */
    this.marksDates = marksDates ? marksDates : [Date.now()], /* the dates when the marks happened :
                                       [timestamp, timestamp, ...] */


    /* UPDATE MARKS
        We consider that the person has +1 mark as long as he/she
        doesn't click on the answer.
        When you get a wrong answer, delete the last mark and replace
        it with the bad mark :p
    */
    this.updateMarks = function(number) {
        var that = this;
        if (number === 1) {
            that.marks.pop();
            that.marks.push(number);
            that.marksDates.pop();
            that.marksDates.push(Date.now());
        } else {
            that.marks.push(number);
            that.marksDates.push(Date.now());
        }
    }

    /* LEVEL KNOWN
        returns the number of times since last wrong answer,
        or if you've never seen it
    */
    this.levelKnown = function() {
        var that = this;
        var levelKnown = 0;

        for (var i=that.marks.length; i>0; i--) {
            if (that.marks[i-1] > 1) {
                levelKnown++;
            } else {
                return levelKnown;
            }
        }
        return levelKnown;

    }

    /* CREATEHTML */
    /*
        -> makes an HTML version of the item
        -> returns it
        state : 'look', 'learn' & 'edit';
    */
    this.createHTML = function(state) {

        // CREATE VARIABLES ACCORDING TO STATE
        var that = this;

        var editability = false; /* most used state */
        var questionState = 'none';   /* idem */

        if (state === 'edit') {
            editability = true;
        } else if (state === 'learn') {
            questionState = 'hidden';
            that.updateMarks(3); /* add a good mark for this object,
                                             see (a) for bad marks, */
        } else {
            that.updateMarks(2);
        }

        // CREATE HTML
        var itemHTML = document.createElement('p');
            itemHTML.textContent = this.content;
            itemHTML.className = 'card-item';
            itemHTML.setAttribute('am-Question', questionState);
            itemHTML.setAttribute('contenteditable', editability);
            itemHTML.setAttribute('data-state', state);

        // ADD BEHAVIORS

        /* When you click on an answer, it becomes editable */
        itemHTML.addEventListener('click', function(e) {
            if (this.getAttribute('am-Question') === 'hidden') {
                itemHTML.setAttribute('am-Question', 'shown');
                that.updateMarks(1);
            } else {
                itemHTML.setAttribute('am-Question', 'none');
                itemHTML.setAttribute('contenteditable', true);
            }
        }, false)

        /* When you type in an answer, it updates the carditem */
        itemHTML.addEventListener('keyup', function(e) {
            that.content = this.textContent;
        }, false)

        return itemHTML;
    }

}
