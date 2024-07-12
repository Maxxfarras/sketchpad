const container = document.querySelector('#container');
let buttonResize = document.querySelector('#resize');
let buttonClear = document.querySelector('#clear');
let buttonPixel = document.querySelector('#pixel');
let buttonSketchpad = document.querySelector('#sketchpad');
let buttonEraser = document.querySelector('#eraser');
let buttonsColor = document.querySelectorAll('.color-button');
let buttonsAll = document.querySelectorAll('button');
let popup = document.querySelector('#popup');
let mouseDown = false;
let mouseClick = false;
let currentColor;

function chooseSize() {
    let sideLength = prompt('Choose your side length, no more than 100');
    if ((sideLength > 100) || (sideLength <= 1)) {
        alert('Invalid Value, try again');
        chooseSize();
    } else {
        makeGrid(sideLength);
    };
};

function makeGrid(sideLength) {
    let totalSquares = sideLength * sideLength;
    let side = 600/sideLength;
    for(i = 1; i <= totalSquares; i++) {
        let div = document.createElement('div');
        div.classList.toggle('grid-item');
        div.style.cssText = `
        width: ${side}px;
        height: ${side}px;
        border: 1px solid rgb(200, 200, 200);
        box-sizing: border-box;
        background-color: white;
        `;
        container.appendChild(div);   
    };
};

//delete all cells
function clearGrid() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

function pixelStart(event) {
    mouseDown = true;
    if (currentColor === 'rainbow') {
        event.target.style.backgroundColor = randomColor();
    } else {
        event.target.style.backgroundColor = currentColor;
    };
};

function pixelMove(event) {
    if (mouseDown) {
        if (currentColor === 'rainbow') {
            event.target.style.backgroundColor = randomColor();
        } else {
            event.target.style.backgroundColor = currentColor;
        };
    };
};

function pixelEnd() {
    mouseDown = false;
};

function addListenerPixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mousedown', pixelStart);
        item.addEventListener('mouseenter', pixelMove);
        item.addEventListener('mouseup', pixelEnd);
    });
    document.addEventListener('mouseup', pixelEnd);
};

function removeListenerPixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('mousedown', pixelStart);
        item.removeEventListener('mouseenter', pixelMove);
        item.removeEventListener('mouseup', pixelEnd);
    });
    document.removeEventListener('mouseup', pixelEnd);
};

function sketchpadStart(event) {
    mouseClick = true;
    event.target.style.backgroundColor = currentColor;
};

function sketchpadMove(event) {
    if (mouseClick) {
        if (currentColor === 'rainbow') {
            event.target.style.backgroundColor = randomColor();
        } else {
            event.target.style.backgroundColor = currentColor;
        };
    };
};

function sketchpadEnd() {
    mouseClick = false;
};

function addListenerSketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', sketchpadStart);
        item.addEventListener('mouseenter', sketchpadMove);
        item.addEventListener('dblclick', sketchpadEnd);
    });
};

function removeListenerSketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('click', sketchpadStart);
        item.removeEventListener('mouseenter', sketchpadMove);
        item.removeEventListener('dblclick', sketchpadEnd);
    });
};

//for rainbow color
function randomColor() {
    const rainbowColors = [
        'rgb(148, 0, 211)',
        'rgb(75, 0, 130)',
        'rgb(0, 0, 255)',
        'rgb(0, 255, 0)',
        'rgb(255, 255, 0)',
        'rgb(255, 127, 0)',
        'rgb(255, 0, 0)'
    ];
    let randomNumber = Math.floor(Math.random() * 7);
    return rainbowColors[randomNumber];
};

//button colors event listeners
buttonsColor.forEach(button => {
    let chosenColor = button.getAttribute('data-color');
    button.addEventListener('click', () => {
        switch(chosenColor) {
            case 'red':
                currentColor = 'red';
                break;
            case 'rainbow':
                currentColor = 'rainbow';
                break;
            case 'black':
                currentColor = 'black';
        };
    });
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

//popup event listener
buttonsAll.forEach(item => {
    item.addEventListener('mouseenter', (event) => {
        let message = event.target.getAttribute('data-message');
        popup.textContent = message;
        popup.style.display = 'block';
    });
    item.addEventListener('mouseleave', () => {
        popup.style.display = 'none';
    });
});

makeGrid(16);