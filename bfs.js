var BFS = {

bfs : function(startNode , finishNode){
    q = [] ; 
    var parent = new Map() ;
    startNode.distance = 0 ;
    parent.set(startNode , -1) ;  
    startNode.visited = true ; 
    q.push(startNode) ; 
    visitedNodes = [] ; 
    while(q.length != 0){
        frontNode = q[0] ; 
        q.shift() ; 

        visitedNodes.push(frontNode); 
        if(frontNode == finishNode){
            BFS.setPath(parent,visitedNodes,finishNode);
            return  ; 
        }

        neighbor = frontNode.neighbors;
        for(var i = 0 ; i < neighbor.length ; i++){
            if(!neighbor[i].visited){
                neighbor[i].visited = true ;
                neighbor[i].distance = frontNode.distance + 1 ; 
                parent.set(neighbor[i] , frontNode) ; 
                q.push(neighbor[i]);
            }
        } 
    }
    return ; 

} , 

setPath : async function(parent , visitedNodes , finishNode){
    await BFS.updateVisited(visitedNodes);
    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        await sleep(100) ; 
        if(crawl != startNode && crawl != finishNode)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
    }
    enable();
    return "Path found" ; 
} , 


updateVisited : async function(visitedNodes){
    for (var i = 0 ; i < visitedNodes.length ; i++){
        if(visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' && visitedNodes[i].state != 'p' ){
            await sleep(2) ; 
            visitedNodes[i].state = 'd' ; 
        }
    }
    return new Promise(function(resolve , reject){
        setTimeout(() => {
            const check = true ; 
            if(check){
                resolve();
            }
            else{
                reject();
            }
        }, 1000);
    });
}

}