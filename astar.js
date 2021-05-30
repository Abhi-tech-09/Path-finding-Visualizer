var ASTAR = {
    

astarE:function(startNode , finishNode , grid){
    openList = [] ; 
    closedList = [] ; 
    var G = new Map() ; 
    var H = new Map() ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    openList.push(startNode) ;
    visitedNodes = [] ; 
    
    startNode.distance = 0 ;  
    H.set(startNode , ASTAR.heuristicE(startNode,finishNode)) ; 
    G.set(startNode , ( startNode.distance + H.get(startNode) ) ); 
    
    while(openList.length != 0){
        var currentSquare = ASTAR.findlow(openList , G) ; 

        //Removing it from openList
        var index = -1 ; 
        for(var i = 0 ; i < openList.length ; i++){
            if(currentSquare.x == openList[i].x && currentSquare.y == openList[i].y){
                index = i;
                break;
            }
        }
        if(index != -1){
            openList.splice(index , 1);
        }

        closedList.push(currentSquare) ; 
        visitedNodes.push(currentSquare);
        if(currentSquare == finishNode){
            console.log(parent)
            ASTAR.setPath(parent , visitedNodes ,startNode , finishNode);
            return ;  
        }

        var neighbor = currentSquare.neighbors ; 
        for(var i = 0 ; i < neighbor.length ; i++){
            if(ASTAR.findNode(neighbor[i] , closedList))
                continue; 
            if(!ASTAR.findNode(neighbor[i] , openList)){
                openList.push(neighbor[i]);
                parent.set(neighbor[i] , currentSquare);
                neighbor[i].distance = currentSquare.distance + 1 ; 
                H.set(neighbor[i] , ASTAR.heuristicE(neighbor[i],finishNode));
                G.set(neighbor[i] , (neighbor[i].distance + H.get(neighbor[i])));
            }
            else{
                var fValue = neighbor[i].distance;
                var currFvalue = currentSquare.distance + 1 ;  
                if(fValue > currFvalue){
                    parent.set(neighbor[i] , currentSquare);
                    G.set(neighbor[i] , currFvalue) ; 
                    neighbor[i].distance = currentSquare.distance + 1 ; 
                }
            }
        }

    }
} , 

astarM:function(startNode , finishNode , grid){
    openList = [] ; 
    closedList = [] ; 
    var G = new Map() ; 
    var H = new Map() ; 
    var parent = new Map() ; 
    parent.set(startNode , -1) ; 
    openList.push(startNode) ;
    visitedNodes = [] ; 
    
    startNode.distance = 0 ;  
    H.set(startNode , ASTAR.heuristic(startNode,finishNode)) ; 
    G.set(startNode , ( startNode.distance + H.get(startNode) ) ); 
    
    while(openList.length != 0){
        var currentSquare = ASTAR.findlow(openList , G) ; 

        //Removing it from openList
        var index = -1 ; 
        for(var i = 0 ; i < openList.length ; i++){
            if(currentSquare.x == openList[i].x && currentSquare.y == openList[i].y){
                index = i;
                break;
            }
        }
        if(index != -1){
            openList.splice(index , 1);
        }

        closedList.push(currentSquare) ; 
        visitedNodes.push(currentSquare);
        if(currentSquare == finishNode){
            console.log(parent)
            ASTAR.setPath(parent , visitedNodes ,startNode , finishNode);
            return ;  
        }

        var neighbor = currentSquare.neighbors ; 
        for(var i = 0 ; i < neighbor.length ; i++){
            if(ASTAR.findNode(neighbor[i] , closedList))
                continue; 
            if(!ASTAR.findNode(neighbor[i] , openList)){
                openList.push(neighbor[i]);
                parent.set(neighbor[i] , currentSquare);
                neighbor[i].distance = currentSquare.distance + 1 ; 
                H.set(neighbor[i] , ASTAR.heuristic(neighbor[i],finishNode));
                G.set(neighbor[i] , (neighbor[i].distance + H.get(neighbor[i])));
            }
            else{
                var fValue = neighbor[i].distance;
                var currFvalue = currentSquare.distance + 1 ;  
                if(fValue > currFvalue){
                    parent.set(neighbor[i] , currentSquare);
                    G.set(neighbor[i] , currFvalue) ; 
                    neighbor[i].distance = currentSquare.distance + 1 ; 
                }
            }
        }

    }
} ,

//Manhattan 
heuristic : function(node1 , node2){
     var X =  Math.abs(node1.x - node2.x) ;
     var Y =  Math.abs(node1.y - node2.y) ;
     ANS = (X + Y) ; 
     return ANS ; 
} , 
heuristicE : function(node1 , node2){
    var X =  Math.abs(node1.x - node2.x) ;
    var Y =  Math.abs(node1.y - node2.y) ;
    ANS = Math.sqrt(X*X + Y*Y) ; 
    return ANS ; 
} , 

findlow : function(openList , G){
    var min = Infinity ; 
    var r ; 
    for(var i = 0 ; i < openList.length ; i++){
        if(G.get(openList[i]) < min){
            min = G.get(openList[i]);
            r = openList[i] ; 
        }
    }
    return r ; 
} , 

findNode : function(node , array){
    for(var i = 0 ; i < array.length; i++){
        if(array[i].x == node.x && array[i].y == node.y){
            return true ; 
        }
    }
    return false ; 
} , 

setPath: async function(parent , visitedNodes ,startNode ,  finishNode){
    await ASTAR.updateVisited(visitedNodes);
    crawl = parent.get(finishNode) ;
    while(crawl != -1){  
        await sleep(100) ; 
        if(crawl != startNode && crawl != finishNode && crawl != null)
            crawl.state = 'p'  , console.log(crawl);
        crawl = parent.get(crawl) ; 
        
    }
    enable() ; 
    return "Path found" ; 
} , 


updateVisited:async function (visitedNodes){
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