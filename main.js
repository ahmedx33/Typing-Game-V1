import "./style.css";
const button = document.getElementById("btn");
const input = document.getElementById("typingArea");
let time = document.querySelector(".bigBoss .info span .time");

let difficulties = {
  Easy: [
    "Ahmed",
    "Ziad",
    "Hello",
    "Hello",
    "Code",
    "Town",
    "Scala",
    "Scala",
    "Funny",
    "Roles",
    "Test",
    "Test",
    "Rust",
    "During",
    "During",
    "Along",
    "Again",
    "Egypt",
    "KSA",
  ],
  Normal: [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Coding",
    "Styling",
    "Cascade",
    "Runner",
    "Playing",
    "Working",
  ],
  Hard: [
    "Programming",
    "Javascript",
    "Destructuring",
    "Paradigm",
    "Documentation",
    "Configuration",
    "Dependencies",
    "Copyrightable",
    "bibliophile",
    "mellifluous",
    "mellifluous",
    "ephemeral",
    "Circumnavigate",
    "Deconstruction",
    "Insurmountable",
  ],
};

const chooseDifficult = [
  {
    title: "Easy",
    seconds: 5,
  },
  {
    title: "Normal",
    seconds: 3,
  },
  {
    title: "Hard",
    seconds: 2,
  },
];

function showDifficulty() {
  for (const diff of chooseDifficult) {
    const select = document.querySelector(".bigBoss .details select");
    const defaultDifficulty = document.querySelector(".bigBoss .details p");
    const content = `
            <option selected value="${diff.title}">${diff.title}</option>;
        `;
    select.innerHTML += content;
    document.querySelector(
      ".bigBoss .info span .time"
    ).innerHTML = `${diff.seconds}`;
    defaultDifficulty.innerHTML = `You Are Playing On <span>[${diff.title}]</span> Level & You Have <span>${diff.seconds}</span> Seconds To Type The Word`;
  }
}

function changeDifficulty() {
  const select = document.querySelector(".bigBoss .details select");
  select.addEventListener("change", () => {
    for (const opt of select) {
      const p = document.querySelector(".bigBoss .details p");
      for (const diff of chooseDifficult) {
        if (opt.selected) {
          if (opt.value === diff.title) {
            const content = `
            You Are Playing On <span>[${diff.title}]</span> Level & You Have <span>[${diff.seconds}]</span> Seconds To Type The Word
          `;
            incrementTime();
            p.innerHTML = content;
            return;
          }
        }
      }
    }
  });
}

button.addEventListener("click", (e) => {
  initGame(e);
  startGame();
  fillWords();
});

addEventListener("DOMContentLoaded", () => {
  showDifficulty();
  changeDifficulty();
  input.focus();
});

function initGame(e) {
  const select = document.querySelector(".bigBoss .details select");
  select.style.display = "none";
  e.target.style.display = "none";
  document.querySelector(".bigBoss .word").style.display = "block";
}

if (localStorage.getItem("score") !== null) {
  let score = localStorage.getItem("score");

  document.querySelector(".bigBoss .info .score").innerHTML = score;
}

function startGame() {
  let newWords = [];
  input.focus();
  let mainTime = setInterval(() => {
    --time.innerHTML;
    const select = document.querySelector(".bigBoss .details select");
    for (const word in difficulties) {
      const words = document.querySelector(".bigBoss .words");
      const wordArea = document.querySelector(".bigBoss .word");
      const score = document.querySelector(".bigBoss .info .score");
      newWords = difficulties[word];
      const randomNumber = Math.floor(Math.random() * newWords.length);
      const randomWord = newWords[randomNumber];
      for (const opt of select) {
        if (opt.selected) {
          if (opt.value === word) {
            words.innerHTML = "";
            newWords.forEach((e) => {
              const content = `<div class="text">${e}</div>`;
              words.innerHTML += content;
              if (
                input.value.toLowerCase() ===
                  wordArea.innerHTML.trim().toLowerCase() &&
                input.value !== ""
              ) {
                input.value = "";
                wordArea.innerHTML = randomWord;
                score.innerHTML++;
                localStorage.setItem("score", score.innerHTML);
                incrementTime();
              }

              if (time.innerHTML <= "0") {
                clearInterval(mainTime);
                document.querySelector(".bigBoss .words").style.display =
                  "none";
                document.querySelector(".bigBoss .over").classList.add("show");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
          }
        }
      }
      if (words.innerHTML === "") {
        clearInterval(mainTime);
        input.value = "";
        score.innerHTML++;
        localStorage.setItem("score", score.innerHTML);
        words.innerHTML = "Winner Winner Chicken Dinner";
        words.style.cssText =
          "color: #009688; font-size: 50px; font-weight: 600;";
        wordArea.innerHTML = "Done!";
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }
  }, 1000);
}

function incrementTime() {
  for (const diff of chooseDifficult) {
    const select = document.querySelectorAll(".bigBoss .details select option");

    for (const opt of select) {
      if (opt.selected) {
        if (opt.value === diff.title) {
          time.innerHTML = diff.seconds;
        }
      }
    }
  }
}

function fillWords() {
  for (const word in difficulties) {
    const words = document.querySelector(".bigBoss .words");
    const select = document.querySelector(".bigBoss .details select");
    const wordArea = document.querySelector(".bigBoss .word");
    let newWords = difficulties[word];

    for (const opt of select) {
      if (opt.selected) {
        if (opt.value === word) {
          wordArea.innerHTML = "";
          words.innerHTML = "";
          newWords.forEach((e, index, arr) => {
            const content = `<div class="text">${e}</div>`;
            words.innerHTML += content;
            input.addEventListener("input", () => {
              if (input.value.toLowerCase() === arr[index].toLowerCase()) {
                arr.splice(index, 1);
                console.log(arr[index]);
              }
            });

            wordArea.innerHTML = e;
          });
          input.value = "";
        }
      }
    }
  }
}
