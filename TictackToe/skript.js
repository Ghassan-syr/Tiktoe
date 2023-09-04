
window.addEventListener('load', initiate, false);
window.addEventListener('click', logic, false);

var c, canvas;
var moves = [];
var turn = 1;

function initiate() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    draw();
}

function logic(e) {
    if(e.pageX < 500 && e.pageY < 500) {
        var cX = Math.floor(e.pageX/(500/3));
        var cY = Math.floor(e.pageY/(500/3));

        var alreadyClicked = false;

        for (i in moves) {
            if(moves[i][0] == cX && moves[i][1] == cY) {
                alreadyClicked = true;
                alert("Nicht zulaessig!");
            }
        }

        if(alreadyClicked == false) {
            moves[(moves.length)] = [cX, cY, turn];
            turn = turn*-1;
            draw();
            checkWin();
        }
    }
}

function checkWin() {
    for(i in moves) {
        var vert = 0;
        var horz = 0;
        var tlDiag = 0;
        var trDiag = 0;
        for(n in moves) {
            if(moves[n][2] == moves[i][2]) {
                if((moves[n][0] == moves[i][0]+1 || moves[n][0] == moves[i][0]-1) &&
                    moves[n][1] == moves[i][1]) {
                    horz++;
                }
                if((moves[n][1] == moves[i][1]+1 || moves[n][1] == moves[i][1]-1) &&
                    moves[n][0] == moves[i][0]) {
                    vert++;
                }
                if((moves[n][0] == moves[i][0]-1 && moves[n][1] == moves[i][1]-1) ||
                   (moves[n][0] == moves[i][0]+1 && moves[n][1] == moves[i][1]+1)) {
                    tlDiag++;
                }
                if((moves[n][0] == moves[i][0]-1 && moves[n][1] == moves[i][1]+1) ||
                   (moves[n][0] == moves[i][0]+1 && moves[n][1] == moves[i][1]-1)) {
                    trDiag++;
                }
            }
        }
        if(horz > 1 || vert > 1 || tlDiag > 1 || trDiag > 1) {
            alert("You Won!");
            window.removeEventListener("click", logic, false);
        }
    }
}

var bg = new Image();
var x = new Image();
var o = new Image();

bg.src = "ttt_board.png";
x.src = "ttt_x.png";
o.src = "ttt_o.png";

function draw() {
    c.clearRect(0, 0, 500, 500);
    c.drawImage(bg, 0, 0);
    for(i in moves) {
        if(moves[i][2] == 1) {
            c.drawImage(x, Math.floor(moves[i][0]*(500/3)+0.5), Math.floor(moves[i][1]*(500/3)+1.5));
        }
        else {
            c.drawImage(o, Math.floor(moves[i][0]*(500/3)+0.5), Math.floor(moves[i][1]*(500/3)+1.5));
        }
    }
}
