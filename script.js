const container = document.querySelector('#container');
let buttonResize = document.querySelector('#resize');
let buttonClear = document.querySelector('#clear');
let buttonPixel = document.querySelector('#pixel');
let buttonSketchpad = document.querySelector('#sketchpad');
let buttonRed = document.querySelector('#red');
let buttonEraser = document.querySelector('#eraser')
let mouseDown = false;
let mouseClick = false;
let currentColor;

function chooseSize() {
    let sideLength = prompt('Choose your side length, no more than 100');
    if ((sideLength > 100) || (sideLength <= 0)) {
        alert('Invalid Value, try again');
        chooseSize();
    } else {
        makeGrid(sideLength);
    };
};

function makeGrid(sideLength) {
    let totalSquares = sideLength * sideLength;
    let side = 760/sideLength;
    for(i = 1; i <= totalSquares; i++) {
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

function pixelStart(event) {
    mouseDown = true;
    event.target.style.backgroundColor = currentColor;
};

function pixelMove(event) {
    if (mouseDown) {
        event.target.style.backgroundColor = currentColor;
    };
};

function pixelEnd() {
    mouseDown = false;
};

function addListenerPixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mousedown', pixelStart);
        item.addEventListener('mousemove', pixelMove);
        item.addEventListener('mouseup', pixelEnd);
    });
    document.addEventListener('mouseup', pixelEnd);
};

function removeListenerPixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('mousedown', pixelStart);
        item.removeEventListener('mousemove', pixelMove);
        item.removeEventListener('mouseup', pixelEnd);
    });
    document.removeEventListener('mouseup', pixelEnd);
};

function sketchpadStart(event) {
    mouseClick = true;
    event.target.style.backgroundColor = currentColor;
    console.log('start')
};

function sketchpadMove(event) {
    if (mouseClick) {
    event.target.style.backgroundColor = currentColor;
    console.log('move')
    };
}

function sketchpadEnd(event) {
    mouseClick = false;
    event.removeEventListener('mouseenter', sketchpadMove);
    console.log('end')
};


function addListenerSketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', sketchpadStart);
        item.addEventListener('mouseenter', sketchpadMove);
        if (mouseClick == true) {
            item.removeEventListener('click', sketchpadEnd); 
        }
        //item.addEventListener('click', sketchpadEnd);
    });
};

function removeListenerSketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('click', sketchpadStart);
        item.removeEventListener('mouseenter', sketchpadMove);
        if (mouseClick == true) {
            item.removeEventListener('click', sketchpadEnd); 
        }
        //item.removeEventListener('click', sketchpadEnd);
    });
};

function clearGrid() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

switch(currentColor) {
    case 'eraser':
        currentColor= 'white';
        break;
    case 'red':
        currentColor = 'red';
        break;
    case 'rainbow':
        currentColor = 'rainbow';
        break;
    default:
        currentColor = 'black';
};

//test
buttonRed.addEventListener('click', () => {
    currentColor = 'red';
});

//eraser button
buttonEraser.addEventListener('click', () => {
    currentColor = 'white';
    removeListenerSketchpad();
    removeListenerPixel();
    addListenerPixel();
});

//resize button
buttonResize.addEventListener('click', () => {
    clearGrid();
    chooseSize();
});

//clear button
buttonClear.addEventListener('click', () =>{
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = 'white';
    });
});

//pixel button
buttonPixel.addEventListener('click', () => {
    currentColor = 'black';
    removeListenerSketchpad();
    addListenerPixel();
});

//sketchpad button
buttonSketchpad.addEventListener('click', () => {
    currentColor = 'black';
    removeListenerPixel();
    addListenerSketchpad();
});

makeGrid(16);