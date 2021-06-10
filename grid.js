var canvas;
var ctx;

var s = document.querySelector(".container").offsetWidth;
var width = window.innerWidth - s;
var height = window.innerHeight;
document.querySelector("#canvas").width = width - 2;
document.querySelector("#canvas").height = height - 2;
document.querySelector("#ok").addEventListener('click' , function(){
    document.querySelector(".block").style.opacity = 0 ;  
    document.querySelector("#ok").style.pointerEvents = "none";
});

var startNode;
var finishNode;

var gap = 20;

// var total_rows = 30; //30
// var total_cols = 50; //56
//Doing Some Shitty Calculations
var total_rows = parseInt(Math.floor((height - 2) / (gap + 1.5)));
var total_cols = parseInt(Math.floor((width - 2) / (gap + 1.5)));

var left_in_x = (width -2 ) - (total_cols * (gap + 1.5));
var left_in_y = (height - 2) - (total_rows * (gap + 1.5));

var grid = [];
for (var r = 0; r < total_rows; r++) {
    grid.push([])
    for (var c = 0; c < total_cols; c++) {
        //e stands for empty
        node = new Node(r, c, parseInt(left_in_x / 2) + c * (gap + 1.5), parseInt(left_in_y / 2 + 0.5) + r * (gap + 1.5), 'e', total_rows, total_cols);
        grid[r][c] = node;
    }
}

function resizegap1() {
    reset();
    gap += 2;
    total_rows = parseInt(Math.floor((height - 2) / (gap + 1)));
    total_cols = parseInt(Math.floor((width - 2) / (gap + 1)));
    left_in_x = (width - 2) - (total_cols * (gap + 1));
    left_in_y = (height - 2) - (total_rows * (gap + 1));
    grid = [];
    for (var r = 0; r < total_rows; r++) {
        grid.push([])
        for (var c = 0; c < total_cols; c++) {
            //e stands for empty
            node = new Node(r, c, parseInt(left_in_x / 2) + c * (gap + 1), parseInt(left_in_y / 2 + 0.5) + r * (gap + 1), 'e', total_rows, total_cols);
            grid[r][c] = node;
        }
    }
}
function resizegap2() {
    reset();
    if((gap-1) <= 16){
        alert("Website Might crash , Do at your own Risk !!")
    }
    gap -= 2;
    total_rows = parseInt(Math.floor((height - 3) / (gap + 1)));
    total_cols = parseInt(Math.floor((width - 5) / (gap + 1)));
    left_in_x = (width - 5) - (total_cols * (gap + 1));
    left_in_y = (height - 3) - (total_rows * (gap + 1));
    grid = [];
    for (var r = 0; r < total_rows; r++) {
        grid.push([])
        for (var c = 0; c < total_cols; c++) {
            //e stands for empty
            node = new Node(r, c, parseInt(left_in_x / 2) + c * (gap + 1), parseInt(left_in_y / 2 + 0.5) + r * (gap + 1), 'e', total_rows, total_cols);
            grid[r][c] = node;
        }
    }
}
function draw() {
    clear();
    ctx.fillStyle = "#0c3547";
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < total_rows; i++) {
        for (var j = 0; j < total_cols; j++) {
            grid[i][j].draw_node(ctx, gap);
        }
    }

}
function clear() {
    ctx.clearRect(0, 0, width, height);
}

function initialise() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    return setInterval(draw, 10);
}

var pressX = 0;
var pressY = 0;
var clickedStart = 0;
var clickedFinish = 0;
function drag(e) {
    var mx = e.clientX - canvas.offsetLeft;
    var my = e.clientY - canvas.offsetTop;

    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            let currX = grid[r][c].x;
            let currY = grid[r][c].y;
            if (currX <= mx && mx <= (currX + gap) && currY <= my && my <= (currY + gap)) {
                if (clickedFinish == 0 && grid[r][c].state != 's') {
                    clickedFinish = 1;
                    grid[r][c].state = 'f';
                    finishNode = grid[r][c];
                }
                else if (grid[r][c].state == "e" && (pressX != c || pressY != r) && grid[r][c].state != 's' && grid[r][c].state != 'f') {
                    grid[r][c].state = "w";
                    pressX = c;
                    pressY = r;
                }
                else if (grid[r][c].state == "w" && (pressX != c || pressY != r) && grid[r][c].state != 's' && grid[r][c].state != 'f') {
                    grid[r][c].state = "e";
                    pressX = c;
                    pressY = r;
                }
            }
        }
    }
}

function pressed(e) {
    canvas.onmousemove = drag;
    var mx = e.clientX - canvas.offsetLeft;
    var my = e.clientY - canvas.offsetTop;

    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            let currX = grid[r][c].x;
            let currY = grid[r][c].y;
            if (currX <= mx && mx <= (currX + gap) && currY <= my && my <= (currY + gap)) {
                if (clickedStart == 0) {
                    clickedStart = 1;
                    grid[r][c].state = 's';
                    startNode = grid[r][c];
                }
                else if(grid[r][c].state == 's'){
                    clickedStart = 0 ;
                    grid[r][c].state = 'e' ; 
                    startNode = null ; 
                }
                else if (clickedFinish == 0 && grid[r][c].state != 's' && clickedStart == 1) {
                    clickedFinish = 1;
                    grid[r][c].state = 'f';
                    finishNode = grid[r][c];
                }
                else if(clickedFinish == 1 && grid[r][c].state == 'f'){
                    clickedFinish = 0 ;
                    grid[r][c].state = 'e' ; 
                    finishNode = null ; 
                }
                else if (grid[r][c].state == "e" && grid[r][c].state != 's' && grid[r][c].state != 'f') {
                    grid[r][c].state = "w";
                    pressX = c;
                    pressY = r;
                }
                else if (grid[r][c].state == "w" && grid[r][c].state != 's' && grid[r][c].state != 'f') {
                    grid[r][c].state = "e";
                    pressX = c;
                    pressY = r;
                }
            }
        }
    }
}

function animate(s){
    document.querySelector(".block").style.opacity = 1 ; 
    document.querySelector(".text").innerHTML = `<p>${s}</p>`;
    document.querySelector("#ok").style.pointerEvents = "all" ; 
    
}


function up() {
    canvas.onmousemove = null;
}

function callDijkstra() {

    resetNodes();

    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        DijkstraAlgo.dijkstra(startNode, finishNode);
    }
}

function callBFS() {

    resetNodes();

    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable()
        BFS.bfs(startNode, finishNode);
    }


}

function callDFS() {

    resetNodes();

    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        DFS.dfs(startNode, finishNode);
    }
}

function callAstarM() {
    resetNodes();
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        ASTAR.astarM(startNode, finishNode, grid);
    }
}

function callAstarE() {
    resetNodes();
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        ASTAR.astarE(startNode, finishNode, grid);
    }
}

function callBiDijkstra() {
    resetNodes();
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        BIDIJKSTRA.BiDijkstra(startNode, finishNode, grid);
    }
}

function callc() {
    resetNodes();
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    if (startNode != null && finishNode != null) {
        disable();
        CD.cd(startNode, finishNode, grid);
    }
}

async function meraRecursion(r0, c0, rm, cm) {
    if (Math.abs(rm - r0) <= 5) {
        return;
    }
    if (Math.abs(cm - c0) <= 5) {
        return;
    }
    let horizontal = cm - c0;
    let vertical = rm - r0;
    if (vertical >= horizontal) {
        let randRow = Math.floor(Math.random() * ((rm - 2) - (r0 + 2))) + r0 + 2;

        for (var i = c0 + 1; i < cm; i++) {
            await sleep(1);
            grid[randRow][i].state = 'w';
        }
        var cnt = Math.floor(Math.random() * 3) + 2;
        while (cnt != 0) {
            cnt -= 1;
            let randCol = Math.floor(Math.random() * (cm - c0)) + c0;
            if (randCol == c0) randCol += 1
            grid[randRow][randCol].state = 'e';
        }
        meraRecursion(r0, c0, randRow, cm);
        meraRecursion(randRow, c0, rm, cm);
    }
    else {
        let randCol = Math.floor(Math.random() * ((cm - 2) - (c0 + 2))) + c0 + 2;


        for (var i = r0 + 1; i < rm; i++) {
            await sleep(1);
            grid[i][randCol].state = 'w';
        }

        var cnt = Math.floor(Math.random() * 3) + 2;
        while (cnt != 0) {
            cnt -= 1;
            let randRow = Math.floor(Math.random() * (rm - r0)) + r0;
            if (randRow == r0) randRow += 1
            grid[randRow][randCol].state = 'e';
        }
        meraRecursion(r0, c0, rm, randCol);
        meraRecursion(r0, randCol, rm, cm);

    }

}

async function newrecursion(l, r) {
    if (Math.abs(l - r) <= 3) {
        return;
    }

    var mid = parseInt((l + r) / 2);
    for (var row = 0; row < total_rows; row++) {
        await sleep(1);
        grid[row][mid].state = 'w';
    }
    let cnt = 0;
    while (cnt++ <= 3) {
        randRow = Math.floor(Math.random() * (total_rows));
        grid[randRow][mid].state = 'e';
    }
    newrecursion(l, mid - 1);
    newrecursion(mid + 1, r);


}

async function makeSimple() {
    //Random Maze
    let cnt = 0;
    while (cnt != 200) {
        cnt += 1;
        let rr = Math.floor(Math.random() * 30);
        let cc = Math.floor(Math.random() * 56);
        await sleep(10);
        grid[rr][cc].state = 'w';
    }
}

async function RecursiveDivison() {
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    for (var r = 0; r < total_rows; r++) {
        await sleep(1);
        grid[r][0].state = 'w';
        grid[r][total_cols - 1].state = 'w';
    }
    for (var c = 0; c < total_cols; c++) {
        await sleep(1);
        grid[0][c].state = 'w';
        grid[total_rows - 1][c].state = 'w';
    }

    meraRecursion(0, 0, total_rows - 1, total_cols - 1);

}

async function recursion(l, r) {
    if (Math.abs(l - r) <= 2)
        return;

    var mid = parseInt((l + r) / 2);
    for (var col = 0; col < total_cols; col++) {
        await sleep(1);
        grid[mid][col].state = 'w';
    }
    let cnt = 0;
    while (cnt++ <= 3) {
        randCol = Math.floor(Math.random() * (total_cols - 1));
        grid[mid][randCol].state = 'e';
    }
    recursion(l, mid - 1);
    recursion(mid + 1, r);
}

async function RecursiveDivisonV() {
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    for (var r = 0; r < total_rows; r++) {
        await sleep(1);
        grid[r][0].state = 'w';
        grid[r][total_cols - 1].state = 'w';
    }
    for (var c = 0; c < total_cols; c++) {
        await sleep(1);
        grid[0][c].state = 'w';
        grid[total_rows - 1][c].state = 'w';
    }
    recursion(0, total_rows - 1);

}

async function RecursiveDivisonH() {
    for (var r = 0; r < total_rows; r++) {
        for (var c = 0; c < total_cols; c++) {
            grid[r][c].updateNeighbors();
        }
    }
    for (var r = 0; r < total_rows; r++) {
        await sleep(1);
        grid[r][0].state = 'w';
        grid[r][total_cols - 1].state = 'w';
    }
    for (var c = 0; c < total_cols; c++) {
        await sleep(1);
        grid[0][c].state = 'w';
        grid[total_rows - 1][c].state = 'w';
    }
    newrecursion(0, total_cols - 1);
}

function resetNodes() {
    if (startNode == null || finishNode == null) {
        animate("Select start and finish Node.")
    }
    for (var i = 0; i < total_rows; i++) {
        for (var j = 0; j < total_cols; j++) {
            if (grid[i][j].state == 'd' || grid[i][j].state == 'p') {
                grid[i][j].state = 'e';
            }
            grid[i][j].neighbors = [];
            grid[i][j].distance = Infinity;
            grid[i][j].visited = false;
        }
    }
}

function reset() {
    startNode = null ; 
    finishNode = null ; 
    for (var i = 0; i < total_rows; i++) {
        for (var j = 0; j < total_cols; j++) {
            grid[i][j].state = 'e';
            grid[i][j].neighbors = [];
            grid[i][j].distance = Infinity;
            grid[i][j].visited = false;
        }
    }
    pressX = new Node();
    pressY = new Node();
    clickedStart = 0;
    clickedFinish = 0;
}

initialise();
canvas.onmousedown = pressed;
canvas.onmouseup = up;
