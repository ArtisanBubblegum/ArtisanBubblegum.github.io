//selection = 0;
// let selectingSpell = false;
let pauseList = ["Resume", Ally1, "Restart"]
menuList = pauseList;

statusOfMon = {
    Name : "Status",
    Cast(user, target){
        console.log("Cannot Cast Status.");
    }
}

function drawPauseMenu(){
    let menuText = "";
    for (menuIndex = 0; menuIndex<menuList.length; menuIndex += 1){
        if (menuIndex == selection){
            menuText += "> ";
        }
        else {
            menuText += "- "
        }
        if (typeof(menuList[menuIndex]) == "object"){
            menuText += menuList[menuIndex].Name;
        }
        else {
            menuText += menuList[menuIndex];
        }
        menuText += "\n"
    }
    document.getElementById("MapCanvas").textContent = menuText;
    
    if (menuList[selection] == statusOfMon){
        document.getElementById("DialogCanvas").textContent = getStatusText();
    }
    else if (selectingSpell){
        document.getElementById("DialogCanvas").textContent = menuList[selection].Description;
    }
    else{
        dialogObj.write("");
    }
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
                    menuList = [...Ally1.Spells];
                    menuList.splice(0,0,statusOfMon);
                    selectingSpell = true;
                    selection = 0;
                    break;
                case "Restart":
                    location.reload();
                    break;
            }
            break;
        case "B":
            dialogObj.write("");
            //undrawStatus();
            if (selectingSpell == true){//menuList == Ally1.Spells){
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