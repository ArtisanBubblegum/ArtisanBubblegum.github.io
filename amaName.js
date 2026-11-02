var AlphabetList = [	"Ａ",	"Ｂ",	"Ｃ",	"Ｄ",	"Ｅ",	"Ｆ",	"Ｇ",	"Ｈ",
								"Ｉ",	"Ｊ",	"Ｋ",	"Ｌ",	"Ｍ",	"Ｎ",	"Ｏ",	"Ｐ",
								"Ｑ",	"Ｒ",	"Ｓ",	"Ｔ",	"Ｕ",	"Ｖ",	"Ｗ",	"Ｘ",
								"Ｙ",	"Ｚ",	"．",	"？",	"！",		"　",		"　",		"　",
								"↑",	"←",	"✓",	"　",		"　",		"　",		"　",		"　"];
var alphaWidth = 8;
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
            selection -= alphaWidth;
            if (selection < 0 && selection > -6){
                selection += alphaWidth*4;
            }
            else if (selection <= -6){
                selection += alphaWidth*5;
            }
            break;
        case 1:
            selection += alphaWidth;
            if (selection >= 35 && selection <= 39){
                selection = 34;
            }
            else if (selection >= 40){
                selection -= alphaWidth*5;
            }
            break;
        case 0:
            switch(input[0]){
                case -1:
                    selection -= 1;
                    if (selection == -1 || selection == alphaWidth-1 || selection == (alphaWidth*2)-1 || selection == (alphaWidth*3)-1){
                        selection += alphaWidth;
                    }
                    else if (selection == 31){
                        selection = 34
                    }
                    break;
                case 1:
                    selection += 1;
                    if (selection == alphaWidth || selection == alphaWidth*2 || selection == alphaWidth*3 || selection == alphaWidth*4){
                        selection -= 8;
                    }
                    else if (selection == 35){
                        selection = 32;
                    }
                    break;
            }
            break;
        case "A":
            switch(AlphabetList[selection]){
                case "✓": //Done
                    if (newName == ""){
                        newName = "Player001";
                    }
                    return true;
                    break;
                case "←": //Backspace
                    newName = newName.slice(0,-1);
                    break;
                case "↑": //Shift
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
					if (newName.length+1 > 8) { //Keep the name legnth maxed at 8 Characters
						newName = newName.slice(1,8);
					}
					if (selection >= 0 && selection <= 28) {  // 28 is the final character before the " "'s and Buttons
						newName += String.fromCharCode(AlphabetList[selection].charCodeAt(0) - 65248); //Convert the Full Width Characters to Half Width.
					}
					else if (selection > 28 && selection <= 31){
						newName += " ";
					}
                    else {
						newName += AlphabetList[selection];
                    }
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
    for (i = 0; i < AlphabetList.length-5; i++){
        if (selection == i){
            text += ">";
        }
        else {
            text += "[";
        }
        text += AlphabetList[i];
        if (selection == i){
            text += "<";
        }
        else {
            text += "]";
        }
        if(i == 7 || i == 15 || i == 23 || i == 31){
            text += "\n";
        }
    }
    text += " 　  　  　  　  　 \n\n";
    text += "Controls:\n WASD/Arrows = Navigate\n J/Enter = A/Pause/Select\n K/Space = B/Back/Cancel"
    document.getElementById("MapCanvas").textContent = text;

    document.getElementById("DialogCanvas").textContent = header + name;
    if (name.length < 8) {
		let count = 8 - name.length;
		while ( count > 0 ) {
			document.getElementById("DialogCanvas").textContent += "_";
			count --;
		}
	}
	
}
