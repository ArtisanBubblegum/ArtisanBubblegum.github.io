// Main Variables
gameState = "map" //Map, Battle, Pause
//noValidTarget = {};

function LoadGame(){
    MapObj.drawMap();
    LoadParty();
    LoadPause();
}
LoadGame();

//Common Variables
// var menuList = [];
// var selection = 0;
// var selectingSpell = false;
// var pauseList = ["Resume", PartyList[0], PartyList[1], "Restart"]
// var partyIndex = 0;

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
        //drawPauseMenu();
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
            //drawStatus();
            //undrawStatus();
            break;
        case "battle":
            //menuList = battleList;
            //MapObj.undrawMap();
            drawBattle();
            break;
        case "pause":
            //menuList = pauseList;
            LoadPause();
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

function numToAlpha(num){
    let text = "";
    while (num != 0){
        while (num > 10){
            num *= 0.1;
        }
        switch (Math.floor(num)){
            case 1:
                text += "A";
            break;
            case 2:
                text += "B";
            break;
            case 3:
                text += "C";
            break;
            case 4:
                text += "D";
            break;
            case 5:
                text += "E";
            break;
            case 6:
                text += "F";
            break;
            case 7:
                text += "G";
            break;
            case 8:
                text += "H";
            break;
            case 9:
                text += "I";
            break;
        }
        num -= Math.floor(num);
        while (num < 0 && num !=0){
            num *= 10;
        }
    }
    return text;
}