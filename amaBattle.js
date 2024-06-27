
let allyList = [Ally1];
let EnemyList = [Enemy1];

let monstersList = []

let battleList = ["Fight", "Commands", "Flee"];
let cmdList = ["Attack", "Defend", "Spells"]
let spellList = allyList[0].Spells
let menuList = battleList;
let selection = 0;
let selectingSpell = false;
let turnReady = false;

let targetTurnValue = 100;
let allyAttacked = false;
let combatDone = false;
let fleeBonus = 0;
    

function newEnemy(){ //Called in amaMap.js when Moving into a cell marked M.
    let SpecificMonster = wildMonsterList[Math.floor(Math.random()*wildMonsterList.length)];
    EnemyList[0].populate(SpecificMonster);
    
    let enemyLevel = Math.floor( random3() * (allyList[0].Level * 2) ) + 1;
    if (allyList[0].Level <= 3 && enemyLevel > allyList[0].Level) { enemyLevel = allyList[0].Level};
    while (EnemyList[0].Level < enemyLevel){
        EnemyList[0].levelUP();
    }
    
    allyList[0].Target = EnemyList[0];
    EnemyList[0].Target = allyList[0];
    
    monstersList = []
    monstersList.push(allyList[0]);
    monstersList.push(EnemyList[0]);

    changeState("battle");
    drawBattle();
    
    return;
}

function BattleCommands(input){ //Manages Menues and gates when Turn's are Exectuted by returning True
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
                selectingSpell = false;
                allyList[0].Action = menuList[selection];
                menuList = battleList;
                selection = 0;
                return true;
            }
            switch (menuList[selection]){
                case "Fight":
                case "Attack":
                case "Defend":
                    allyList[0].Action = menuList[selection].toLowerCase();
                    menuList = battleList;
                    selection = 0;
                    return true;
                case "Commands":
                    menuList = cmdList;
                    selection = 0;
                    break;
                case "Spells":
                    spellList = allyList[0].Spells;
                    menuList = spellList;
                    selection = 0;
                    selectingSpell = true;
                    break;
                case "Flee":
                    allyList[0].Action = "flee";
                    selection = 0
                    if ( Math.random() < fleeBonus + ( allyList[0].BattleStats.Speed/( EnemyList[0].BattleStats.Speed*2 ) ) ){
                        alert(allyList[0].Name + " escapes!")
                        fleeBonus = 0;
                        allyList[0].Target = noValidTarget;
                        changeState("map");
                    }
                    else {
                        alert(allyList[0].Name + " fails to escape!")
                        fleeBonus += 0.1;
                        return true;
                    }
                    break;
                }
            break;
        case "B":
            if (menuList == cmdList){
                menuList = battleList;
                selection = 0;
            }
            else if (menuList == spellList){
                menuList = cmdList;
                selection = 0;
                selectingSpell = false;
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
    allyAttacked = false;
    combatDone = false;
    while (allyAttacked == false && combatDone == false){
        for (index = 0; index<monstersList.length && combatDone == false; index++){
            monstersList[index].BattleStats.TurnValue += monstersList[index].BattleStats.Speed;
            if (monstersList[index].BattleStats.TurnValue >= targetTurnValue){
                monstersList[index].BattleStats.TurnValue -= targetTurnValue;
                console.log(monstersList[index].Name + " takes a turn.")

                if (monstersList[index] === allyList[0]){
                    allyAttacked = true;
                    //alert("Ally Attacked");
                }
                else {
                    //alert("Not yet + " + allyList[0].BattleStats.TurnValue + " / " + targetTurnValue);
                }
                
                if (monstersList[index].BattleStats.Aflictions.length > 0){
                    for (item = monstersList[index].BattleStats.Aflictions.length - 1; item >= 0; item--){
                        switch (monstersList[index].BattleStats.Aflictions[item]){
                            case "Trip" :                               
                                if (Math.random() < 0.5 && monstersList[index].Action != "skip"){
                                    monstersList[index].Action = "skip";
                                    alert(monstersList[index].Name + " trips and misses their turn.");
                                }
                                monstersList[index].BattleStats.Aflictions.splice(item, 1);
                                break;
                            default :
                                alert(monstersList[index].BattleStats.Aflictions[item] + " Doesn't exist.");
                                break;
                        }
                    }
                }

                if (monstersList[index].Action == "fight"){
                    monstersList[index].Tactic.think(monstersList[index]);
                    if (monstersList[index].Action == "fight"){
                        alert("Error, Fialed to think.");
                    }
                }
                switch (monstersList[index].Action){
                    case "attack":
                        TryAttack(monstersList[index], monstersList[index].Target)
                        monstersList[index].BattleStats.Defending = false;
                        break;
                    case "defend":
                        monstersList[index].BattleStats.Defending = true;
                        alert(monstersList[index].Name + " takes a Defensive Stance!")
                        break;
                    case "flee":
                    case "skip":
                        break;
                    default:
                        monstersList[index].Action.Cast(monstersList[index],monstersList[index].Target);
                        //break;
                }
                monstersList[index].Action = "fight";
                checkAlive();
                OrderMonstersBySpeed();
            }
        }
    }
}

function checkAlive(){
    console.log("checking Alive.");
    let list = [];
    if (allyList[0].BattleStats.HPCur > 0){
        list.push(allyList[0]);
    }
    if (EnemyList[0].BattleStats.HPCur > 0){
        list.push(EnemyList[0]);
    }
    
    if (list.length == 1){
        alert(list[0].Name + " has Survived the Battle!");
        if (allyList[0].BattleStats.HPCur <= 0){
            allyList[0].reset();
        }
        else {
            allyList[0].EXP += (EnemyList[0].Level * 10) * (EnemyList[0].Level/allyList[0].Level);
            if (allyList[0].EXP >= allyList[0].expToLevel){
                console.log("Calling Level up in checkAlive");
                allyList[0].levelUP();
            }
        }
        allyList[0].Target = noValidTarget;
        changeState("map");
        combatDone = true;
    }
    else if (list.length == 0){
        alert("Neither Monster Survives the Battle!");
        allyList[0].reset();
        allyList[0].Target = noValidTarget;
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
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + "!")
            }
            else{
                drawBattle();
                alert(user.Name + " delt Zero damage to " + target.Name + "!")
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
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + " despite their Defences!")
            }
            else {
                drawBattle();
                alert(user.Name + " failed to break " + target.Name + "'s defences!")
            }
        }
    }
}

function drawBattle(){
    // document.getElementById("MonCanvas").textContent = "Giant Rat VS Giant Centipede";
    let text = "";
    text += EnemyList[0].Name + " (Level: " + EnemyList[0].Level + "):\nHP: " + EnemyList[0].BattleStats.HPCur + " / " + EnemyList[0].BattleStats.HPMax + "\n";
    text += "MP: "+ EnemyList[0].BattleStats.MPCur +" / "+ EnemyList[0].BattleStats.MPMax + "\n\n";
    text += allyList[0].Name + ":\nHP: " + allyList[0].BattleStats.HPCur + " / " + allyList[0].BattleStats.HPMax + "\n";
    text += "MP: "+ allyList[0].BattleStats.MPCur +" / "+ allyList[0].BattleStats.MPMax + "\n\n";
    text += drawMenu();
    document.getElementById("MonCanvas").textContent = text;
}

function drawMenu(){
    let menuText = "";
    for (menuIndex = 0; menuIndex<menuList.length; menuIndex += 1){
        if (menuIndex == selection){
            menuText += "> ";
        }
        else {
            menuText += "- "
        }
        menuText += objectToString(menuList[menuIndex]);
        if (selectingSpell && menuIndex == selection){
            menuText += "\n  " + menuList[menuIndex].Description;
        }
        menuText += "\n"
    }
    return menuText;
}