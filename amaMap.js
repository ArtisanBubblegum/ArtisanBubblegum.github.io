let MapObj = {
    Map : [[5,5],
        [1,0], [1,0], [1,0], [1,0], [1,0], 
        [1,0], [0,0], [0,0], [0,0], [1,0], 
        [1,0], [0,0], [0,0], [0,0], [1,0], 
        [1,0], [0,0], [0,0], [0,0], [1,0], 
        [1,0], [1,0], [1,0], [1,0], [1,0], 
            ],
    PlayerPosition : [3, 3],

    mapMaker(x, y){
        if (x < 5) { x = 5;}
        if (x > 65) {x = 65;}
        if (y < 5) { y = 5;}
        if (y > 50) {y = 50;}
        this.Map = [];
        this.Map.push([x,y]);
        let mapSize = x*y;
        let curIndex = 1;
        let previousTile = 1;
        while (curIndex <= mapSize){
            if (curIndex <= x || curIndex % x == 0 || (curIndex-1) % x == 0 || curIndex > mapSize-x){
                //Generate Walls on Boarder of Map.
                this.Map.push([1,0]);
            }
            else{
                if (previousTile==0 && this.indexToLocation(curIndex)!=this.locationToIndex(this.PlayerPosition)){
                    if (random3() > 0.5){
                        this.Map.push([1,0]);
                        previousTile = 3;
                    }
                    else{
                        this.Map.push([0,0]);
                    }
                }
                else{
                    this.Map.push([0,0])
                    previousTile -= 1;
                }
            }
            curIndex++;
        }
        return this.Map;
    },
    locationToIndex(location){
        if(typeof location != "object") {alert("can't pass a number to locationToIndex")};
        let index = location[1]*this.Map[0][0]; //location[Y] * map[Width] "+Y=South, -Y=North"
        index -= this.Map[0][0]; //-map[width]
        index += location[0]; // +location[X] "+X=East, -Y=West"  
        return index;
    },
    indexToLocation(index){
        if(typeof index != "number") {alert("can't pass an object to indexToLocation")};
        let location = [0,1]
        while (index > this.Map[0][0]){
            index -= this.Map[0][0];
            location[1] += 1;
        }
        location[0] = index;
        return location;
    },
    GetMapID (location){
        let mapIndex;
        if (typeof location == "object"){
            mapIndex = this.locationToIndex(location);
        }
        else {
            mapIndex = location;
        }
        if ( mapIndex>0 && mapIndex<this.Map.length ){
            return this.Map[mapIndex];
        }
        else {
            console.log("Invalid Map Index: ", mapIndex);
            console.log(typeof mapIndex[0])
            return 'oh no aaaaa'//false;
        };
    },
    spawnMonster (quantity){
        let curIndex = 1;
        let spawnLocations = []; //list of locations that are open
        while (curIndex < this.Map.length){
            switch(this.GetMapID(curIndex)[0]){
                case 0:
                    if (this.Map[curIndex]!=this.locationToIndex(this.PlayerPosition)){
                        spawnLocations.push(curIndex);    
                    }
                    break;
            }
            curIndex++;
        }
        let spawnIndex = 0;
        let mapIndex = 0;
        while (quantity > 0){
            spawnIndex = Math.floor(Math.random()*spawnLocations.length);
            mapIndex = spawnLocations[spawnIndex];
            this.Map[mapIndex] = ["M", "-"];
            spawnLocations.splice(spawnIndex, 1);
            quantity--;
        }
    },
    drawMap (){
        let mapText = "";
        let curIndex = 1;
        let playerIndex = this.locationToIndex(this.PlayerPosition)
        while (curIndex < this.Map.length){
            mapText += "["
            if ( curIndex == playerIndex){
                mapText += " P ";
            }
            else if (this.GetMapID(curIndex)[0] == 1){
                mapText += "|||"
            }
            else if (this.GetMapID(curIndex)[0] == 0){
                mapText += "     "
            }
            else if (this.GetMapID(curIndex)[0] == "M"){
                mapText += " M "
            }
            else {
                mapText += this.GetMapID(curIndex);
            }
            mapText += "] "
            if (curIndex % this.Map[0][0] == 0){
                mapText += "\r\n";
            }
            curIndex++;
        }
        document.getElementById("MapCanvas").textContent = mapText;
        return mapText;
    },
    Step(dir){
        if (dir[1] == "A"){
            changeState("pause");
            return null;
        }
        
        let location = [this.PlayerPosition[0]+dir[0] , this.PlayerPosition[1]+dir[1]];
        switch(this.GetMapID(location)[0]){
            case 0:
                this.PlayerPosition[0] += dir[0];
                this.PlayerPosition[1] += dir[1];
                if (Ally1.BattleStats.MPCur < Math.floor(Math.random()*(Ally1.BattleStats.MPMax+1))){
                    Ally1.BattleStats.MPCur += 1;
                }
                console.log("Moved to ", this.PlayerPosition);
                drawStatus();
                break;
            case "M":
                console.log("Fight Monster.");
                this.Map[this.locationToIndex(location)]=[0,0];
                this.spawnMonster(1);
                alert("A Wild Monster Attacks!");
                newEnemy();
            default:
                console.log("Stopped at ", this.PlayerPosition);
                break;
        }
    }
}
