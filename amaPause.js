// let selection = 0;
// let selectingSpell = false;
let pauseList = ["Resume", Ally1, "Restart"]
menuList = pauseList;

function drawPauseMenu(){
    let menuText = "";
    for (menuIndex = 0; menuIndex<menuList.length; menuIndex += 1){
        if (menuIndex == selection){
            menuText += "> ";
        }
        else {
            menuText += "- "
        }
        menuText += objectToString(menuList[menuIndex]);
        menuText += "\n"
    }
    document.getElementById("MapCanvas").textContent = menuText;
    //document.getElementById("MapCanvas").textContent = "--- Paused! ---";
    drawStatus();
}

function PauseMenuInputHandler(input){
    switch(input[1]){
        case 1:
            selection++;
            if (selection >= menuList.length){
                selection = 0;
            }
            break;
        case -1:
            selection--;
            if (selection < 0){
                selection = menuList.length -1;
            }
            break;
        case "A":
            if (selectingSpell){
                menuList[selection].Cast(Ally1, Ally1.Target);
                break
            }
            switch (menuList[selection]){
                case "Resume":
                    changeState("map");
                    break;
                case Ally1:
                    menuList = Ally1.Spells;
                    selectingSpell = true;
                    selection = 0;
                    break;
                case "Restart":
                    location.reload();
                    break;
            }
            break;
        case "B":
            if (menuList == Ally1.Spells){
                selectingSpell = false;
                menuList = pauseList;
                selection = 0;
            }
            else if (menuList == pauseList){
                selection = 0;
                changeState("map");
            }
            break;
    }
    //drawPauseMenu();
}