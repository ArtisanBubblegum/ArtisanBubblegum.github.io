let pauseList = ["PlaceHolder: pauseList"];
let menuList = ["PlaceHolder: menuList"];
let selection = 0;
let partyIndex = 0;
let selectingSpell = false;

function LoadPause(){
    pauseList = ["Resume", PartyList[0], PartyList[1], "Restart"];
    menuList = pauseList;
}

MonStatusSpell = {
    Name : "Status",
    Cast(user, target){
        console.log("Cannot Cast Status.");
    }
}

function drawPauseMenu(){
    let menuText = "";
    for (menuIndex = 0; menuIndex<menuList.length; menuIndex += 1){
        // Draw Cursor at Selection.
        if (menuIndex == selection){
            menuText += "> ";
        }
        else {
            menuText += "- "
        }

        // Draw menu item.
        if (typeof(menuList[menuIndex]) == "object"){
            menuText += menuList[menuIndex].Name;
        }
        else if (typeof(menuList[menuIndex]) == "string"){
            menuText += menuList[menuIndex];
        }
        else {
            menuText += "Invalid Menu Item: " + menuList[menuIndex];
        }

        //New Line
        menuText += "\n"
    }
    document.getElementById("MapCanvas").textContent = menuText;
    
    //Write spell descriptions in "dialog box"
    if (menuList[selection] == MonStatusSpell){
        dialogObj.write("");
        dialogObj.write(getStatusText(PartyList[partyIndex]));
    }
    else if (selectingSpell){
        dialogObj.write("");
        dialogObj.write(menuList[selection].Description);
    }
    else{
        dialogObj.write("");
    }
}

function PauseMenuInputHandler(input){
    switch(input[1]){
        //UP and Down
        case 1:
            selection++;
            if (selection >= menuList.length){
                selection = 0;
            }
            drawPauseMenu();
            break;
        case -1:
            selection--;
            if (selection < 0){
                selection = menuList.length -1;
            }
            drawPauseMenu();
            break;

        //Select Menu Item!
        case "A":
            if (selectingSpell){
                menuList[selection].Cast(PartyList[partyIndex], PartyList[partyIndex].Target);
                break;
            }
            else {
                switch (menuList[selection]){
                    case "Resume": //Closes Pause Menu and returns to game.
                        changeState("map");
                        break;
                    case PartyList[0]: //The First Monster in your Party, this item opens the monster Status and Spells Menue
                        menuList = [...PartyList[0].Spells];
                        menuList.splice(0,0,MonStatusSpell);
                        selectingSpell = true;
                        partyIndex = 0;
                        selection = 0;
                        break;
                    case PartyList[1]: //The Second Monster in your Party, this item opens the monster Status and Spells Menue
                        menuList = [...PartyList[1].Spells];
                        menuList.splice(0,0,MonStatusSpell);
                        selectingSpell = true;
                        partyIndex = 1;
                        selection = 0;
                        break;
                    case "Restart": //Refreshes the Page, (Currently No Save Data to worry about.)
                        location.reload();
                        break;
                }
                if (gameState == "pause"){
                    drawPauseMenu();
                }
                
            }
            break;

        //Go Back!
        case "B":

            if (selectingSpell == true){ //If we're in the spell menu, go back to the pause menu
                selectingSpell = false;
                menuList = pauseList;
                selection = partyIndex+1;
                drawPauseMenu();
            }
            else if (menuList == pauseList){ // if we're in the pause menu, return to the game
                selection = 0;
                changeState("map");
                dialogObj.write("");
            }

            break;
    }
}