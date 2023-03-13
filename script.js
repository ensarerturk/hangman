const wordElement = document.getElementById("words");
const popup = document.getElementById("popup-container");
const success_message = document.getElementById("success-message");
const wrongLetter_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const letterAlreadyHave = document.getElementById("message");
const failedPopup = document.querySelector(".popup");
const playAgainBtn = document.getElementById("play-again");

let randomLetter = getRandomWords();
const correctLetter = [];
const wrongLetters = [];

function getRandomWords() {
    const randomElement = ["ornitorenk", "mercan", "kaplan", "kareografi", "anestezi", "zencefil", "sivrisinek", 
    "rehabilitasyon", "profiterol", "muayehane", "klostrofobi", "laboratuvar", "sezaryen", "poliklinik", "inisiyatif"];

    return randomElement[Math.floor(Math.random() * randomElement.length)]
}

function displayWord() {

    wordElement.innerHTML = `${
        randomLetter.split('').map(
            letter => `
                <div class='letter'>
                    ${correctLetter.includes(letter) ? letter : ''}
                </div>
            `
        ).join('')
    }`

    const appearLetter = wordElement.innerText.replace(/\n/g, '');
    if (appearLetter === randomLetter) {
        popup.style.display = 'flex';
        success_message.innerText = 'Tebrikler Kazandiniz';
        failedPopup.style.backgroundColor = "green"
    }

}

function updateWrogLetter() {
    wrongLetter_el.innerHTML = `
        ${wrongLetters.length>0?'<h3>Hatali Elementler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach((item, index) => {
        const countWrongLetter = wrongLetters.length;
        
        if (index<countWrongLetter) {
            item.style.display = 'block';
        }else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        success_message.innerText = `Kaybettiniz.\nKelime : ${randomLetter}`;
        failedPopup.style.backgroundColor = "red"
    }
}

function displayAlreadyHave() {
    letterAlreadyHave.classList.add('show');

    setTimeout(() => {
        letterAlreadyHave.classList.remove('show');
    }, 2000);
}

// window'da hangi tuşa basıldıysa alan func
window.addEventListener("keydown", function (event) {
    if ((event.keyCode >= 65 && event.keyCode<= 90) || event.keyCode == 222) {
        const clikedLetter = event.key;
        

        if (randomLetter.includes(clikedLetter)) {
            if (!correctLetter.includes(clikedLetter)) {
                correctLetter.push(clikedLetter);
                displayWord();
            }else {
                displayAlreadyHave();
            }
        }
        else {
            if (!wrongLetters.includes(clikedLetter)) {
                wrongLetters.push(clikedLetter);
                updateWrogLetter();
            }else {
                displayAlreadyHave();
            }
        }
    }
})

playAgainBtn.addEventListener("click", function () {
    correctLetter.splice(0);
    wrongLetters.splice(0);
    
    randomLetter = getRandomWords();

    displayWord();
    updateWrogLetter();

    popup.style.display = 'none'
})

displayWord();