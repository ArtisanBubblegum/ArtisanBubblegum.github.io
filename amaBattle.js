let AllyList = "Placeholder: AllyList";         //Populated in newEnemy()
let EnemyList = "Placeholder: EnemyList";       //Populated in newEnemy()

let monstersList = "PlaceHolder: monstersList"; //Populated in newEnemy()
let targetList = "Placeholder: targetList";     //Populated in newEnemy()

let battleList = ["Fight", "Commands", "Flee"];
let cmdList = ["Attack", "Defend", "Spells"];
let spellList = ["Placeholder: spellsList"];    //Populated as needed
let prevList = "Populated as Needed: PrevList"
//let menuList = battleList;    ---Already Exists in Pause Menu---
//let selection = 0;            ---Already Exists in Pause Menu---

let selectingAlly = false;                      
let selectedAlly = "";                          
//let selectingSpell = false;   ---Already Exists in Pause Menu---
let selectingTarget = false;                    

let turnReady = false;                          
let targetTurnValue = 100;                      
let allyAttacked = false;
let combatDone = false;
let fleeBonus = 0;

let fleeText = "";

function newEnemy(){ //Called in amaMap.js when Moving into a cell marked M.
    AllyList = [...PartyList];
    AllyList.splice(0,0,Player);
    menuList = battleList;
    selection = 0;
    selectingSpell = false;
    selectingAlly = false;
    selectingTarget = false;

    //Build the Battle Table
    let Canvas = document.getElementById("MapCanvas");
    Canvas.textContent = "";
    let BattleTable = document.createElement("table");
    BattleTable.setAttribute("id", "BattleTable");
    BattleTable.setAttribute("width", "100%");
    
    //Build Enemy Row under Battle Table
    let EnemyRow = document.createElement("tr");
    EnemyRow.setAttribute("id","EnemyRow");
    BattleTable.appendChild(EnemyRow);

    //Build Ally Row under Battle Table
    let AllyRow = document.createElement("tr");
    AllyRow.setAttribute("id","AllyRow");
    BattleTable.appendChild(AllyRow);

    //Place Battle Table under MapCanvas
    Canvas.appendChild(BattleTable);
    
    //Determine Number of Enemies
    if (MapObj.MapLevel == 1){
        enemyCount = 1;
    }
    else if (MapObj.MapLevel > 1 && MapObj.MapLevel <= 3){
        enemyCount = Math.floor(random3() * 3)+1;
    }
    else if (MapObj.MapLevel > 3){
        enemyCount = Math.floor(random3() * MapObj.MapLevel)+1;
    }
    
    //Reset lists
    EnemyList = [];
    monstersList = [];

    let CommandRow = document.createElement("tr");
    CommandRow.setAttribute("id","CommandRow");
    CommandRow.setAttribute("text-align","center");
    BattleTable.appendChild(CommandRow);
    let CommandCell = document.createElement("td");
    CommandCell.setAttribute("id","CommandCell");
    CommandCell.setAttribute("colspan",AllyList.length * enemyCount);
    CommandRow.appendChild(CommandCell);
    
    for (i = 0; i < enemyCount; i++){
        let EnemyCell = document.createElement("td");
        EnemyCell.setAttribute("id", "E"+i);
        EnemyCell.setAttribute("colspan", AllyList.length);
        EnemyRow.appendChild(EnemyCell);

        EnemyCell.textContent = "E"+i;

        EnemyList.push({...Enemy1});
        EnemyList[i].BattleStats = {...Enemy1.BattleStats};
        EnemyList[i].GrowthStats = {...Enemy1.GrowthStats};
        EnemyList[i].MagicCon = {...Enemy1.MagicCon};
        let SpecificMonster = wildMonsterList[Math.floor(Math.random()*wildMonsterList.length)];
        EnemyList[i].populate(SpecificMonster);
        if (enemyCount > 1){
            EnemyList[i].Name += " " + numToAlpha(i+1);
        }
        let enemyLevel = Math.floor( random3() * MapObj.MapLevel ) + 1;
        while (EnemyList[i].Level < enemyLevel){
            EnemyList[i].levelUP();
        }
        EnemyList[i].Target = AllyList[0];
        monstersList.push(EnemyList[i]);
        console.log(EnemyList[i].Name + " generated as Enemy.");
    }

    for (i = 0; i < AllyList.length; i++){
        let AllyCell = document.createElement("td");
        AllyCell.setAttribute("id", "A"+i);
        AllyCell.setAttribute("colspan", enemyCount);
        AllyRow.appendChild(AllyCell);

        AllyCell.textContent = "A"+i;

        if (AllyList[i] == Player){
            AllyList[i].Action = "skip";
        }
        else {
           AllyList[i].Action = "fight"; 
        }
        AllyList[i].Target = "noValidTarget";
        AllyList[i].BattleStats.TurnValue = 0;
        monstersList.push(AllyList[i]);
        console.log(AllyList[i].Name + " populated as Ally.");
    }

    targetList = monstersList;

    changeState("battle");
    drawBattle();
    
    if (Player.BattleStats.HPCur <= 0){
        OrderMonstersBySpeed();
        BattleTurns();
    }

    return;
}

function BattleCommands(input){ //Manages Menues and gates when Turn's are Exectuted by returning True
    
    fleeText = "";

    if (Player.BattleStats.HPCur <= 0){
        return true;
    }

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
            if (selectingTarget){
                dialogObj.write("");
                selectingTarget = false;
                selectedAlly.Target = menuList[selection];
                menuList = battleList;
                selection = 0;
                return true;
            }
            else if (selectingSpell){
                dialogObj.write("");
                selectingSpell = false;
                selectingTarget = true;
                selectedAlly.Action = menuList[selection];
                targetList = monstersList;
                menuList = targetList;
                selection = 0;

                prevList = spellList;

            }
            else if (selectingAlly){
                dialogObj.write("");
                selectingAlly = false;
                selectedAlly = menuList[selection];
                menuList = cmdList;
                selection = 0;
            }
            else {
                switch (menuList[selection]){
                    case "Fight":
                        Player.Action = "fight";
                        return true;
                    case "Defend":
                        dialogObj.write("");
                        selectedAlly.Action = menuList[selection].toLowerCase();
                        menuList = battleList;
                        selection = 0;
                        return true;
                    case "Commands":
                        menuList = AllyList;
                        selectingAlly = true;
                        selection = 0;
                        break;
                    case AllyList[0]:
                    case AllyList[1]:
                        alert("Error #0hn0, tell dev amaBattle.")
                        menuList = cmdList;
                        selectingAlly = false;
                        selection = 0;
                        break;
                    case "Attack":
                        targetList = monstersList;
                        menuList = targetList;
                        selectedAlly.Action = "attack";
                        selection = 0;
                        selectingTarget = true;
                        prevList = cmdList;
                        break;
                    case "Spells":
                        spellList = selectedAlly.Spells;
                        menuList = spellList;
                        selection = 0;
                        selectingSpell = true;
                        break;
                    case "Flee":
                        dialogObj.write("");
                        //for (i = 0; i < AllyList.length; i++){
                        //    AllyList[i].Action = "flee";
                        //}
                        AllyList[0].Action = "flee";
                        AllyList[1].Action = "flee";
                        selection = 0
                        if ( Math.random() < fleeBonus + ( AllyList[0].BattleStats.Speed/( EnemyList[0].BattleStats.Speed*2 ) ) ){
                            dialogObj.write("");
                            dialogObj.write("You and your party escape!")
                            fleeBonus = 0;
                            selectedAlly.Target = "noValidTarget";
                            changeState("map");
                        }
                        else {
                            //dialogObj.write("You and your party fail to escape!");
                            fleeText = "You and your party fail to escape!";
                            AllyList[0].Action = "skip"
                            AllyList[1].Action = "skip"
                            fleeBonus += 0.1;
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            break;
        case "B":
            if (menuList == cmdList){
                menuList = AllyList;
                selectingAlly = true;
                selection = 0;
            }
            else if (menuList == spellList){
                menuList = cmdList;
                selection = 0;
                selectingSpell = false;
                selectingTarget = false;
            }
            else if (menuList == targetList){
                menuList = prevList;
                if (prevList == spellList){
                    selectingSpell = true;
                }
                selectingTarget = false;
            }
            else if (menuList == AllyList){
                menuList = battleList;
                selectingAlly = false;
                selection = 0;
            }
            break;
    }
    drawBattle();
}

function OrderMonstersBySpeed(){
    monstersList.sort(function(a,b){return b.BattleStats.Speed-a.BattleStats.Speed});
}

function BattleTurns(){ //alled in BattleLoop in amaMain.js after OrderMonstersBySpeed
    OrderMonstersBySpeed();
    dialogObj.write(fleeText);
    allyAttacked = false;
    combatDone = false;

    while (allyAttacked == false && combatDone == false){
        for (index = 0; index<monstersList.length && combatDone == false; index++){
            if (monstersList[index].BattleStats.HPCur > 0){
            monstersList[index].BattleStats.TurnValue += monstersList[index].BattleStats.Speed;
            }

            if (monstersList[index].BattleStats.TurnValue >= targetTurnValue){
                monstersList[index].BattleStats.TurnValue -= targetTurnValue;
                console.log(monstersList[index].Name + " takes a turn.")

                if (monstersList[index] === Player && Player.BattleStats.HPCur > 0){
                    allyAttacked = true;
                }

                //Select Target
                if (typeof(monstersList[index].Target) != "object"){
                    if (monstersList[index].isWild){
                        monstersList[index].Target = AllyList[0];
                        for (i = 1; i < AllyList.length; i++){
                            if (AllyList[i].BattleStats.HPCur > 0
                                && (monstersList[index].Target.BattleStats.HPCur > AllyList[i].BattleStats.HPCur 
                                    || monstersList[index].Target.BattleStats.HPCur <= 0)
                            ){
                                monstersList[index].Target = AllyList[i];
                            }
                        }
                    }
                    else {
                        monstersList[index].Target = EnemyList[0];
                        for (i = 1; i < EnemyList.length; i++){
                            if (EnemyList[i].BattleStats.HPCur > 0
                                && (monstersList[index].Target.BattleStats.HPCur > EnemyList[i].BattleStats.HPCur 
                                    || monstersList[index].Target.BattleStats.HPCur <= 0)
                            ){
                                monstersList[index].Target = EnemyList[i];
                            }
                        }
                    }
                }
                
                //check active monster for Afflictions
                if (monstersList[index].BattleStats.Aflictions.length > 0){
                    for (item = monstersList[index].BattleStats.Aflictions.length - 1; item >= 0; item--){
                        switch (monstersList[index].BattleStats.Aflictions[item]){
                            case "Trip" :                               
                                if (Math.random() < 0.5 && monstersList[index].Action != "skip"){
                                    monstersList[index].Action = "skip";
                                    dialogObj.write(monstersList[index].Name + " trips and misses their turn.");
                                }
                                monstersList[index].BattleStats.Aflictions.splice(item, 1);
                                break;
                            default :
                                alert(monstersList[index].BattleStats.Aflictions[item] + " Doesn't exist.");
                                break;
                        }
                    }
                }

                //Check active monster's Action
                if (monstersList[index].Action == "fight"){
                    monstersList[index].Tactic.think(monstersList[index]);
                    if (monstersList[index].Action == "fight"){
                        alert("Error, Fialed to think.");
                    }
                }
                //perform active monster's Action
                switch (monstersList[index].Action){
                    case "attack":
                        TryAttack(monstersList[index], monstersList[index].Target)
                        monstersList[index].BattleStats.Defending = false;
                        break;
                    case "defend":
                        monstersList[index].BattleStats.Defending = true;
                        dialogObj.write(monstersList[index].Name + " takes a Defensive Stance!");
                        break;
                    case "flee":
                        console.log("flee successful, skipping check alive and order by speed.");
                    case "skip":
                        break;
                    default:
                        monstersList[index].Action.Cast(monstersList[index],monstersList[index].Target);
                        break;
                }

                //reset variables for active monster
                if (monstersList[index] == Player) {
                    monstersList[index].Action = "skip";
                }
                else {
                    monstersList[index].Action = "fight";
                }
                monstersList[index].Target = "noValidTarget";
                if (monstersList[index].Action != "flee"){ //Note: "flee" action is only when successful. When Failing to Flee, "skip" is the populated action.
                    checkAlive();
                    OrderMonstersBySpeed();
                }

            }
        }
    }
}

function checkAlive(){
    console.log("checking Alive.");
    let list = [];
    let AllyAliveCount = 0;
    let EnemyAliveCount = 0;
    for (i = 0; i < EnemyList.length; i++){
        if (EnemyList[i].BattleStats.HPCur > 0){
            list.push(EnemyList[i]);
            EnemyAliveCount += 1;
        }
        else if (EnemyList[i].Genus != "R.I.P."){
            dialogObj.write(EnemyList[i].Name + " Dies.");
            EnemyList[i].Genus = "R.I.P.";
        }
        console.log(EnemyList[i].Name + " HP: " + EnemyList[i].BattleStats.HPCur);
    }
    for (i = 0; i < AllyList.length; i++){
        if (AllyList[i].BattleStats.HPCur > 0){
            //check for Old Age
            if (EnemyAliveCount > 0){
                AllyList[i].addAge(0);   
            }
            else {
                AllyList[i].addAge(1);
            }
        }
        //check for HP again after Old Age
        if (AllyList[i].BattleStats.HPCur > 0){
            list.push(AllyList[i]);
            AllyAliveCount += 1;
        }
        else if (AllyList[i].Genus != "R.I.P."){
            dialogObj.write(AllyList[i].Name + " Dies.");
            AllyList[i].Genus = "R.I.P.";
        }
        console.log(AllyList[i].Name + " HP: " + AllyList[i].BattleStats.HPCur);
    }

    if (AllyAliveCount > 0 && EnemyAliveCount <= 0){
        //Win
        for (x = 0; x < AllyList.length; x++){
            if (AllyList[x].BattleStats.HPCur > 0){
                dialogObj.write("-");
                dialogObj.write(AllyList[x].Name + " has Survived the Battle!");
                
                let amount = 0;
                for (i = 0; i < EnemyList.length; i++){
                    if (AllyList[x] == Player){
                        amount += (((EnemyList[i].Level * 10) * (EnemyList[i].Level/AllyList[x].Level))/AllyAliveCount)/10;
                        AllyList[x].EXP += amount;
                    }
                    else {
                        amount += (((EnemyList[i].Level * 10) * (EnemyList[i].Level/AllyList[x].Level))/AllyAliveCount);
                        AllyList[x].EXP += amount;
                    }
                }
                dialogObj.write("+"+ Math.floor(amount) + " exp!");
        }
            while (AllyList[x].EXP >= AllyList[x].expToLevel){
                console.log("Calling Level up in checkAlive");
                AllyList[x].levelUP();
            }
            AllyList[x].Target = "noValidTarget";
        }
        changeState("map");
        combatDone = true;
    }
    else if (AllyAliveCount <= 0){
        //Lose
        dialogObj.write("-");
        //dialogObj.write(AllyList[0].Name + " dies in battle.");
        //dialogObj.write(AllyList[1].Name + " dies in battle.");
        dialogObj.write("You and your party are Reborn.");

        for (i = 0; i < AllyList.length; i++){
            AllyList[i].reset();
            AllyList[i].Target = "noValidTarget";
        }

        MapObj.Name = ranchMap.Name;
        MapObj.Map = ranchMap.Map;
        MapObj.MapLevel = 0;
        MapObj.PlayerPosition = ranchMap.PlayerPosition;
        MapObj.PlayerPosition[0] = 3;
        MapObj.PlayerPosition[1] = 3;

        changeState("map");
        combatDone = true;
    }

    OrderMonstersBySpeed();
}

function TryAttack(user, target) {
    if (user.BattleStats.HPCur > 0){
        let criticalHit = false;
        if (user.BattleStats.Attack > target.BattleStats.Defence){
            //damage = Math.floor(random3() * ((user.BattleStats.Attack/2) - (target.BattleStats.Defence/4)));
            damage = Math.floor(random3() * ((GetEffectiveAttack(user)/2) - (GetEffectiveDefence(target)/4)));
            if (target.BattleStats.Defending){
                damage -= Math.floor(random3()*target.BattleStats.Defence / 5);
            }
            else if (Math.floor(Math.random()*1000) <= user.luck){
                if (damage < 1){damage = 1};
                damage *= 3;
                criticalHit = true;
            }
            if (damage > 0){
                target.BattleStats.HPCur -= damage;
                drawBattle();
                if (criticalHit) {dialogObj.write("CRITICAL HIT!!!")}
                dialogObj.write(user.Name + " delt " + damage + " damage to " + target.Name + "!")
            }
            else{
                drawBattle();
                dialogObj.write(user.Name + " delt Zero damage to " + target.Name + "!")
            }
        }
        else {
            damage = Math.floor(random3() * ((GetEffectiveAttack(user)/2) - (GetEffectiveDefence(target)/4)));
            if (target.BattleStats.Defending){
                damage -= Math.floor((target.BattleStats.Defence/5))
            }
            else if (Math.floor(Math.random()*1000) <= user.luck){
                if (damage < 1){damage = 1};
                damage *= 3;
                criticalHit = true;
            }
            if (damage > 0){
                target.BattleStats.HPCur -= damage;
                drawBattle();
                if (criticalHit) {dialogObj.write("CRITICAL HIT!!!")}
                dialogObj.write(user.Name + " delt " + damage + " damage to " + target.Name + " despite their Defences!")
            }
            else {
                drawBattle();
                dialogObj.write(user.Name + " failed to break " + target.Name + "'s defences!")
            }
        }
    }
}

function drawBattle(){
    // document.getElementById("MonCanvas").textContent = "Giant Rat VS Giant Centipede";
    let text = "";
    for (i = 0; i < EnemyList.length; i++){
        if (EnemyList[i].BattleStats.HPCur > 0){
            text += EnemyList[i].Name + " (Level: " + EnemyList[i].Level + "):<br>HP: " + EnemyList[i].BattleStats.HPCur + " / " + EnemyList[i].BattleStats.HPMax + "<br>";
            text += "MP: "+ EnemyList[i].BattleStats.MPCur +" / "+ EnemyList[i].BattleStats.MPMax + "<br><br>";    
        }
        else {
            text = "R.I.P."
        }
        document.getElementById("E"+i).innerHTML = text;
        text = "";
    }
    
    for (i = 0; i < AllyList.length; i++){
        if (AllyList[i].BattleStats.HPCur > 0){
            text += AllyList[i].Name + " (Level: " + AllyList[i].Level + "):<br>HP: " + AllyList[i].BattleStats.HPCur + " / " + AllyList[i].BattleStats.HPMax + "<br>";
            text += "MP: "+ AllyList[i].BattleStats.MPCur +" / "+ AllyList[i].BattleStats.MPMax + "<br><br>";    
        }
        else {
            text = "R.I.P."
        }
        document.getElementById("A"+i).innerHTML = text;
        text = "";
    }
    
    //text += AllyList[0].Name + ":<br>HP: " + AllyList[0].BattleStats.HPCur + " / " + AllyList[0].BattleStats.HPMax + "<br>";
    //text += "MP: "+ AllyList[0].BattleStats.MPCur +" / "+ AllyList[0].BattleStats.MPMax + "<br><br>";
    //document.getElementById("A0").innerHTML = text;
    //text = ""
    
    text = drawMenu();
    document.getElementById("CommandCell").innerHTML = text;
    
    //document.getElementById("MapCanvas").textContent = text;
}

function drawMenu(){
    let menuText = "";
    for (menuIndex = 0; menuIndex<menuList.length; menuIndex += 1){
        if (menuIndex == selection){
            menuText += "+ ";
        }
        else {
            menuText += "- "
        }
        menuText += objectToString(menuList[menuIndex]);
        if (selectingSpell && menuIndex == selection){
            menuText += "<br>  " + menuList[menuIndex].Description;
        }
        menuText += "<br>"
    }
    return menuText;
}