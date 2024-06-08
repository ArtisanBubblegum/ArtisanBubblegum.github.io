let allyList = [Ally1];
let EnemyList = [];
let monstersList = []

let battleList = ["Fight", "Commands"];
let cmdList = ["Attack", "Defend", "Spells"]
let spellList = allyList[0].Spells
let menuList = battleList;
let selection = 0;
let selectingSpell = false;
let turnReady = false;

function newEnemy(){ //Called in amaMap.js when Moving into a cell marked M.
    let SpecificMonster = wildMonsterList[Math.floor(Math.random()*wildMonsterList.length)];
    EnemyList = [SpecificMonster];
    EnemyList[0].reset();
    allyList[0].Target = EnemyList[0];
    EnemyList[0].Target = allyList[0];
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
                    menuList = spellList;
                    selection = 0;
                    selectingSpell = true;
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

function OrderMonstersBySpeed(){ //called in BattleLoop in amaMain.js, this is gated by BattleCommands returning true
    monstersList.sort(function(a,b){return a.BattleStats.Speed-b.BattleStats.Speed})
}

function BattleTurns(){ //alled in BattleLoop in amaMain.js after OrderMonstersBySpeed
    for (index = 0; index<monstersList.length; index++){
        if (monstersList[index].Action == "fight"){
            monstersList[index].Tactics();
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
            default:
                monstersList[index].Action.Cast(monstersList[index],monstersList[index].Target);
        }
        monstersList[index].Action = "fight";
        checkAlive();
    }
}

function checkAlive(){
    let list = [];
    if (allyList[0].BattleStats.HPCur > 0){
        list.push(allyList[0]);
    }
    if (EnemyList[0].BattleStats.HPCur > 0){
        list.push(EnemyList[0]);
    }
    
    if (list.length == 1){
        alert(list[0].Name + " has Survived the Battle!")
        if (allyList[0].BattleStats.HPCur <= 0){
            allyList[0].reset();
        }
        allyList[0].Target = noValidTarget;
        changeState("map");
    }
    else {
        //drawBattle();
    }
    monstersList = list;
}

function TryAttack(user, target) {
    if (user.BattleStats.HPCur > 0){
        let criticalHit = false;
        if (user.BattleStats.Attack > target.BattleStats.Defence){
            damage = Math.floor(random3() * ((user.BattleStats.Attack/2) - (target.BattleStats.Defence/4)));
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
            damage = Math.floor(random3() * ((user.BattleStats.Attack/2) - (user.BattleStats.Defence/4)));
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
    text += EnemyList[0].Name + ":\nHP: " + EnemyList[0].BattleStats.HPCur + " / " + EnemyList[0].BattleStats.HPMax + "\n";
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
        menuText += "\n"
    }
    return menuText;
}