const player1 = "Blue";
const player1Color = 'rgb(86,151,255)';

// const grey = 'rgb(229,229,229)';
const grey = getComputedStyle(document.documentElement).getPropertyValue('--emptyBlock');

const player2 = "Red";
const player2Color = 'rgb(237,45,73)';

let game_on = true;
let table = $('table tr');

function reportWin(rowNum, colNum){
    console.log(`You won starting at ${rowNum}, ${colNum}`);
}

function changeColor(rowIndex, colIndex, color){
    if (color===player1Color){
        console.log(`${player1} played`);
    }
    else{
        console.log(`${player2} played`);
    }
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    let colorReport;
    for (let row = 5; row >= 0; row--){
        colorReport = returnColor(row, colIndex);
        if(colorReport === grey){
            return row;
        }
    }
}

console.log(grey);
function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== grey && one !== undefined);
}

