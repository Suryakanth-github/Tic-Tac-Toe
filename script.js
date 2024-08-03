let boxes = document.querySelectorAll('.box');
let playAgainBtn = document.getElementById('play_again');
let mainGrid = document.querySelector('.main_grid');
let results = document.getElementById('results');


let turn = 'O';
let isGameOver = false;

boxes.forEach((box) => {
    box.innerHTML = '';
    box.addEventListener('click', () => {
        if (!isGameOver && box.innerHTML === '') {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

const changeTurn = () => {
    if (turn === 'O') {
        turn = 'X';
        document.querySelector('.bg').style.left = '85px';
    } else {
        turn = 'O';
        document.querySelector('.bg').style.left = '0';
    }
};

const checkWin = () => {
    let winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        let v0 = boxes[winningConditions[i][0]].innerHTML;
        let v1 = boxes[winningConditions[i][1]].innerHTML;
        let v2 = boxes[winningConditions[i][2]].innerHTML;

        if (v0 != '' && v0 === v1 && v0 === v2) {
            isGameOver = true;
            results.innerHTML = `"${turn}"` + ' wins';
            playAgainBtn.style.display = 'inline';

            for (let j = 0; j < 3; j++) {
                boxes[winningConditions[i][j]].style.backgroundColor = '#FFC55A';
                boxes[winningConditions[i][j]].style.color = '#000';
            }

        }
    }
};

const checkDraw = () => {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach((box) => {
            if (box.innerHTML === '') isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            results.innerHTML = 'It\'s a Draw';
            playAgainBtn.style.display = 'inline';
            mainGrid.style.backgroundColor = 'gray';
        }
    }
};

playAgainBtn.addEventListener('click', () => {
    isGameOver = false;
    turn = 'O';

    document.querySelector('.bg').style.left = '0';
    results.innerHTML = '';
    playAgainBtn.style.display = 'none';

    boxes.forEach((box) => {
        box.innerHTML = '';
        box.style.removeProperty('background-color');
        box.style.color = '#5e3023';
        mainGrid.style.backgroundColor = '';
    });
});
