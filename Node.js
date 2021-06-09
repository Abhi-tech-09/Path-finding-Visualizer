function Node(row, col, x, y, state, total_rows, total_cols) {
    this.row = row;
    this.col = col;
    this.x = x;
    this.y = y;
    this.myGap = 1;
    this.total_rows = total_rows;
    this.total_cols = total_cols;
    this.state = state;
    this.neighbors = [];
    this.distance = Infinity;
    this.visited = false;
}

Node.prototype.draw_bg = function(ctx , gap){
        ctx.fillStyle = '#AAAAAA';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
}

Node.prototype.draw_node = async function (ctx, gap) {
    var midGap = parseInt(gap / 2) ; 
    if (this.state == 's') {
        if (this.myGap != midGap)
            this.draw_bg(ctx,gap) ; 
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.rect(this.x + midGap - this.myGap, this.y + midGap - this.myGap, 2 * this.myGap, 2 * this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != midGap)
            this.myGap += 1

    }
    else if (this.state == 'f') {
        if (this.myGap != midGap)
            this.draw_bg(ctx,gap) ;
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.rect(this.x + midGap - this.myGap, this.y + midGap - this.myGap, 2 * this.myGap, 2 * this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != midGap)
            this.myGap += 1
    }
    else if (this.state == 'w') {
        if (this.myGap != midGap)
            this.draw_bg(ctx,gap) ;
        
        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.rect(this.x + midGap - this.myGap, this.y + midGap - this.myGap, 2 * this.myGap, 2 * this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        
        if (this.myGap != midGap)
            this.myGap += 1

    }
    else if (this.state == 'e') {
        ctx.fillStyle = '#cbc0c0';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
        this.myGap = 1;
        // ctx.fillStyle = '#A78D84' ; 
    }
    else if (this.state == 'd') {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
    }
    else if (this.state == 'p') {

        if(this.myGap != midGap){
            this.draw_bg(ctx,gap);
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.arc(this.x + midGap , this.y + midGap , this.myGap , 0 ,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            sleep(0.1);
            this.myGap += 1
        }
        else{
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.rect(this.x , this.y , gap , gap);
            ctx.closePath();
            ctx.fill();
        }
    }

}

Node.prototype.updateNeighbors = function () {
    var n = total_rows;
    var m = total_cols;
    //Checking if the cell above can be made neighbor 
    if (this.row > 0 && grid[this.row - 1][this.col].state != 'w') {
        this.neighbors.push(grid[this.row - 1][this.col]);
    }
    //Checking if the cell below can be made neigbor 
    if (this.row < n - 1 && grid[this.row + 1][this.col].state != 'w') {
        this.neighbors.push(grid[this.row + 1][this.col]);
    }
    //Checking if the cell on left can be made neigbor
    if (this.col > 0 && grid[this.row][this.col - 1].state != 'w') {
        this.neighbors.push(grid[this.row][this.col - 1]);
    }
    //Checking if the cell on right can be made neigbor 
    if (this.col < m - 1 && grid[this.row][this.col + 1].state != 'w') {
        this.neighbors.push(grid[this.row][this.col + 1]);
    }
}

const sleep = (time) => {
    return new Promise(
        (resolve) => setTimeout(resolve, time)
    );
}

function cmp(nodeA, nodeB) {
    return nodeA.distance - nodeB.distance;
}

function disable() {
    document.getElementById("Algo-btn").disabled = true;
    document.getElementById("makeGrid").disabled = true;
    document.getElementById("resetBtn").disabled = true ;
}
function enable() {
    document.getElementById("Algo-btn").disabled = false;
    document.getElementById("makeGrid").disabled = false;
    document.getElementById("resetBtn").disabled = false ;
}
