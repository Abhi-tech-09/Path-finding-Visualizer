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

Node.prototype.draw_node = async function (ctx, gap) {
    if (this.state == 's') {
        ctx.fillStyle = '#AAAAAA';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.myGap, this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != gap)
            this.myGap += 1

    }
    else if (this.state == 'f') {
        ctx.fillStyle = '#AAAAAA';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.myGap, this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != gap)
            this.myGap += 1
    }
    else if (this.state == 'w') {
        ctx.fillStyle = '#AAAAAA';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#0000FF';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.myGap, this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(0.1);
        if (this.myGap != 0) {
            if (this.myGap != gap)
                this.myGap += 1
            //         else if(this.myGap == gap+1){
            //             ctx.fillStyle = '#AAAAAA' ; 
            //             ctx.beginPath() ; 
            //         ctx.rect(this.x ,this.y , gap+1 , gap+1 );
            //         ctx.closePath() ; 
            //         ctx.fill() ; 
            //         ctx.fillStyle = '#0000FF' ;
            //     ctx.beginPath() ; 
            // ctx.rect(this.x ,this.y , gap , gap );
            // ctx.closePath() ;
            // ctx.fill() ;
            // this.myGap = 0 ; 

            //         }
        }
    }
    else if (this.state == 'e') {
        ctx.fillStyle = '#AAAAAA';
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
        this.myGap = gap - 1;
    }
    else if (this.state == 'p') {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.rect(this.x, this.y, gap, gap);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.rect(this.x + this.myGap, this.y, gap - this.myGap, gap);
        ctx.closePath();
        ctx.fill();
        sleep(0.00001);
        if (this.myGap != 0)
            this.myGap -= 1
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
}
function enable() {
    document.getElementById("Algo-btn").disabled = false;
    document.getElementById("makeGrid").disabled = false;
}
