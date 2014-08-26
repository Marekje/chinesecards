function CardItem(content) {

    /* PARAMS */
    this.dateCrea = Date.now(), /* the creation date */
    this.datesModif = [], /* the last modif date */

    /* CONTENT */
    this.content = content, /* a string, such as "汉字" or "hanzi" */
    this.question = 'I don\'t know.',
    this.marks = [0], /* the marks the item got : [0, 1, 3, 2, 1, 0, 1]
                         0 : 'not seen yet'
                         1 : 'look'
                         2 : 'right answer'
                         3 : 'wrong answer' */
    this.marksDates = [Date.now()], /* the dates when the marks happened :
                                       [timestamp, timestamp, ...] */


    /* UPDATE MARKS
        We consider that the person has +1 mark as long as he/she doesn't click
        on the answer.
    */
    this.updateMarks = function(number) {
        var itemObject = this;
        if (number === 3) {
            itemObject.marks.pop();
            itemObject.marks.push(number);
            itemObject.marksDates.pop();
            itemObject.marksDates.push(Date.now());
        } else {
            itemObject.marks.push(number);
            itemObject.marksDates.push(Date.now());
        }

    }

    /* CREATEHTML */
    /*
        -> makes an HTML version of the item
        -> returns it
        state : 'look', 'learn' & 'edit';
    */
    this.createHTML = function(state) {

        // CREATE VARIABLES ACCORDING TO STATE
        var itemObject = this;

        var editability, editButtonContent,
        answerVisibility, questionVisibility;

        if (state === 'edit') {
            editability = true;
            editButtonContent = 'Save';
            answerVisibility = 'visible';
            questionVisibility = 'hidden';
        } else if (state === 'learn') {
            editability = false;
            editButtonContent = 'Edit';
            answerVisibility = 'hidden';
            questionVisibility = 'visible';
            itemObject.updateMarks(2); /* add a good mark for this object,
                                             see (a) for bad marks, */
        } else {
            editability = false;
            editButtonContent = 'Edit';
            answerVisibility = 'visible';
            questionVisibility = 'hidden';
            itemObject.updateMarks(1);
        }

        // CREATE HTML
        var itemHTML = document.createElement('div');
            itemHTML.className = 'card-item';
            itemHTML.setAttribute('data-state', state);

            var itemAnswer = document.createElement('span');
                itemAnswer.className = 'card-item__answer ' + answerVisibility;
                itemAnswer.textContent = this.content;
                itemAnswer.setAttribute('contenteditable', editability);

            var itemQuestion = document.createElement('span');
                itemQuestion.className = 'card-item__question ' + questionVisibility;
                itemQuestion.textContent = this.question;

        itemHTML.appendChild(itemAnswer);
        itemHTML.appendChild(itemQuestion);

        // ADD BEHAVIORS
        /* When you click on a question, it shows the answer & put a bad grade */
        itemQuestion.addEventListener('click', function(e) {           /* (a) */
            itemQuestion.className = 'card-item__question hidden';
            itemAnswer.className = 'card-item__answer visible';
            itemObject.updateMarks(3);
        }, false);

        /* When you click on an answer, it becomes editable */
        itemAnswer.addEventListener('click', function(e) {
            itemAnswer.setAttribute('contenteditable', true);
        }, false)

        /* When you type in an answer, it updates the carditem */
        itemAnswer.addEventListener('keyup', function(e) {
            itemObject.content = this.textContent;
        }, false)

        return itemHTML;
    }

}
