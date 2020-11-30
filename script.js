let startGame = false;
const start__button = document.querySelector(".js-start__button");
const restart__button = document.querySelector(".js-restart__button");
const no = new Audio("no.wav");
const loss = new Audio("przegrana.wav");
const win = new Audio("wygrana.mp3");
let timesArray = [];
const endGameWindow = document.querySelector(".game__end");

if (window.matchMedia("(max-device-width: 960px)").matches) {
  const container = document.querySelector(".container");
  let input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.className = "hidden";
  container.appendChild(input);
  document.addEventListener("input", function () {
    if (startGame) {
      let ascii = document.querySelector(".letter__container").innerHTML;
      let inputLetter = document.querySelector(".hidden").value;
      inputLetter = inputLetter.toUpperCase();
      let good = parseInt(document.querySelector(".good").innerHTML);
      let bad = parseInt(document.querySelector(".bad").innerHTML);
      if (ascii === inputLetter) {
        good += 1;
        let height = good * 5;
        document.querySelector(".good").innerHTML = good;
        document.querySelector(".grow-green").style.height = height + "%";
        document.querySelector(".hidden").value = "";
        if (good > 19) {
          let time = document.querySelector(".timer").innerHTML;
          const savedTime = getLocalStorageData();
          if (savedTime === 0 || savedTime > time) {
            setLocalStorageData(time);
            document.querySelector(".game__endRecord").innerHTML =
              "Nowy rekord!";
          }
          endGameWindow.classList.add("game__end--win");
          endGameWindow.classList.remove("game__end--hidden");
          document.querySelector(
            ".game__endDescription"
          ).innerHTML = `Brawo! Odpowiedziałeś poprawnie w: ${time} sec.`;
          document.querySelector(
            ".game__theBestTime"
          ).innerHTML = `Poprzedni Twój najlepszy czas: ${savedTime} sec.`;
          clearInterval(odliczanie);
          win.play();
          startGame = false;
        }
        losuj_litere();
      } else {
        no.play();
        bad += 1;
        document.querySelector(".hidden").value = "";
        let height = bad * 20;
        document.querySelector(".bad").innerHTML = bad;
        document.querySelector(".grow-red").style.height = height + "%";
        if (bad > 4) {
          endGameWindow.classList.add("game__end--loss");
          endGameWindow.classList.remove("game__end--hidden");
          document.querySelector(
            ".game__endDescription"
          ).innerHTML = `Popełniłeś 5 błędów. Koniec gry.`;
          document.querySelector(".game__theBestTime").innerHTML = "";
          document.querySelector(".game__endRecord").innerHTML = "";
          clearInterval(odliczanie);
          loss.play();
          startGame = false;
        }
      }
    }
  });
} else {
  document.addEventListener("keypress", function (e) {
    if (startGame) {
      let clickLetter = e.key.charCodeAt(0);
      let clickLetterUpper = clickLetter - 32;
      let ascii = document.querySelector(".letter__container").innerHTML;
      ascii = ascii.charCodeAt(0);
      let good = parseInt(document.querySelector(".good").innerHTML);
      let bad = parseInt(document.querySelector(".bad").innerHTML);
      if (ascii === clickLetterUpper) {
        good += 1;
        let height = good * 5;
        document.querySelector(".good").innerHTML = good;
        document.querySelector(".grow-green").style.height = height + "%";

        if (good > 19) {
          let time = parseInt(document.querySelector(".timer").innerHTML);
          const savedTime = getLocalStorageData();
          if (savedTime === 0 || savedTime > time) {
            document.querySelector(".game__endRecord").innerHTML =
              "Nowy rekord!";
            setLocalStorageData(time);
          }
          endGameWindow.classList.add("game__end--win");
          endGameWindow.classList.remove("game__end--hidden");
          document.querySelector(
            ".game__endDescription"
          ).innerHTML = `Brawo! Odpowiedziałeś poprawnie w: ${time} sec.`;
          document.querySelector(
            ".game__theBestTime"
          ).innerHTML = `Poprzedni Twój najlepszy czas: ${savedTime} sec.`;

          clearInterval(odliczanie);
          win.play();
          startGame = false;
        }
        losuj_litere();
      } else {
        no.play();
        bad += 1;
        let height = bad * 20;
        document.querySelector(".bad").innerHTML = bad;
        document.querySelector(".grow-red").style.height = height + "%";
        if (bad > 4) {
          endGameWindow.classList.add("game__end--loss");
          endGameWindow.classList.remove("game__end--hidden");
          document.querySelector(
            ".game__endDescription"
          ).innerHTML = `Popełniłeś 5 błędów. Koniec gry.`;
          document.querySelector(".game__endRecord").innerHTML = "";
          document.querySelector(".game__theBestTime").innerHTML = "";
          clearInterval(odliczanie);
          loss.play();
          startGame = false;
        }
      }
    }
  });
}

const setLocalStorageData = (time) => {
  const number = parseInt(time);
  localStorage.setItem("theBestTime", number);
};
const getLocalStorageData = () => {
  return localStorage ? +localStorage.getItem("theBestTime") : "";
};

function timer() {
  let timer = document.querySelector(".timer");
  let seconds = parseInt(timer.innerHTML);
  seconds += 1;
  timer.innerHTML = seconds + " sec.";
}

function losuj_litere() {
  let ascii = 65 + Math.floor(Math.random() * 25);
  let letter = String.fromCharCode(ascii);
  document.querySelector(".letter__container").innerHTML = letter;
}
function beginning() {
  document.querySelector(".timer").innerHTML = "0 sec.";
  document.querySelector(".letter__container").innerHTML = "";
  document.querySelector(".good").innerHTML = "0";
  document.querySelector(".bad").innerHTML = "0";
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
  if (window.matchMedia("(max-device-width: 960px)").matches) {
    document.querySelector(".hidden").focus();
  }
});
restart__button.addEventListener("click", function () {
  startGame = false;
  clearInterval(odliczanie);
  beginning();
});
document
  .querySelector(".game__endButton")
  .addEventListener("click", function () {
    document.querySelector(".game__end").classList.add("game__end--hidden");
    endGameWindow.classList.remove("game__end--win", "game__end--loss");
    startGame = false;
    beginning();
  });
