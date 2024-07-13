let pauseList = ["PlaceHolder: pauseList"];
let menuList = ["PlaceHolder: menuList"];
let selection = 0;
let partyIndex = 0;
let selectingSpell = false;
let selectingItem = false;
let selectedItemIndex = 0;

function LoadPause(){
    selection = 0;
    pauseList = ["Resume", "Party"];
    //pauseList.push(Player);
    pauseList.push("Inventory");
    // for (i = 0; i < PartyList.length; i++){
    //     pauseList.push(PartyList[i]);
    // }
    //pauseList.push("Restart");
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
    if (selectingItem == true && selectingTarget == false){
        let curMass = 0;
        let curVolume = 0;
        for (i=0; i<Player.inventory.length; i++){
            curMass += Player.inventory[i].Mass;
            curVolume += Player.inventory[i].Volume;
        }
        menuText += ("Mass: " + curMass + "g / " + Player.MaxMass + "g\n");
        menuText += ("Volume: " + curVolume + "cm³ / " + Player.MaxVolume + "cm³\n-------------\n")
    }
    if (selectingSpell == true){
        menuText += "Spells:\n-------------\n"
    }
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
    
    //Write spell/item descriptions in "dialog box"
    if (menuList[selection] == MonStatusSpell){
        dialogObj.write("");
        if (partyIndex >= 0){
            dialogObj.write(getStatusText(PartyList[partyIndex]));
        }
        else {
            dialogObj.write(getStatusText(Player));
        }
    }
    else if (selectingSpell || (selectingItem && selectingTarget == false)){
        dialogObj.write("");
        dialogObj.write(menuList[selection].Description);
    }
    else if (selectingTarget == true){
        dialogObj.write("");
        dialogObj.write(getStatusText(menuList[selection]));
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
                if (partyIndex >= 0){
                    menuList[selection].Cast(PartyList[partyIndex], PartyList[partyIndex].Target);
                }
                else {
                    menList[selection].Cast(Player,Player.Target);
                }
                //break;
            }
            else if (selectingItem == true && Player.inventory.length > 0){
                if (selectingTarget == false){
                    selectedItemIndex = selection;
                    menuList = [];
                    menuList.push(Player);
                    for (i=0; i < PartyList.length; i++){
                        menuList.push(PartyList[i]);
                    }
                    selection = 0;
                    selectingTarget = true;
                }
                else {
                    dialogObj.write("");
                    let usedItem = Player.inventory[selectedItemIndex].use(menuList[selection]);
                    if (usedItem){
                        Player.inventory.splice(selectedItemIndex,1);
                    }
                    selectingItem = false;
                    selectingTarget = false;
                    selection = 0;
                    changeState("map");
                }
                //break;
            }
            else {
                switch (menuList[selection]){
                    case "Resume": //Closes Pause Menu and returns to game.
                        changeState("map");
                        break;
                    case "Party":
                        menuList = [Player];
                        for (i=0; i < PartyList.length; i++){
                            menuList.push(PartyList[i]);
                        }
                        selection = 0;
                        selectingTarget = true;
                        break;
                    case Player:
                        menuList = [...Player.Spells];
                        if (menuList.length <= 0){
                            menuList = ["Empty <"];
                        }
                        //menuList.splice(0,0,MonStatusSpell);
                        selectingSpell = true;
                        partyIndex = -1;
                        selection = 0;
                        break;
                    case PartyList[0]: //The First Monster in your Party, this item opens the monster Status and Spells Menue
                        menuList = [...PartyList[0].Spells];
                        if (menuList.length <= 0){
                            menuList = ["Empty <"];
                        }
                        //menuList.splice(0,0,MonStatusSpell);
                        selectingSpell = true;
                        partyIndex = 0;
                        selection = 0;
                        break;
                    case PartyList[1]: //The Second Monster in your Party, this item opens the monster Status and Spells Menue
                        menuList = [...PartyList[1].Spells];
                        if (menuList.length <= 0){
                            menuList = ["Empty <"];
                        }
                        //menuList.splice(0,0,MonStatusSpell);
                        selectingSpell = true;
                        partyIndex = 1;
                        selection = 0;
                        break;
                    case "Inventory":
                        selectingItem = true;
                        if (Player.inventory.length > 0){
                            menuList = [];
                            for (i=0; i < Player.inventory.length; i++){
                                menuList.push(Player.inventory[i]);
                            }
                        }
                        else {
                            menuList = ["Empty <"];
                        }
                        selectedItemIndex = 0;
                        selection = 0;
                        break;
                    case "Restart": //Refreshes the Page, (Currently No Save Data to worry about.)
                        location.reload();
                        break;
                }
                // if (gameState == "pause"){
                //     drawPauseMenu();
                // }
            }
            if (gameState == "pause"){
                drawPauseMenu();
            }
            break;

        //Go Back!
        case "B":

            if (selectingSpell == true){
                selectingSpell = false;
                selectingTarget = true;
                menuList = [Player];
                for (i=0; i<PartyList.length; i++){
                    menuList.push(PartyList[i]);
                }
                // if (partyIndex == -1){
                //     selection = 1;
                // }
                // else{
                //     selection = partyIndex+1;
                // }
                selection = partyIndex+1;
                drawPauseMenu();
            }
            else if (selectingItem == true && selectingTarget == false){
                selectingItem = false;
                menuList = pauseList;
                selection = 2;
                drawPauseMenu();
            }
            else if (selectingItem == true && selectingTarget == true){
                selectingTarget = false;
                menuList = [];
                for (i=0; i < Player.inventory.length; i++){
                    menuList.push(Player.inventory[i]);
                }
                drawPauseMenu();
            }
            else if (selectingItem == false && selectingTarget == true){
                selectingTarget = false;
                menuList = pauseList;
                selection = 1;
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