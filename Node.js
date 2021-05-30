function Node(row , col , x , y , state , total_rows , total_cols){
    this.row = row ;
    this.col = col ;
    this.x = x ;
    this.y = y ;
    this.total_rows = total_rows ; 
    this.total_cols = total_cols ;
    this.state = state ;
    this.neighbors = [] ; 
    this.distance = Infinity ; 
    this.visited = false ; 
}

Node.prototype.draw_node = function(ctx,gap){
    if(this.state == 's'){
        ctx.fillStyle = '#00FF00' ;
    }
    else if(this.state == 'f'){
        ctx.fillStyle = '#FF0000' ;
    }
    else if(this.state == 'w'){
        ctx.fillStyle = '#0000FF' ;
    }
    else if (this.state == 'e'){
        ctx.fillStyle = '#AAAAAA' ; 
        // ctx.fillStyle = '#A78D84' ; 
    }
    else if(this.state == 'd'){
        ctx.fillStyle = '#FFD700' ; 
    }
    else if(this.state == 'p'){
        ctx.fillStyle = '#228B22' ; 
    }
    ctx.beginPath() ; 
    ctx.rect(this.x ,this.y , gap , gap );
    // ctx.arc(this.x + 10 ,  this.y + 10 , 10 , 0 , 2*Math.PI);
    ctx.closePath() ; 
    ctx.fill() ; 
}

Node.prototype.updateNeighbors = function(){
    var n = total_rows ; 
    var m = total_cols ;
    //Checking if the cell above can be made neighbor 
    if(this.row > 0 && grid[this.row-1][this.col].state != 'w'){
        this.neighbors.push(grid[this.row-1][this.col]) ; 
    }
    //Checking if the cell below can be made neigbor 
    if(this.row < n-1 && grid[this.row+1][this.col].state != 'w'){
        this.neighbors.push(grid[this.row+1][this.col]) ;
    }
    //Checking if the cell on left can be made neigbor
    if(this.col > 0 && grid[this.row][this.col-1].state != 'w'){
        this.neighbors.push(grid[this.row][this.col-1]) ;
    }
    //Checking if the cell on right can be made neigbor 
    if(this.col < m-1 && grid[this.row][this.col+1].state != 'w'){
        this.neighbors.push(grid[this.row][this.col+1]) ;
    }
}

const sleep = (time) => {
    return new Promise(
        (resolve) => setTimeout(resolve , time)
        ); 
}

function cmp(nodeA  ,nodeB){
    return nodeA.distance - nodeB.distance ; 
}

function disable(){
    document.getElementById("Algo-btn").disabled = true;
    document.getElementById("makeGrid").disabled = true ; 
}
function enable(){
    document.getElementById("Algo-btn").disabled = false;
    document.getElementById("makeGrid").disabled = false ;
}
