const container = document.querySelector('#container')

let input = prompt('how many rows?');
/*
function makeGrid (input) {
    for (rows = 0; rows < input; rows++) {
        for (column = 0; column < input; column++){
            container.append("<div class='grid'></div>");
        };
    };
    $('.grid').width(960/input);
    $('.grid').height(960/input);
};*/
//makeGrid(input);

function createGrid(x) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(960/x);
    $(".grid").height(960/x);
};

createGrid(16)