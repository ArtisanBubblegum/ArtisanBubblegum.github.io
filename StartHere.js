let Player = {
    "Name" : "player one",
    "Class" : "None",
    "HP" : 100,
    "Atk" : 7,
    "Battle Stats" : {"ATK": 8, "DEF": 14, "MP" : 25},
    "Position" : [3,3],
    "InCombat" : false
}

function mapMaker(x, y){
    x = x * 1;
    y = y * 1;
    if (x < 5) { x = 5;}
    if (x > 65) {x = 65;}
    if (y < 5) { y = 5;}
    if (y > 50) {y = 50;}
    let map = [];
    map.push([x,y]);
    mapSize = x*y;
    curIndex = 1;
    while (curIndex <= mapSize){
        if (curIndex <= x || curIndex % x == 0 || (curIndex-1) % x == 0 || curIndex > mapSize-x){
            map.push([1,0]);
        }
        else{
            map.push([0,0]);
        }
        curIndex++;
    }
    return map;
}

let Map1 = mapMaker (7,7); //mapMaker(prompt("Horizontal Size of Map: ", 10),prompt("Vertical Size of Map: ", 10));
// var Map1Monsters = [Giant_Rat, Giant_Centipede, Carniverous_Canary];

let Map2 = [[5,5],
    [1,0], [1,0], [1,0], [1,0], [1,0],
    [1,0], [0,0], [0,0], [0,0], [1,0],
    [1,0], [0,0], [0,0], [0,0], [1,0],
    [1,0], [0,0], [0,0], [0,0], [1,0],
    [1,0], [1,0], [1,0], [1,0], [1,0],
];

function DrawMap (playerLocation, map){
    let mapText = "";
    let x = 1;
    let playerIndex = playerLocation[1]*map[0][0];
    playerIndex -= map[0][0];
    playerIndex += playerLocation[0];
    while (x < map.length){
        mapText += "["
        if ( x == playerIndex){
            mapText += "P, -";
        }
        else {
            mapText += GetMapID([x, 1], Map1);
        }
        mapText += "] "
        if (x % map[0][0] == 0){
            mapText += "\r\n";
            //mapText += "\n";
        }
        x++;
    }
    document.getElementById("MapCanvas").textContent = mapText;
    return mapText;
}

function GetMapID (location, map){
    let mapIndex = location[1]*map[0][0];
    mapIndex -= map[0][0];
    mapIndex += location[0];
    
    if (mapIndex>0 && mapIndex<map.length){
        return Map1[mapIndex];
    }
    else {
        console.log("Invalid Map Index: ", mapIndex);
        return false;
    }
}

//before start:
DrawMap(Player.Position, Map1);

//update:
function stepFunction(input){
    if (typeof input == "string"){
        alert("Invalid Input Type: String.")
        //This will eventually be used for other inputes.
        return;
    }
    else if (typeof input == "object"){
        if (typeof input[0] == "number"){
            //Direction
            TryToMove(input);
        }
        else {
            alert("Invalid Array Type: Other.")
            return;
        }
    }
    else {
        alert("Invalid Input Type: Other.")
        return;
    }

    DrawMap(Player.Position, Map1);
}

//sub-functions of update:
function TryToMove(dir){
    if (Player.InCombat == false){
        switch(GetMapID([Player.Position[0] + dir[0], Player.Position[1] + dir[1]], Map1)[0]){
            case 0:
                Player.Position[0] += dir[0];
                Player.Position[1] += dir[1];
                console.log("Moved to ", Player.Position);
                if (Math.floor(Math.random()*5) == 0){
                    Player.InCombat = true;
                    alert("A Wild Monster Attacks!")
                    newEnemy();
                    drawMon();
                }
                break;
            default:
                console.log("Stopped at ", Player.Position);
                break;
        }
    }
    else {
        alert("Player Can't move while in Combat!")
    }
}