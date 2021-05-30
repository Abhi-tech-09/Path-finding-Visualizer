var BIDIJKSTRA = {
    

BiDijkstra:async function (start, finish , grid ) {
    visitedNodes1 = [];
    visitedNodes2 = [];
    q1 = [];
    q2 = [];
    start.distance = 0;
    finish.distance = 0;
    var parent1 = new Map() ; 
    var parent2 = new Map() ; 
    parent1.set(start , -1); 
    parent2.set(finish , -1);
    q1.push(start);
    q2.push(finish);
    while (q1.length != 0 && q2.length != 0) {
        q1.sort(cmp);
        q2.sort(cmp);
        var curr1 = q1[0];
        var curr2 = q2[0];
        q1.shift();
        q2.shift();

        visitedNodes1.push(curr1);
        visitedNodes2.push(curr2);



        var neighbor1 = curr1.neighbors;
        var neighbor2 = curr2.neighbors;
        for(var i = 0 ; i < neighbor1.length ; i++){
            if(visitedNodes2.includes(neighbor1[i]) || visitedNodes1.includes(neighbor2[i])){
                
                await BIDIJKSTRA.updateBoth(visitedNodes1,visitedNodes2);
                if(visitedNodes2.includes(neighbor1[i])){
                    await BIDIJKSTRA.smallDijkstra1(curr1 , finish , grid) ; 
                    await BIDIJKSTRA.smallDijkstra2(curr1 , start , grid) ; 
                }
                else{
                    await BIDIJKSTRA.smallDijkstra1(curr2 , start , grid) ; 
                    // await sleep(100) ; 
                    await BIDIJKSTRA.smallDijkstra2(curr2 , finish , grid) ; 
                }



            return;
            }
        }

        for (var i = 0; i < neighbor1.length; i++) {
            if (neighbor1[i].distance > (curr1.distance + 1)) {
                neighbor1[i].distance = curr1.distance + 1;
                parent1.set(neighbor1[i] , curr1) ; 
                q1.push(neighbor1[i]);
            }
        }

        for (var i = 0; i < neighbor2.length; i++) {
            if (neighbor2[i].distance > (curr2.distance + 1)) {
                neighbor2[i].distance = curr2.distance + 1;
                parent2.set(neighbor2[i] , curr2) ; 
                q2.push(neighbor2[i]);
            }
        }

    }

},



updateBoth:async function (visitedNodes1, visitedNodes2) {
    BIDIJKSTRA.updateVisitedother(visitedNodes1);
    await BIDIJKSTRA.updateVisitedother(visitedNodes2);
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const check = true;
            if (check) {
                resolve();
            }
            else {
                reject();
            }
        }, 1000);
    });
} , 

updateVisitedother:async function (visitedNodes) {
    for (var i = 0; i < visitedNodes.length; i++) {
        if (visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' && visitedNodes[i].state != 'p') {
            await sleep(2);
            visitedNodes[i].state = 'd';
        }
    }
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const check = true;
            if (check) {
                resolve();
            }
            else {
                reject();
            }
        }, 1000);
    });
} ,

mysetPath : async function (parent ,  finishNode){
    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        await sleep(10) ; 
        if(crawl != startNode && crawl != finishNode && crawl != null)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
    }
    enable() ; 
    return "Path found" ; 
} ,

smallDijkstra1 : async function (startNode , finishNode , grid){
    q = [] ; 
    q.push(startNode) ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    
    for(var i = 0 ; i < grid.length ; i++){
        for(var j = 0 ; j < grid[0].length ; j++){
            grid[i][j].distance = Infinity ; 
        }
    }
    startNode.distance = 0 ; 
    while(q.length != 0){
        q.sort(cmp);
        var curr = q[0] ; 
        q.shift() ; 

        if(curr == finishNode){
            await BIDIJKSTRA.mysetPath(parent , finishNode) ; 
            return ;
        }

        var neighbor = curr.neighbors ; 
        for(var i = 0; i < neighbor.length ; i++){
            if(neighbor[i].distance > curr.distance+1){
                neighbor[i].distance = curr.distance+1 ;
                parent.set(neighbor[i] , curr) ; 
                q.push(neighbor[i]);
            } 
        }
    }
} , 
smallDijkstra2 : async function (startNode , finishNode , grid){
    q = [] ; 
    q.push(startNode) ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    
    for(var i = 0 ; i < grid.length ; i++){
        for(var j = 0 ; j < grid[0].length ; j++){
            grid[i][j].distance = Infinity ; 
        }
    }
    startNode.distance = 0 ; 
    while(q.length != 0){
        q.sort(cmp);
        var curr = q[0] ; 
        q.shift() ; 

        if(curr == finishNode){
            await BIDIJKSTRA.mysetPath(parent , finishNode) ; 
            return ;
        }

        var neighbor = curr.neighbors ; 
        for(var i = 0; i < neighbor.length ; i++){
            if(neighbor[i].distance > curr.distance+1){
                neighbor[i].distance = curr.distance+1 ;
                parent.set(neighbor[i] , curr) ; 
                q.push(neighbor[i]);
            } 
        }
    }
}

}