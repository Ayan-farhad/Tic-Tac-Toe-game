const gamebox = document.querySelectorAll(".box");
const player1 = document.querySelector(".Player-1");
const player2 = document.querySelector(".Player-2");
const restartBtn = document.querySelector(".restart");
const alertBox = document.querySelector(".alertBox");


let currPlayer = "O";
let nextPlayer = "X";
let playerTurn = currPlayer;
let gameActive = true;

function gameStart() {
    gamebox.forEach(box => {
        box.addEventListener("click", handleBoxClick);
    })
}

//Function for handleclick
function handleBoxClick(e) {
    if (gameActive && e.target.textContent == '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            alertMsg(`${playerTurn} is a winner!`)
            gameActive = false;
            disableClick();
        } else if (checkDraw()) {
            alertMsg(`It's a Draw!`)
            gameActive = false;
            disableClick()
        } else {
            changePlayer();
        }
    }
}

//Function for Change player turn
function changePlayer() {
    if (playerTurn === currPlayer) {
        playerTurn = nextPlayer;
    } else {
        playerTurn = currPlayer;
    }
}

//Function for check who is winner
function checkWin() {
    const wincheck = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < wincheck.length; i++) {
        const [post1, post2, post3] = wincheck[i];

        if (gamebox[post1].textContent !== '' &&
            gamebox[post1].textContent === gamebox[post2].textContent
            && gamebox[post2].textContent === gamebox[post3].textContent){
                return true; 
            }
    }
    return false;
}

//Function for check match is draw 
function checkDraw() {
    let emptybox = 0;
    gamebox.forEach(box => {
        if (box.textContent === '') {
            emptybox++;
        }
    });

    return emptybox === 0;
}

//Function for disabled on win or draw
function disableClick() {
    gamebox.forEach(box => {
        box.removeEventListener("click", handleBoxClick);
        box.classList.add("disabled");
    });
}

//Functtion for Alert 
function alertMsg(msg){
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(()=>{
        alertBox.style.display = "none";
    },4000)
} 

//addeventlistner for restart the game 
restartBtn.addEventListener("click", restartgame =>{
    gamebox.forEach(box =>{
        box.textContent = "";
        box.classList.remove("disabled");
    })
})

gameStart();