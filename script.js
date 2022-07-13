console.log("https://github.com/emoltz/connectFour");

const player1 = "Blue";
const player1Color = 'rgb(86,151,255)';

// const grey = 'rgb(229,229,229)';
const grey = getComputedStyle(document.documentElement).getPropertyValue('--emptyBlock');

const player2 = "Red";
const player2Color = 'rgb(237,45,73)';

let game_on = true;
let table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log(`You won starting at ${rowNum}, ${colNum}`);
}

function changeColor(rowIndex, colIndex, color) {
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
    // TODO: logic for winning. After each move, we'll call this function to check if there is a win
    //horizontal

    //vertical

    //diagonal
}

// JQUERY LOGIC
// Starting with Player1
let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$('h3').text(currentName + " player, it's your turn.");

$('.board button').on('click', function (){
    let col = $(this).closest('td').index();

    let bottomAvail = checkBottom(col);

    changeColor(bottomAvail, col, currentColor);

    if (winCheck() === true){
        $('h2').text(currentName + " wins!");
        $('.btn-lg').toggleClass('glow');
    }

    currentPlayer = currentPlayer * -1;
    console.log(currentPlayer);
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
});















