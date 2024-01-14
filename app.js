const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // playerX, playerY
let draw = false;

const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetGame = () => {
    if ([...boxes].some((box) => box.innerText !== "")) {
        turnO = true;
        draw = false;
        enabledBoxes();
        let applyVal = document.querySelector("#msg");
        applyVal.innerHTML = "Play Again";
        applyVal.style.color = "white";
        setTimeout(() => {
            applyVal.innerHTML = "";
        }, 2000);
    }
};

const checkDraw = () => {
    if (![...boxes].some((box) => box.innerText === "")) {
        draw = true;
        let applyText = document.querySelector("#msg");
        applyText.innerHTML = "The Match is drawn";
        disabledBoxes();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerHTML = "O";
            turnO = false;
            box.disabled = true;
        } else {
            box.innerHTML = "X";
            turnO = true;
            box.disabled = true;
        }
        checkWinner();
        checkDraw();
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {
                let applyText = document.querySelector("#msg");
                applyText.style.transition = "all 3s ease-in-out"
                applyText.innerHTML = `Winner is Player ${position1}`;
                disabledBoxes();
                draw = false; 
            }
        }
    }
};

newGameBtn.addEventListener("click", () => {
    resetGame();
    let applyText = document.querySelector("#msg");
    applyText.innerHTML = "";
});

resetBtn.addEventListener("click", () => {
    resetGame();
});
