const container = document.querySelector('#container');
let buttonResize = document.querySelector('#resize');
let buttonClear = document.querySelector('#clear');
let buttonPixel = document.querySelector('#pixel');
let buttonSketchpad = document.querySelector('#sketchpad');
let mouseDown = false;
let strokeSelection;

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

function pixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mousedown', () => {
            mouseDown = true;
            item.style.backgroundColor = 'black';
        });
        item.addEventListener('mousemove', () => {
            if(mouseDown) {
                item.style.backgroundColor = 'black';
            };
        });
        item.addEventListener('mouseup', () => {
            mouseDown = true;
        });
    });
};

document.addEventListener('mouseup', () => {
    mouseDown = false;
});

function sketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'black';
        });
    });
};

function clearGrid() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    };
};

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
    removeListenersSketchpad()
    pixel();
});

//sketchpad button
buttonSketchpad.addEventListener('click', () => {
    removeListenersPixel();
    sketchpad();
});
/*
[buttonSketchpad, buttonPixel].forEach(button => {
    button.addEventListener('click', () => {
        if(strokeSelection == 'pixel') {
            removeListenersSketchpad();
        } else if(strokeSelection == 'sketchpad') {
            sketchpad();
        };
    });
});
*/
function removeListenersPixel() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('mouseenter', pixel)
    });
};

function removeListenersSketchpad() {
    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.removeEventListener('mouseenter', sketchpad)
    })
}

makeGrid(16);


/*
strokeMode pseudocode

1.Select the stroke mode (pixel or sketchpad)
2.Add event listeners to each item

*/