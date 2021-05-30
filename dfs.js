var DFS = {

dfs:function(startNode , finishNode){
    s = [] ; 
    s.push(startNode) ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    visitedNodes = [] ;

    while(s.length != 0){
        var topNode = s[s.length - 1] ; 
        console.log(s.pop()) ;
    
        visitedNodes.push(topNode);
        if(topNode == finishNode){
            DFS.dfssetPath(parent , visitedNodes ,startNode ,  finishNode);
            console.log("It has ended")
            return ;
        }

        var neighbor = topNode.neighbors ;
        console.log(neighbor);
        for(var i = 0 ; i < neighbor.length ; i++){
            if(neighbor[i].visited == false){
                neighbor[i].visited = true ; 
                s.push(neighbor[i]);
                parent.set(neighbor[i] , topNode) ; 
            }
        }
    }
    
    return ; 
},

dfssetPath : async function (parent , visitedNodes , startNode , finishNode){
    await DFS.updateVisited(visitedNodes);

    crawl = parent.get(finishNode) ; 
    while(crawl != -1){
        await sleep(10) ; 
        if(crawl != startNode && crawl != finishNode && crawl != null)
            crawl.state = 'p' ;
        crawl = parent.get(crawl) ; 
        if(crawl == startNode)
            break;
        console.log(crawl)  
    }
    enable() ; 
    return "Path found" ; 
},
updateVisited : async function (visitedNodes){
    for (var i = 0 ; i < visitedNodes.length ; i++){
        if(visitedNodes[i].state != 's' && visitedNodes[i].state != 'f' && visitedNodes[i].state != 'p' ){
            await sleep(10) ; 
            visitedNodes[i].state = 'd' ; 
        }
    }
}
}