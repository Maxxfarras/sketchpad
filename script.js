const container = document.querySelector('#container');

function chooseSize() {
    let sideLength = prompt('Choose your side length, no more than 100');
    if ((sideLength > 100) || (sideLength <= 0)) {
        alert('Invalid Value, try again');
        chooseSize();
    } else {
        makeGrid(sideLength)
    };
}

function makeGrid(sideLength) {
    let totalSquares = sideLength * sideLength;
    let side = 960/sideLength;
    for (i = 1; i <= totalSquares; i++) {
        let div = document.createElement('div');
        div.classList.toggle('grid-item');
        div.style.cssText = `
        width: ${side}px;
        height: ${side}px;
        border: 1px solid black;
        box-sizing: border-box;
        `;
        container.appendChild(div);   
    };
};

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

let buttonResize = document.querySelector('#resize');
buttonResize.addEventListener('click', () => {
    clearGrid();
    chooseSize();
});

let buttonClear = document.querySelector('#clear');
buttonClear.addEventListener('click', () =>{
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(Item => {
        item.style.backgroundColor = 'white';
    })
})


function paintBlue() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', () =>{
            item.style.backgroundColor = 'blue';
        });
    });
};

chooseSize();
paintBlue();