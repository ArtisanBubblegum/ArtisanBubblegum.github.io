// Main Variables
gameState = "name" //Map, Battle, Pause, Name
var previousState = "map";

function LoadGame(){
    MapObj.drawMap();
    LoadPlayer();
    LoadParty();
    LoadPause();
    loadNameBoard("Your Name: ", Player);
    drawNameBoard("", "Your Name: ");
}
LoadGame();

addEventListener("keydown", (event) => {keyboardInput(event)});

function keyboardInput(keyName){
    keyName.preventDefault();
    //alert(keyName.code);
    switch (keyName.code){
        case "ArrowUp":
            MainLoop([0,-1]);
            break;
        case "ArrowDown":
            MainLoop([0,1]);
            break;
        case "ArrowLeft":
            MainLoop([-1,0]);
            break;
        case "ArrowRight":
            MainLoop([1,0]);
            break;
        case "Enter":
            MainLoop([0,'A']);
            break;
        case "Space":
            MainLoop([0,'B']);
            break;
        case "ShiftLeft":
        case "ShiftRight":
            if (gameState="name"){
                MainLoop([0, 'Shift']);
            }
            break;
    }
}

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
        case "name":
            NameLoop(input);
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

function NameLoop(input){
    if (nameInputeHandler(checkInput(input),nameBoardHeader)){
        ApplyNewName(nameTarget);
        changeState(previousState);
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
    previousState = gameState;
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