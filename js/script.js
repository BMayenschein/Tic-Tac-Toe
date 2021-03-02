/*Rule of thumb: 
if you only ever need ONE of something (gameBoard, displayController), use a module. 
If you need multiples of something (players!), create them with factories.*/
const playerFactory = (name, sign) => {
    return {name, sign};
 };

 let winConditions =
    [ 
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
 
function checkIfWinner(player, board){
    
    let anySuccess = false;
    winConditions.forEach(cond => {
        let isAllTrue = true;
        for (let i = 0; i < cond.length; i++){
            let index = cond[i];
            isAllTrue = isAllTrue && board[index] == player.sign;
        }

        if (isAllTrue) {
            anySuccess = true;
        }

    });

    return anySuccess;
}


const game = (() => {
    
    let board = ['','','','','','','','',''];
    let player1 = playerFactory('Player1', 'X');
    let player2 = playerFactory('Player2', 'O');

    let turn = 1;

    let _updateBoard = (e) => {
        let spot = e.target.id;
        if (board[spot] == '') {
            let sign = turn === 1 ? player1.sign : player2.sign;
            board[spot] = sign;
            e.target.innerHTML = sign;

            //Check if we have a winner
            let currentPlayer = turn === 1 ? player1 : player2;
            if (checkIfWinner(currentPlayer, board)) {
                console.log(`${currentPlayer.name} Wins`);
                spacesArray.forEach(space => {
                    space.removeEventListener('click', _updateBoard);
                })
                _resetBoard();
            }
            
            //Its the other players turn
            turn = turn === 1 ? 2 : 1;
        }
        else {
            console.log('Spot already taken')
        }

        
    }

    let _resetBoard = () => {
        board = ['','','','','','','','',''];
        spacesArray.forEach(space => {
            space.innerHTML = '-';
            console.log(space);
        });
        game();
    }



    let spacesArray = Array.from(document.getElementsByClassName("box"));
    spacesArray.forEach(space => {
        space.addEventListener('click', _updateBoard);
        console.log(space);
    });


    return {board};
})();
