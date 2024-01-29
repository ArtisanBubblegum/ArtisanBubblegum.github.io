gameState = "map" //Map, Battle, Pause

function LoadGame(){
    MapObj.Map = MapObj.mapMaker(7, 7)
    MapObj.spawnMonster(3);
    MapObj.drawMap();
}
LoadGame()

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
//while(true){
    //setTimeout(MainLoop(), 1000/30);
//    MainLoop();
//}

function MapLoop(input){
    MapObj.TryToMove(checkInput(input));
    MapObj.drawMap();
}

function BattleLoop(input){
    if (BattleCommands(checkInput(input))){
        OrderMonstersBySpeed();
        BattleTurns();
    }
    drawBattle();
}

function PauseLoop(input){

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
            drawMap();
            break;
        case "battle":
            drawBattle();
            break;
        case "pause":
            break;
    }
}

function random3 (){
    return (Math.random()+Math.random()+Math.random())/3;
}