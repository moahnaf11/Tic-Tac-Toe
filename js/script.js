let formContainer = document.querySelector("#players");
let gameContainer = document.querySelector(".tictactoe-container");
let firstName = document.querySelector(".name1");
let secondName = document.querySelector(".name2");
let firstPoint = document.querySelector(".points1");
let secondPoint = document.querySelector(".points2");




formContainer.addEventListener("submit", forms);

function forms (e) {
    e.preventDefault();
    let firstPlayerPoints = 0;
    let secondPlayerPoints = 0;
    let player1Name = formContainer.querySelector("#player1name").value;
    let player2Name = formContainer.querySelector("#player2name").value;
    const player1 = new Player(player1Name, "X");
    const player2 = new Player(player2Name, "O");
    formContainer.style.display = "none";
    gameContainer.style.display = "flex";

    firstName.textContent = player1.name;
    secondName.textContent = player2.name; 
    firstPoint.textContent = `Points: ${firstPlayerPoints}`;
    secondPoint.textContent = `Points: ${secondPlayerPoints}`;
    
    let currentPlayerTurn = player1;
    let gameBoard = [
        [ "", "", ""],
        [ "", "", ""],
        [ "", "", ""]
    ];
    let currentDisplay1 = document.querySelector(".current1");
    let currentDisplay2 = document.querySelector(".current2");
    currentDisplay1.textContent = "Current Player";
    currentDisplay2.textContent = "Waiting..."

    let winner1 = document.querySelector(".winner1");
    let winner2 = document.querySelector(".winner2");

    let replayButton = document.querySelector(".replay");
    let buttonContainer1 = document.querySelector(".button-container1");

    firstName.style.display = "block";
    firstPoint.style.display = "block";
    winner1.style.display = "block";
    secondName.style.display = "block";
    secondPoint.style.display = "block";
    winner2.style.display = "block";
    currentDisplay1.style.display = "block";
    currentDisplay2.style.display = "block";


    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.addEventListener("click", boxClick)
    })
    function clearBox () {
        boxes.forEach(item => {
            item.textContent = "";
        })
    }


    function boxClick (e) {
        let targetClass = e.target.classList.value.split(" ")[0].split("-")[1];
        switch (targetClass) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
                if (e.target.textContent == "") {
                    e.target.textContent = currentPlayerTurn.marker;
                    if (targetClass < 3) {
                        gameBoard[0][targetClass] = currentPlayerTurn.marker;
                    }   else if (targetClass > 2 && targetClass < 6) {
                        if (targetClass == 3) {
                            gameBoard[1][0] = currentPlayerTurn.marker;
                        }   else if (targetClass == 4) {
                                gameBoard[1][1] = currentPlayerTurn.marker;
                        }   else {
                            gameBoard[1][2] = currentPlayerTurn.marker;
                        }
                    }   else {
                        if (targetClass == 6) {
                            gameBoard[2][0] = currentPlayerTurn.marker;
                        }   else if (targetClass == 7) {
                            gameBoard[2][1] = currentPlayerTurn.marker;
                        }   else {
                            gameBoard[2][2] = currentPlayerTurn.marker;
                        }
                    }
                    let isWin = (gameBoard[0][0] == currentPlayerTurn.marker && gameBoard[0][1] == currentPlayerTurn.marker
                        && gameBoard[0][2] == currentPlayerTurn.marker) || (gameBoard[1][0] == currentPlayerTurn.marker && gameBoard[1][1] == currentPlayerTurn.marker
                            && gameBoard[1][2] == currentPlayerTurn.marker) || (gameBoard[2][0] == currentPlayerTurn.marker && gameBoard[2][1] == currentPlayerTurn.marker
                                && gameBoard[2][2] == currentPlayerTurn.marker) || (gameBoard[0][0] == currentPlayerTurn.marker && gameBoard[1][1] == currentPlayerTurn.marker
                                    && gameBoard[2][2] == currentPlayerTurn.marker) || (gameBoard[0][2] == currentPlayerTurn.marker && gameBoard[1][1] == currentPlayerTurn.marker
                                        && gameBoard[2][0] == currentPlayerTurn.marker) || (gameBoard[0][0] == currentPlayerTurn.marker && gameBoard[1][0] == currentPlayerTurn.marker
                                            && gameBoard[2][0] == currentPlayerTurn.marker) || (gameBoard[0][1] == currentPlayerTurn.marker && gameBoard[1][1] == currentPlayerTurn.marker
                                                && gameBoard[2][1] == currentPlayerTurn.marker) || (gameBoard[0][2] == currentPlayerTurn.marker && gameBoard[1][2] == currentPlayerTurn.marker
                                                    && gameBoard[2][2] == currentPlayerTurn.marker);

                    if (isWin || gameBoard.flat().every(cell => cell !== "")
                     ) {
                        if (gameBoard.flat().every(cell => cell !== "") && (!isWin)) {
                            alert("Its a TIE!");
                        } 
                        buttonContainer1.style.display = "flex";
                        buttonContainer1.addEventListener("click", (e) => {
                            let target = e.target.classList.value;
                            switch (target) {
                                case "restart":
                                    firstPlayerPoints = 0;
                                    secondPlayerPoints = 0;
                                    firstPoint.textContent = `Points: ${firstPlayerPoints}`;
                                    secondPoint.textContent = `Points: ${secondPlayerPoints}`;
                                    gameContainer.style.display = "none";
                                    firstName.style.display = "none";
                                    firstPoint.style.display = "none";
                                    winner1.style.display = "none";
                                    secondName.style.display = "none";
                                    secondPoint.style.display = "none";
                                    winner2.style.display = "none";
                                    currentDisplay1.style.display = "none";
                                    currentDisplay2.style.display = "none";
                                    formContainer.style.display = "flex";
                                case "replay":
                                    gameBoard.forEach((row, rowIndex) => {
                                        row.forEach((item, colIndex) => {
                                            gameBoard[rowIndex][colIndex] = "";
                                        })
                                    })
                                    buttonContainer1.style.display = "none";
                                    clearBox();
                                    winner1.textContent = "";
                                    winner2.textContent = "";
                                    break;
                            }

                        })
                        if (isWin) {
                            if (currentPlayerTurn == player1) {
                                winner1.textContent = `${currentPlayerTurn.name} has won!`
                                firstPoint.textContent = `Points: ${++firstPlayerPoints}`;
                            }   else {
                                winner2.textContent = `${currentPlayerTurn.name} has won!`
                                secondPoint.textContent = `Points: ${++secondPlayerPoints}`;
                            }
                        }
                        
                     }  else {
                        if (currentPlayerTurn == player1) {
                            currentPlayerTurn = player2;
                            currentDisplay1.textContent = "Waiting...";
                            currentDisplay2.textContent = "Current Player";
                        }   else {
                            currentPlayerTurn = player1;
                            currentDisplay1.textContent = "Current Player";
                            currentDisplay2.textContent = "Waiting...";
                        }
                     }
                }
                

        } 
    }

}

function Player (name, marker) {
    this.name = name;
    this.marker = marker;

}









