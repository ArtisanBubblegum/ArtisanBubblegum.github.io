var AlphabetList = ["A","B","C","D","E","F","G","H","I","J",
                    "K","L","M","N","0","P","Q","R","S","T",
                    "U","V","W","X","Y","Z"," ",".","?","!",
                    "⇧","⌫","✓"," "," "," "];
var isCapped = true;
var newName = "";
var nameBoardHeader = "Your Name: "
var nameTarget = Player;

function loadNameBoard(header, target){
    newName = "";
    selection = 0;
    nameBoardHeader = header;
    nameTarget = target;
}

function ApplyNewName(monster){
    monster.Name = newName;
    newName = "";
}

function nameInputeHandler(input,header){
    switch(input[1]){
        case -1:
            selection -= 10;
            if (selection < 0 && selection > -8){
                selection += 30;
            }
            else if (selection <= -8){
                selection += 40;
            }
            break;
        case 1:
            selection += 10;
            if (selection > 32 && selection < 40){
                selection = 32;
            }
            else if (selection >= 40){
                selection -= 40;
            }
            break;
        case 0:
            switch(input[0]){
                case -1:
                    selection -= 1;
                    if (selection == -1 || selection == 9 || selection == 19){
                        selection += 10;
                    }
                    else if (selection == 29){
                        selection = 32
                    }
                    break;
                case 1:
                    selection += 1;
                    if (selection == 10 || selection == 20 || selection == 30){
                        selection -= 10;
                    }
                    else if (selection == 33){
                        selection = 30;
                    }
                    break;
            }
            break;
        case "A":
            switch(AlphabetList[selection]){
                case "✓":
                    if (newName == ""){
                        newName = "?name?";
                    }
                    return true;
                    break;
                case "⌫":
                    newName = newName.slice(0,-1);
                    break;
                case "⇧":
                    for (i=0;i < AlphabetList.length - 4; i++){
                        if (isCapped){
                            AlphabetList[i] = AlphabetList[i].toLowerCase();
                        }
                        else{
                            AlphabetList[i] = AlphabetList[i].toUpperCase();
                        }
                    }
                    if (isCapped){
                        isCapped = false;
                    }
                    else {
                        isCapped = true;
                    }
                    break;
                default:
                    newName += AlphabetList[selection];
                    break;
            }
            break;
        case "B":
            newName = newName.slice(0,-1);
            break;
        case "Shift":
            for (i=0;i < AlphabetList.length - 4; i++){
                        if (isCapped){
                            AlphabetList[i] = AlphabetList[i].toLowerCase();
                        }
                        else{
                            AlphabetList[i] = AlphabetList[i].toUpperCase();
                        }
                    }
                    if (isCapped){
                        isCapped = false;
                    }
                    else {
                        isCapped = true;
                    }
            break;
    }

    drawNameBoard(newName, header);
}

function drawNameBoard(name, header){
    text = "Enter " + header + "\n\n";
    for (i = 0; i < AlphabetList.length-3; i++){
        if (selection == i){
            text += "> ";
        }
        else {
            text += "[ ";
        }
        text += AlphabetList[i];
        if (selection == i){
            text += " <";
        }
        else {
            text += " ]";
        }
        if(i == 9 || i == 19 || i == 29){
            text += "\n";
        }
    }
    text += "                                             \n\n";
    text += "Controls:\n Arrow Keys = Navigate\n EnterKey = A/Pause/Select\n SpaceKey = B/Back/Cancel"
    document.getElementById("MapCanvas").textContent = text;

    document.getElementById("DialogCanvas").textContent = header + name;
}