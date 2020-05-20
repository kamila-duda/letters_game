let startGame = false;
const start__button = document.querySelector(".js-start__button");
const restart__button = document.querySelector(".js-restart__button");
const no = new Audio("no.wav");
const loss = new Audio("przegrana.wav");
const win = new Audio("wygrana.mp3");
const hidden = document.getElementById("hidden");
hidden.style.visibility="hidden";


document.addEventListener('keypress', function (e) {
    if (startGame == true) {
        let clickLetter = e.key.charCodeAt(0);
        let clickLetterUpper = clickLetter - 32;
        let ascii = document.getElementById("litera").innerHTML;
        ascii = ascii.charCodeAt(0);
        let good = parseInt(document.getElementById("good").innerHTML);
        let bad = parseInt(document.getElementById("bad").innerHTML);
        if (ascii == clickLetterUpper) {
            good += 1;
            let height = good * 5;
            document.getElementById("good").innerHTML = good;
            document.querySelector(".grow-green").style.height = height + "%";

            if (good > 19) {
                let time = document.getElementById("timer").innerHTML;
                document.querySelector(".game__end--win").style.display = "unset";
                document.querySelector(".game__time").innerHTML = time;
                clearInterval(odliczanie);
                win.play();
                startGame = false;
            }
        } else {
            no.play();
            bad += 1;
            let height = bad * 20;
            document.getElementById("bad").innerHTML = bad;
            document.querySelector(".grow-red").style.height = height + "%";
            if (bad > 4) {
                document.querySelector(".game__end--loss").style.display = "unset";
                clearInterval(odliczanie);
                loss.play();
                startGame = false;
            }
        }
        losuj_litere();
    }
});

function timer() {
    let timer = document.getElementById("timer");
    let seconds = parseInt(timer.innerHTML);
    seconds += 1;
    timer.innerHTML = seconds + ' sec.';
};

function losuj_litere() {
    let ascii = 65 + Math.floor(Math.random() * 25);
    let letter = String.fromCharCode(ascii);
    document.getElementById("litera").innerHTML = letter;

};
function beginning() {
    document.getElementById("timer").innerHTML = "0 sec."
    document.getElementById("litera").innerHTML = "";
    document.getElementById("good").innerHTML = "0";
    document.getElementById("bad").innerHTML = "0";
    document.querySelector(".grow-green").style.height = "0%";
    document.querySelector(".grow-red").style.height = "0%";
    start__button.style.display = "unset";
    restart__button.style.display = "none";
}
let odliczanie = 0;


start__button.addEventListener("click", function () {
    startGame = true;
    odliczanie = setInterval(timer, 1000);
    losuj_litere();
    start__button.style.display = "none";
    restart__button.style.display = "unset";
    hidden.focus();
    hidden.click();
    
});
restart__button.addEventListener("click", function () {
    startGame = false;
    clearInterval(odliczanie);

    beginning();
});
document.getElementById("lossClose").addEventListener("click", function () {
    const loss = document.querySelector(".game__end--loss").style.display = "none";
    startGame = false;
    beginning();
});
document.getElementById("winClose").addEventListener("click", function () {
    const win = document.querySelector(".game__end--win").style.display = "none";
    startGame = false;
    beginning();
});
/*if(window.matchMedia('(max-device-width: 960px)').matches){
   // start__button.focus();
   alert("ok");
   
};*/


