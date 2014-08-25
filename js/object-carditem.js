function CardItem(content) {

    /* PARAMS */
    this.dateCrea = Date.now(), // the creation date
    this.datesModif = [], //the last modif date
    this.state = 'look';

    /* CONTENT */
    this.content = content, // a string, such as "汉字" or "hanzi"
    this.question = 'Guess it',
    this.marks = [0], // the marks the item got : [1, 1, 2, 3, 4, 4, 4, 4, 5] (0 == not seen yet)
    this.marksDates = [Date.now()], // the dates when the marks happened : [timestamp, timestamp, ...]

    /* METHODS */

    /* CREATEHTML */
    /*
        -> makes an HTML version of the item
        -> returns it
        state : 'look', 'learn' & 'edit';
    */
    this.createHTML = function(state) {
        var itemObject = this;

        // CREATE HTML
        var itemHTML = document.createElement('div');
            itemHTML.className = 'card-item';
            itemHTML.setAttribute('data-state', 'look');          /* (CHANGE) */
            itemHTML.setAttribute('contenteditable', false);

            var itemText = document.createElement('span');
                itemText.className = 'card-item__text';
                itemText.textContent = this.content; /* ONLY USED IF NO EVENT FIRED */

            var itemEdit = document.createElement('button');
                itemEdit.className = 'btn btn-edit';
                itemEdit.textContent = 'Edit'; /* ONLY USED IF NO EVENT FIRED */

        itemHTML.appendChild(itemText);
        itemHTML.appendChild(itemEdit);

        this.modifyAttributes(itemHTML, state);

        // ADD BEHAVIORS

        /* WHEN DATA-STATE CHANGES */
        itemHTML.addEventListener('change', function(e) {         /* (CHANGE) */

/* DOESN'T WORK - YOU CAN'T LISTEN TO AN ATTRIBUTE THAT'S BEING MODIFIED !!! */

            console.log('hello');

            var dataState = this.getAttribute('data-state');

            itemObject.modifyAttributes(dataStates);

            console.log('The new data-state : ' + itemHTML.getAttribute( 'data-state'));

        }, false);

        /* WHEN EDIT BUTTON IS CLICKED */
        itemEdit.addEventListener('click', function(e) {

            var dataState = itemHTML.getAttribute('data-state');
            itemObject.modifyAttributes(itemHTML, dataState);

            if (dataState === 'edit') {
                itemHTML.setAttribute('data-state', 'look');
                console.log('edit button : edit to look');
            } else {
                itemHTML.setAttribute('data-state', 'edit');
                console.log('edit button : look or learn to edit');
            }

        }, false);

        return itemHTML;
    },

    /* MODIFY ATTRIBUTES ACCORDING TO DATA-STATES (function) */
    this.modifyAttributes = function(itemHTML, dataState) {

        var itemText = itemHTML.querySelector('.card-item__text');

        var itemEdit = itemHTML.querySelector('.btn-edit');

        if (dataState === 'look') {
            itemText.textContent = this.content;
            itemText.setAttribute('contenteditable', false);
            itemEdit.textContent = 'Edit';
            console.log(itemHTML);
        } else if (dataState === 'learn') {
            itemText.textContent = this.question;
            var answer = this.content;
            itemText.addEventListener('click', function(e) {
                this.textContent = answer;
            }, false)
            itemText.setAttribute('contenteditable', false);
            itemEdit.textContent = 'Edit';
            console.log(itemHTML);
        } else if (dataState === 'edit') {
            itemText.textContent = this.content;
            itemText.setAttribute('contenteditable', true);
            itemEdit.textContent = 'Look';
            console.log(itemHTML);
        }
    }

}
