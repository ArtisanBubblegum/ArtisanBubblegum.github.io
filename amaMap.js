ranchMap = {
    Name : "ranchMap",
    Map : [[5,5],
        [1,0], [1,0], ["D1",0], [1,0], [1,0], 
        [1,0], [0,0], [0,0], ["H",0], [1,0], 
        [1,0], [0,0], [0,0], [0,0], [1,0], 
        [1,0], [0,0], [0,0], [0,0], [1,0], 
        [1,0], [1,0], [1,0], [1,0], [1,0], 
            ],
    MapLevel : 0,
    PlayerPosition : [3, 3]
}

cityMap = {
    Name : "cityMap",
    Map : [[7,6],
        [1,0], [1,0], [1,0], [ranchMap,0], [1,0], [1,0], [1,0],
        [1,0], [0,0], [0,0], [0,0], [0,0], [0,0], [1,0],
        [1,0], [0,0], [0,0], [0,0], [0,0], [0,0], [1,0],
        [1,0], [0,0], [0,0], [0,0], [0,0], [0,0], [1,0],
        [1,0], [1,0], [1,0], [1,0], [1,0], [1,0], [1,0],
        [1,0],["Pla"], ["ce"], [" H"], ["old"], ["er"], [1,0],
            ],
    MapLevel : 0,
    PlayerPosition : [4, 2]
}

ranchMap.Map[23][0] = cityMap;

let MapObj = {
    Name : ranchMap.Name,
    Map : ranchMap.Map,
    MapLevel : 0,
    PlayerPosition : ranchMap.PlayerPosition,
    ViewRange : 3,

    mapMaker(x, y){
        if (x < 5) { x = 5;}
        if (x > 65) {x = 65;}
        if (y < 5) { y = 5;}
        if (y > 50) {y = 50;}
        this.Map = [];
        this.Map.push([x,y]);
        this.PlayerPosition = [Math.floor(this.Map[0][0]/2),Math.floor(this.Map[0][1]/2)]
        this.PlayerPosition[1] = y-1;
        let mapSize = x*y;
        let curIndex = 1;
        let previousTile = 1;
        let wallChance = 0.5;
        while (curIndex <= mapSize){
            if (curIndex <= x || curIndex % x == 0 || (curIndex-1) % x == 0 || curIndex > mapSize-x){
                //Generate Walls on Boarder of Map.
                if (this.indexToLocation(curIndex)[0] == this.PlayerPosition[0] && curIndex > x){
                    if (this.MapLevel == 1){
                        this.Map.push([ranchMap,0])   
                    }    
                    else {
                        this.Map.push(["D2",0])
                    }
                }
                else if (this.indexToLocation(curIndex)[0] == this.PlayerPosition[0] && curIndex <= x){
                    this.Map.push(["D1",0])
                }
                else {
                    this.Map.push([1,0]);
                }
            }
            else{
                if (curIndex!=this.locationToIndex(this.PlayerPosition)){
                    if (random3() < wallChance && this.indexToLocation(curIndex)[0] != this.PlayerPosition[0]){
                        this.Map.push([1,0]);
                        wallChance *= 0.5;
                    }
                    else{
                        this.Map.push([0,0]);
                        wallChance *= 1.1;
                    }
                }
                else{
                    this.Map.push([0,0])
                }
            }
            
            curIndex++;
        }
        return this.Map;
    },
    locationToIndex(location){
        if(typeof location != "object") {
            alert("can't pass a number to locationToIndex")
            return null;
        }
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
                    if (curIndex!=this.locationToIndex(this.PlayerPosition)){
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
    spawnItem (quantity, items){
        let curIndex = 1;
        let spawnLocations = []; //list of locations that are open
        while (curIndex < this.Map.length){
            switch(this.GetMapID(curIndex)[0]){
                case 0:
                    if (curIndex!=this.locationToIndex(this.PlayerPosition)){
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
            this.Map[mapIndex] = ["item", items[Math.floor(Math.random()*items.length)]];
            spawnLocations.splice(spawnIndex, 1);
            quantity--;
        }
    },
    drawMap (){
        let mapText = "";
        let curIndex = 1;
        let playerIndex = this.locationToIndex(this.PlayerPosition)
        if (this.PlayerPosition[1] < this.ViewRange + 1){
            count = this.ViewRange - this.PlayerPosition[1] + 1;
            while (count > 0){
                mapText += "\r\n";
                count--;
            }
        }
        
        while (curIndex < this.Map.length){
            xDistance = (this.indexToLocation(curIndex)[0] - this.PlayerPosition[0]);
            xDistanceAbs = Math.abs(xDistance);
            yDistanceAbs = Math.abs((this.indexToLocation(curIndex)[1] - this.PlayerPosition[1]));
            
            if (xDistanceAbs <= this.ViewRange && yDistanceAbs <= this.ViewRange){
                if (this.PlayerPosition[0] < this.ViewRange + 1 && (curIndex == 1 || (curIndex-1) % this.Map[0][0] == 0) ){
                    count = this.ViewRange - this.PlayerPosition[0] + 1;
                    while (count > 0){
                        mapText += "        ";
                        count--;
                    }
                }
                
                if ( curIndex == playerIndex){
                    mapText += "[ P ]";
                }
                else if (this.GetMapID(curIndex)[0] == 1){
                    mapText += "[|||]";
                }
                else if (this.GetMapID(curIndex)[0] == 0){
                    mapText += "        ";
                }
                else if (this.GetMapID(curIndex)[0] == "M"){
                    mapText += "[ M ]";
                }
                else if (this.GetMapID(curIndex)[0] == "item"){
                    mapText += "[ $ ]"
                }
                else if (this.GetMapID(curIndex)[0] == "H"){
                    mapText += "<H>"
                }
                else if (this.GetMapID(curIndex)[0] == "D1" || this.GetMapID(curIndex)[0] == "D2"){
                    mapText += "[ D ]";
                }
                else if (typeof(this.GetMapID(curIndex)[0]) == "object"){
                    if (this.Name == "dungeon"){
                        mapText += "[ E ]"
                    }
                    else {
                        mapText += "[     ]"
                    }
                }
                else {
                    mapText += this.GetMapID(curIndex);
                }
                //mapText += "] "
                if (curIndex % this.Map[0][0] == 0 || xDistance == this.ViewRange){
                    count = this.Map[0][0] - this.ViewRange;
                    count = this.PlayerPosition[0] - count;
                    while (count > 0){
                        mapText += "        ";
                        count--;
                    }
                    mapText += "\r\n";
                }
            }
            curIndex++;
        }
        if (this.PlayerPosition[1] > this.Map[0][1] - this.ViewRange){
            count = this.Map[0][1] - this.ViewRange;
            count = this.PlayerPosition[1] - count;
            while (count > 0){
                mapText += "\r\n";
                count--;
            }
        }
        document.getElementById("MapCanvas").textContent = mapText;
        return mapText;
    },
    undrawMap (){
        document.getElementById("MapCanvas").textContent = "";
        return "";
    },
    Step(dir){
        if (dir[1] == "A"){
            changeState("pause");
            return null;
        }
        
        let location = [this.PlayerPosition[0]+dir[0] , this.PlayerPosition[1]+dir[1]];
        if (typeof(this.GetMapID(location)[0]) == "object"){
            locObject = this.GetMapID(location)[0];
            this.Name = locObject.Name;
            this.Map = locObject.Map;
            this.MapLevel = locObject.MapLevel;
            this.PlayerPosition = locObject.PlayerPosition;
            //this.PlayerPosition = [locObject.PlayerPosition[0],locObject.PlayerPosition[1]];
        }
        else {
            if (gameState == "map"){
                dialogObj.write("");    
            }
            switch(this.GetMapID(location)[0]){
                case 0:
                    this.PlayerPosition[0] += dir[0];
                    this.PlayerPosition[1] += dir[1];
                    for (i = 0; i < PartyList.length; i++){
                        if (PartyList[i].BattleStats.MPCur < Math.floor(Math.random()*(PartyList[i].BattleStats.MPMax+1))){
                            PartyList[i].BattleStats.MPCur += 1;
                        }    
                    }
                    if (Math.floor(Math.random() * 10)+1 == 1){
                        for (i = 0; i < PartyList.length; i++){
                            if (PartyList[i].BattleStats.HPCur > 0){
                                PartyList[i].addAge(1);
                            }
                        }
                        Player.addAge(1);
                    }
                    console.log("Moved to ", this.PlayerPosition);
                    //undrawStatus();
                    break;
                case "M":
                    console.log("Fight Monster.");
                    this.Map[this.locationToIndex(location)]=[0,0];
                    this.spawnMonster(1);
                    dialogObj.write("A Wild Monster Attacks!");
                    //changeState("battle"); This is done in newEnemy();
                    newEnemy();
                    break;
                case "item":
                    let result = Player.addItem(this.GetMapID(location)[1]);
                    if (result == true){
                        this.Map[this.locationToIndex(location)]=[0,0];
                    }
                    else {
                        alert("OH NO");
                    }
                    break;
                case "H":
                    if (Player.BattleStats.HPCur > 0){
                        Player.BattleStats.HPCur = Player.BattleStats.HPMax;
                        Player.BattleStats.MPCur = Player.BattleStats.MPMax;
                        dialogObj.write(Player.Name + " is fully healed!");
                    }  
                    else {
                        Player.reset();
                        dialogObj.write(Player.Name + " is reborn!");
                    }

                    for (i = 0; i < PartyList.length; i++){
                        if (PartyList[i].BattleStats.HPCur > 0){
                            PartyList[i].BattleStats.HPCur = PartyList[i].BattleStats.HPMax;
                            PartyList[i].BattleStats.MPCur = PartyList[i].BattleStats.MPMax;
                            dialogObj.write(PartyList[i].Name + " is fully healed!");
                        }  
                        else {
                            PartyList[i].reset();
                            dialogObj.write(PartyList[i].Name + " is reborn!");
                        }  
                    }
                    break;
                case "D1" :
                    this.Name = "dungeon";
                    this.MapLevel += 1;
                    this.mapMaker(13,13);
                    this.spawnMonster(20);
                    let items = [];
                    for (i=0; i<100; i++){
                        if (i < 45){
                            items.push(HealingPotion);
                        }
                        else if (i < 90){
                            items.push(MagicEnergyPotion);
                        }
                        else {
                            items.push(RebirthCyrstal);
                        }
                    }
                    this.spawnItem(Math.floor((Math.random()*3) + 1), items);
                    break
                case "D2" :
                    this.MapLevel -= 1;
                    this.mapMaker(13,13);
                    this.PlayerPosition[1] = 2;
                    this.spawnMonster(20);
                    items = [];
                    for (i=0; i<100; i++){
                        if (i < 45){
                            items.push(HealingPotion);
                        }
                        else if (i < 90){
                            items.push(MagicEnergyPotion);
                        }
                        else {
                            items.push(RebirthCyrstal);
                        }
                    }
                    this.spawnItem(Math.floor((Math.random()*3) + 1), items);
                    break;
                default:
                    console.log("Stopped at ", this.PlayerPosition);
                    break;
            }
        }
    }
}