const container = document.querySelector('#container')

let input = prompt('how many rows?');
let rowNum = input * input

function makeRows (rowNum) {
    for (i = 0; i < rowNum; i++){
        let rows = document.createElement('div');
        container.appendChild(rows);
    };
};

makeRows(rowNum);