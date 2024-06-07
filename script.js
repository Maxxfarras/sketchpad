const container = document.querySelector('#container')

let rowNum = prompt('how many rows?');

function makeRows (rowNum) {
    for (i = 0; i < rowNum; i++){
        let rows = document.createElement('div');
        container.appendChild(rows);
    };
};

makeRows(rowNum);