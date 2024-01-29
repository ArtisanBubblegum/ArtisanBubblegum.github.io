let allyList = [Ally1];
let EnemyList = [];
let monstersList = []

let menuList = ["Fight", "Attack", "Defend"];
let selection = 0;
let turnReady = false;

function newEnemy(){ //Called in StartHere.js when Battle is triggered.
    EnemyList = [wildMonsterList[Math.floor(Math.random()*wildMonsterList.length)]];
    EnemyList[0].reset();
    allyList[0].Target = EnemyList[0];
    EnemyList[0].Target = allyList[0];
    monstersList.push(allyList[0]);
    monstersList.push(EnemyList[0]);
    changeState("battle");
    return;
}

function StepBattle(input){
    input = input.toLowerCase();
    if (MapObj.mapActive){
        input = "Not in combat";
    }

    if (input == "A"){
        allyList[0].Action = "attack";
    }
    else if (input == "B"){
        allyList[0].Action = "defend";
    }
    // else if (input == "Not in combat"){
    //     alert(allyList[0].Name + " looks confused.")
    //     return;
    // }
    else{
        alert("Invalid Battle Entry.")
        return;
    }

    if (Math.random() >= EnemyList[0].BattleStats.HPCur/EnemyList[0].BattleStats.HPMax || EnemyList[0].BattleStats.HPCur == EnemyList[0].BattleStats.HPMax){
        EnemyList[0].Action = "attack";
    }
    else {
        EnemyList[0].Action = "defend";
    }

    let alive = checkAlive();
    
    if (alive.length > 1){
        aliveIndex = 1;
        let fastest = [alive[0]];
        while (aliveIndex < alive.length){
            fastIndex = 0;
            slowest = true;
            while (fastIndex < fastest.length){
                if (alive[aliveIndex].BattleStats.Speed > fastest[fastIndex].BattleStats.Speed){
                    fastest.splice(fastIndex,0,alive[aliveIndex]);
                    fastIndex = fastest.length;
                    slowest = false;
                }
                fastIndex++;
            }
            if (slowest){
                fastest.push(alive[aliveIndex]);
            }
            aliveIndex++;
        }

        turnIndex = 0;
        while (turnIndex < fastest.length && alive.length > 1){
            if (fastest[turnIndex].Action == "attack"){
                TryAttack(fastest[turnIndex], fastest[turnIndex].Target)
                fastest[turnIndex].BattleStats.Defending = false;
            }
            else if (fastest[turnIndex].Action == "defend"){
                fastest[turnIndex].BattleStats.Defending = true;
                alert(fastest[turnIndex].Name + " takes a Defensive Stance!")
            }
            else{
                alert("Invalid Action!");
            }
            turnIndex++;
            alive = checkAlive();
        }
    }
}

function BattleCommands(input){
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
            allyList[0].Action = menuList[selection].toLowerCase();
            return true;
    }
}

function OrderMonstersBySpeed(){
    monstersList.sort(function(a,b){return a.BattleStats.Speed-b.BattleStats.Speed})
}

function BattleTurns(){
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
        }
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
        drawStatus(); //Monsters.JS -> drawStatus();
        MapObj.despawnMonster();
        changeState("map");
    }
    // else {
    //     drawMon();
    // }
    monstersList = list;
    //return list;
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
                //drawMon();
                drawBattle();
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + "!")
            }
            else{
                //drawMon();
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
                //drawMon();
                drawBattle();
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + " despite their Defences!")
            }
            else {
                //drawMon();
                drawBattle();
                alert(user.Name + " failed to break " + target.Name + "'s defences!")
            }
        }
    }
}

function drawBattle(){
    // document.getElementById("MonCanvas").textContent = "Giant Rat VS Giant Centipede";
    let text = "";
    text += EnemyList[0].Name + ":\nHP: " + EnemyList[0].BattleStats.HPCur + " / " + EnemyList[0].BattleStats.HPMax + "\n\n";
    text += allyList[0].Name + ":\nHP: " + allyList[0].BattleStats.HPCur + " / " + allyList[0].BattleStats.HPMax + "\n\n";
    text += "\n";
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
        menuText += menuList[menuIndex];
        menuText += "\n"
    }
    return menuText;
}



function BattleLoop ( ){
    //GetPlayerInput();
    //OrganizeMonstersBySpeed();
    //MonsterTurn();
    //CheckAlive();
    //CheckVictory();
}