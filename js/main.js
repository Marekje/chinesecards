document.addEventListener("DOMContentLoaded", function() {
  var card1 = new Card('一', 'yi', 'one');
  var body = document.querySelector('body');
  body.appendChild(card1.chinese.createHTML('learn'))
});

function main() {
    console.log('Hello, world !');
}
