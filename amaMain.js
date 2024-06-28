gameState = "map" //Map, Battle, Pause
noValidTarget = {};

function LoadGame(){
    //MapObj.Map = farmMap.Map;
    //MapObj.PlayerPosition = farmMap.PlayerPosition;
    //MapObj.spawnMonster(1);
    //MapObj.Door1 = farmMap.Door1;
    //MapObj.Map = MapObj.mapMaker(30, 30)
    //MapObj.spawnMonster(100);
    MapObj.drawMap();
    Ally1.populate(Giant_Rat);
    drawStatus();
}
LoadGame();

function MainLoop(input){
    switch(gameState){
        case "map":
            MapLoop(input);
            break;
        case "battle":
            BattleLoop(input);
            break;
        case "pause":
            PauseLoop(input);
            break;
    }
}

function MapLoop(input){
    MapObj.Step(checkInput(input));
    if (gameState == "map"){
        MapObj.drawMap();
    }
}

function BattleLoop(input){
    if (BattleCommands(checkInput(input))){
        OrderMonstersBySpeed();
        BattleTurns();
    }
    if (gameState == "battle"){
        drawBattle();
    }
}

function PauseLoop(input){
    PauseMenuInputHandler(checkInput(input));
    if (gameState == "pause"){   
        drawPauseMenu();
    }
}

function checkInput(input){
    if (typeof input == "string"){
        alert("Invalid Input Type: String.")
        //This will eventually be used for other inputes.
        return;
    }
    else if (typeof input == "object"){
        if (typeof input[0] == "number"){
            //Direction
            //this.TryToMove(input);
            return input;
        }
        else {
            alert("Invalid Array Type: Object>Other.")
            return;
        }
    }
    else {
        alert("Invalid Input Type: Other.")
        return;
    }
}

function changeState(state){
    gameState = state;
    switch (gameState){
        case "map":
            MapObj.drawMap();
            drawStatus();
            break;
        case "battle":
            menuList = battleList;
            drawBattle();
            MapObj.undrawMap();
            break;
        case "pause":
            menuList = pauseList;
            drawPauseMenu();
            break;
    }
}

function random3 (){
    return (Math.random()+Math.random()+Math.random())/3;
}

function objectToString(thing) {
    if (typeof thing == "object"){
        return thing.Name;
    }
    return thing;
}
