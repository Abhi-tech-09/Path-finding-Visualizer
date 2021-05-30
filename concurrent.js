var CD = {
    cd : async function (startNode , finishNode , grid){
        var flag = 0  ;
        var up = 3 , down = 3 , left = 3 , right = 3; 
        var sx = startNode.row - 1 ; 
        var sy = startNode.col - 1 ; 
        var ex = startNode.row + 1 ; 
        var ey = startNode.col + 1 ; 
        var tr = startNode.total_rows ; 
        var tc = startNode.total_cols ; 
        while (true){
            await sleep(10) ; 
            if(sx >= 0){
                for(var i = 0 ; i < up ; i++){
                    if((sy+i) < tc && grid[sx][sy+i].state != 'w' && grid[sx][sy+i].state != 'f')
                        grid[sx][sy+i].state = 'd' ;
                     
                }
            }
            if(ex < startNode.total_rows){
                for(var i = 0; i < down ; i++){
                    if((sy+i) < tc && grid[ex][sy+i].state != 'w' && grid[ex][sy+i].state != 'f')
                        grid[ex][sy+i].state = 'd' ; 
                    
                }
            }
            if(sy >= 0){
                for(var i = 0 ; i < left ; i++){
                    if((sx+i) < tr && grid[sx+i][sy].state != 'w' && grid[sx+i][sy].state != 'f')
                        grid[sx+i][sy].state = 'd' ; 
                   
                }
            }
            if(ey < startNode.total_cols){
                for(var i = 0 ; i < right ; i++){
                    if((sx+i) < tr && grid[sx+i][ey].state != 'w' && grid[sx+i][ey].state != 'f')
                        grid[sx+i][ey].state = 'd' ; 
                   
                }
            }

            await sleep(100) ; 
            if(sx >= 0){
                for(var i = 0 ; i < up ; i++){
                    if((sy+i) < tc && grid[sx][sy+i].state != 'w'){
                        if(grid[sx][sy+i].state == 'f') {flag = 1 ;
                        continue ; }
                        grid[sx][sy+i].state = 'e' ; 
                    }
                }
            }
            if(ex < startNode.total_rows){
                for(var i = 0; i < down ; i++){
                    if((sy+i) < tc && grid[ex][sy+i].state != 'w'){
                        if(grid[ex][sy+i].state == 'f'){ flag = 1 ;
                        continue ; } 
                        grid[ex][sy+i].state = 'e' ; 
                    }
                }
            }
            if(sy >= 0){
                for(var i = 0 ; i < left ; i++){
                    if((sx+i) < tr && grid[sx+i][sy].state != 'w'){
                        if(grid[sx+i][sy].state == 'f'){ flag = 1 ;
                        continue ; } 
                        grid[sx+i][sy].state = 'e' ; 
                    }
                }
            }
            if(ey < startNode.total_cols){
                for(var i = 0 ; i < right ; i++){
                    if((sx+i) < tr && grid[sx+i][ey].state != 'w'){
                        if(grid[sx+i][ey].state == 'f'){ flag = 1 ;
                        continue ; } 
                        grid[sx+i][ey].state = 'e' ; 
                    }
                }
            }

            up += 2 ; 
            down += 2 ; 
            left += 2 ; 
            right += 2 ; 
            sx -= 1 ; 
            sy -= 1 ; 
            ex += 1 ; 
            ey += 1  ;
            
            if(sx <= 0 && sy <= 0 && ex >= tr && ey >= tc)
                break ;

            if(sx < 0)
                sx = 0 ; 
            if(sy < 0)
                sy = 0 ; 
            if(ex == tr)
                ex-- ; 
            if(ey == tc)
                ey-- ; 

            if(flag == 1){
                CD.smallDijkstra(startNode , finishNode) ; 
                break ; 
            }


        }
    } , 
    smallDijkstra : async function (startNode , finishNode){
        q = [] ; 
        q.push(startNode) ; 
        var parent = new Map() ; 
        parent.set(startNode , -1) ; 
        
        startNode.distance = 0 ; 
        while(q.length != 0){
            q.sort(cmp);
            var curr = q[0] ; 
            q.shift() ; 
    
            if(curr == finishNode){
                await CD.mysetPath(parent , finishNode) ; 
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
    } 


}