console.log("https://github.com/emoltz/connectFour");
let gameOver = false;
const player1 = "Blue";
const player1Color = 'rgb(86,151,255)';

// const grey = 'rgb(229,229,229)';
const grey = 'rgb(229, 229, 229)';

const player2 = "Red";
const player2Color = 'rgb(237,45,73)';

let table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log(`You won starting at ${rowNum}, ${colNum}`);
}

function changeColor(rowIndex, colIndex, color) {
    console.log("color changed");
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
    //needed?
    let colorReport = "";
    for (let row = 5; row >= 0; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === grey) {
            return row;
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== grey && one !== undefined);
}

function winCheck() {
    //horizontal
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
                console.log('horiz');
                reportWin(row,col);
                return true;
            }
        }
    }
    //vertical
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
                console.log('vertical');
                reportWin(row,col);
                return true;
            }
        }
    }
    //diagonal
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
                console.log('diag');
                reportWin(row,col);
                return true;
            }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
                console.log('diag');
                reportWin(row,col);
                return true;
            }
        }
    }
    return false;
}

// JQUERY LOGIC
// Starting with Player1
let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

let lastPiece = null;
class lastChangedPiece{
    _undone;
    constructor(bottomAvail, col, currentColor) {
        this._bottomAvail = bottomAvail;
        this._col = col;
        this._currentColor = currentColor;
        this._undone = false;
    }

    undoColor(){
        if (this._currentColor !== grey){
            changeColor(this._bottomAvail, this._col, grey);
        }
        this._undone = true;
    }
}

function switchPlayer(){
    currentPlayer = currentPlayer * -1;
    if(currentPlayer === 1){
        console.log(player1);
        currentName = player1; //blue
        $('h3').text(currentName + " player, it's your turn.").removeClass('text-danger').addClass('text-primary');
        currentColor = player1Color;
    }
    else{
        console.log(player2);
        currentName = player2;
        $('h3').text(currentName + " player, it's your turn.").removeClass('text-primary').addClass('text-danger');

        currentColor = player2Color;
    }
}

$('.board button').on('click', function (){
    let col = $(this).closest('td').index();

    let bottomAvail = checkBottom(col);
    if(!gameOver){
        lastPiece = new lastChangedPiece(bottomAvail, col, currentColor);
        changeColor(bottomAvail, col, currentColor);
    }


    if (winCheck() === true){
        $('h3').text(currentName + " wins!");
        $('.btn-lg').toggleClass('glow');
        // $('h3').text("");
        gameOver = true;
    }

    if(!gameOver){

        switchPlayer();
    }
});

$('#undo').on('click',function(){
    lastPiece.undoColor();
    if(lastPiece._undone){
        switchPlayer();
    }

})
$('#playAgain').on('click',function (){
    console.log("play again clicked");
    $('.btn-lg').removeClass('glow');
    gameOver = false;
    $('h2').text("A Game of Extreme Skill");
    $('h3').text("Game Start");
    //change all buttons  back to grey
    for(let i = 0; i <= 5; i++){
        for(let j = 0; j <=6; j++){
            changeColor(i,j,grey);
        }
    }
});














