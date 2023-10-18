const word_el = document.getElementById("word");
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('succesfull-msg')
const items = document.querySelectorAll('.item');
const wrongLetters_el = document.querySelector('#wrong-letters')
const message = document.getElementById('message');
const againBtn = document.getElementById('play-again');


let selectedWord = getRandomWord();

const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
  const words = ["seray", "akif", "albayrak", "beyza", "melis", "asli","sude"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    
    `;

    const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Congrats You Win!';
    }
}

displayWord()

window.addEventListener('keydown',function(e){
    if(e.keyCode>= 65 && e.keyCode<=90){
        const letter =e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord();
            }else{
                displayMessage()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage()
            }
        }
    }
})

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0?'<h3>Wrong letters</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if (index<errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'You lose!';
    }


}
function displayMessage(){
    message.classList.add('show');
    setTimeout(function(){
        message.classList.remove('show')
    },2000)
}

againBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
})