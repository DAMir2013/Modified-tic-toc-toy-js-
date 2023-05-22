'use strict';
function createTitle() {
    const title = document.createElement('h1');
    title.innerHTML = 'Tic-Tac-Toy';
    title.classList.add('titleClass');
    title.style.margin = 'auto';
    document.getElementById('newTitle').appendChild(title);
}

function createButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Start Game';
    button.classList.add('buttonClass');
    button.style.margin = 'auto';
    document.getElementById('newButton').appendChild(button);
    let start = button.addEventListener("click", startGameLoop, { once: true });
}

function createField() {
    const field = document.createElement('div');
    field.classList.add('fieldClass');
    field.setAttribute('id', 'field1');
    document.getElementById('conteiner').appendChild(field); 
    fillFieldStartGame();
}

function fillFieldStartGame() {
    const countRow = 3;
    const countCol = 3;
    let counter = 0;
    for(let col = 0; col < countRow; col++) {
        for(let row = 0; row < countCol; row++) {
            createCell(counter);
            counter++;
        }
    }
}

function createCell(index) {
    const cell = document.createElement('div');
    cell.setAttribute('id', `f${index}`);
    cell.classList.add('cellClass');
    document.getElementById('field1').appendChild(cell);
    createCanvas(index, cell);
}

function createCanvas(index, divCell) {
    const canvasFrame = document.createElement('canvas');
    canvasFrame.setAttribute('id', `c${index}`);
    canvasFrame.width = '150';
    canvasFrame.height = '150';
    divCell.appendChild(canvasFrame);
    
}

function createUI() {
    createTitle();
    createButton();
    createField();
}

createUI();

function startGameLoop() {
    let state = 'ONGOING';
    let xToMove = true;
    function myLoop() {        
        setTimeout(function() {   
            if(xToMove) {
                makeMove(true);
            } else {
                makeMove(false);
            }  
            xToMove = !xToMove;
            state = checkWin();                
            while(state == 'ONGOING') { 
            myLoop();
            break;             
          }                       
        }, 3000)
      }
      myLoop();     
}

function makeMove(whosTurn) {
    let index = getRandomEmptyCellIndex();

    if(whosTurn == true) {
        makeMoveX(index);
    } else {
        makeMoveO(index);
    }
}

function getRandomEmptyCellIndex() {
    let index;
    let condition = true;
    while(condition) {
        index = Math.floor(Math.random() * (9 - 0) + 0);
        if(isCellEmpty(index)) {
            condition = false;
        }
    }
    return index;
}

function isCellEmpty(index) {
    console.log(index);
    console.log(document.querySelector(`#f${index}`).className);
    const checkCell = document.querySelector(`#f${index}`).className
    if(checkCell === "cellClass") {
        return true;
    }
}

function makeMoveX(serialNumX) {
        const canvas = document.getElementById(`c${serialNumX}`);
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 150);
        ctx.stroke();
        ctx.moveTo(0, 150);
        ctx.lineTo(150, 0);
        ctx.stroke();
        document.querySelector(`#f${serialNumX}`).classList.add("X");
    }
    
    function makeMoveO(serialNumO) {
        const canvas = document.getElementById(`c${serialNumO}`);
        const ctx = canvas.getContext('2d');
        const pi = Math.PI;
        ctx.beginPath();
        ctx.lineWidth = '10';
        ctx.strokeStyle = 'yellow';
        ctx.arc(75, 75, 65, 2*pi, false);
        ctx.stroke();
        document.querySelector(`#f${serialNumO}`).classList.add("O");                
    }



function checkWin() {
        let arrAll = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for(let i = 0; i < arrAll.length; i++) {
            let counterX = 0;
            let counterO = 0;    
            for(let j = 0; j < arrAll[i].length; j++) {
                if(document.querySelector(`#f${arrAll[i][j]}`).className == 'cellClass X') {
                    counterX++;  
                }
                if(document.querySelector(`#f${arrAll[i][j]}`).className == 'cellClass O') {
                    counterO++;  
                }
                if(counterX == 3) {
                    alert("Winner Player 'X");
                    return 'Won X';
                }
                if(counterO == 3) {
                    alert("Winner Player 'O");
                    return 'Won O';
                }
            }
        }
        let occupiedСell = 0;
        for(let i = 0; i < 9; i++) {
            if(document.querySelector(`#f${i}`).className == 'cellClass X' || 
            document.querySelector(`#f${i}`).className == 'cellClass O') {
                occupiedСell++;
            }
        }
        if(occupiedСell == 9) {
            alert("No Win - draw");
            return 'Drow';
        } 
        return 'ONGOING';
    }


































































































































































































