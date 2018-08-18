//Things to make
//deletegroup()
//UpdateBoard()

Game = []
KoCheck = []
afterMove(){  
  move = this.getmove
    if(checkKoOrSuicide(move,game)){
    game.push(move)
    CheckBoard(move)
    updateBoard(move);
    }
}

checkKoOrSuicide(move,Game){
    last move = game[game.length -1]

    if(move != pass){
        if(move ===KoCheck[0]){
            alert("illegal Ko move")
            return false;
        }
    }
    if(game.length%2 === 1){
        color = black;
    }
    else{
       color = white;
    }
   group = creategroup(move, color);
        if(checklife(right),
        if(!checklife){
            alert("illegal Suicide move")
            return false;
        }
        return true;

}
CheckBoard (){
    if(previous board)

    Groups to Check[]
    checked stones[]

    For(eachcoordinate){

        if(coordinate is empty){
        do nothing;
     }
     else if(coordinate is in checked stones){
        }
        else{
            var i = creategroup(coordinate);
            groupstocheck.push(i);
            checkedstones.push(i);
        

         }
    }
    For(eachgroup){
       if(!checklife(groupstocheck[i]){
           if(groupstocheck[i].length === 1){
               KoCheck = groupstocheck[i];
           }
           deletegroup(groupstocheck[i]);
       }

    }
}

IfInCheckedStones(checkedstones, coordinate){
    for(var i, i < checkedstones.length,i++){
        for(var j, j < checkedstones[i].length, j++){
            if(checkedstones[i][j] === coordinate){
                return true;
            }
        }
    }
    return false;
}

deletegroup(group){
    for eachcoordinate{
        change to empty space;
    }
}


CheckLife(group){
    boolean = false;
    for(eachcoordinate){
        CheckUp{
            if(emptyspace){
                boolean = true
            }
        }
        CheckRight{
            if(emptyspace){
                boolean = true
            }
        }
        CheckLeft{
            if(emptyspace){
                boolean = true
            }
        }
        CheckDown{
            if(emptyspace){
                boolean = true
            }
        }
    }
    return boolean;
}

    creategroup(Coordinate, color, group)
    {
        if group is undefined group = {coordinate}

        CheckRight{
            getEastneighbors 
            if(friendlystone and is not in group)
                group = creategroup(newCoordinate, group)
             }
        CheckUp{
            getNorthneighbors
             if(friendlystone and is not in group)
             group = creategroup(newCoordinate, group)
             }   
        Checkleft(){
            getWestneighbors
                 if(friendlystone and is not in group)
                group = creategroup(newCoordinate, group)
                }
        checkDown(){
            getSouthneighbors
                  if(friendlystone and is not in group)
                 group = creategroup(newCoordinate, group)
                    }
            }
        }
        for(EachCoordinate in group){
            For(eachcoordinate in group){
                If(coordinate1 === Coordinate2)
                    delete{coordinate2}
            }
        }
        return group;
    }