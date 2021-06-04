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
        ctx.rect(this.x + parseInt(gap / 2) - this.myGap, this.y + parseInt(gap / 2) - this.myGap, 2 * this.myGap, 2 * this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != parseInt(gap / 2))
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
        ctx.rect(this.x + parseInt(gap / 2) - this.myGap, this.y + parseInt(gap / 2) - this.myGap, 2 * this.myGap, 2 * this.myGap);
        ctx.closePath();
        ctx.fill();
        sleep(1);
        if (this.myGap != parseInt(gap / 2))
            this.myGap += 1
    }
    else if (this.state == 'w') {
        if (this.myGap != parseInt(gap / 2)) {
            ctx.fillStyle = '#AAAAAA';
            ctx.beginPath();
            ctx.rect(this.x, this.y, gap, gap);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#0000FF';
            ctx.beginPath();
            ctx.rect(this.x + parseInt(gap / 2) - this.myGap, this.y + parseInt(gap / 2) - this.myGap, 2 * this.myGap, 2 * this.myGap);
            // ctx.arc(this.x + parseInt(gap/2) , this.y + parseInt(gap/2) , this.myGap , 0 ,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            sleep(1000);
        }
        if (this.myGap != parseInt(gap / 2))
            this.myGap += 1
        else {
            sleep(10000000);
            ctx.fillStyle = '#0000FF';
            ctx.beginPath();
            ctx.rect(this.x, this.y, gap, gap);
            ctx.closePath();
            ctx.fill();
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
        if (this.myGap != parseInt(gap / 2) + 1) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.rect(this.x, this.y, gap, gap);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.rect(this.x + parseInt(gap / 2) - this.myGap, this.y + parseInt(gap / 2) - this.myGap, 2 * this.myGap, 2 * this.myGap);
            ctx.closePath();
            ctx.fill();
            sleep(1);
        }
        if (this.myGap != parseInt(gap / 2) + 1)
            this.myGap -= 1
        else {
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.rect(this.x, this.y, gap, gap);
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
}
function enable() {
    document.getElementById("Algo-btn").disabled = false;
    document.getElementById("makeGrid").disabled = false;
}
