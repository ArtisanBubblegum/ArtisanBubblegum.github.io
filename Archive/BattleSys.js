alert ("Running Depricated Battle System, OH NO!");

let allyList = [Ally1];
let EnemyList = [];

function newEnemy(){ //Called in StartHere.js when Battle is triggered.
    EnemyList = [wildMonsterList[Math.floor(Math.random()*wildMonsterList.length)]];
    EnemyList[0].reset();
    allyList[0].Target = EnemyList[0];
    EnemyList[0].Target = allyList[0];
    return;
}

function drawMon(){
    // document.getElementById("MonCanvas").textContent = "Giant Rat VS Giant Centipede";
    let text = "";
    text += EnemyList[0].Name + ":\nHP: " + EnemyList[0].BattleStats.HPCur + " / " + EnemyList[0].BattleStats.HPMax + "\n\n";
    text += allyList[0].Name + ":\nHP: " + allyList[0].BattleStats.HPCur + " / " + allyList[0].BattleStats.HPMax + "\n\n";
    text += "\n\n\n";
    document.getElementById("MonCanvas").textContent = text;
}

function StepBattle(input){
    input = input.toLowerCase();
    if (Player.InCombat == false){
        input = "Not in combat";
    }

    if (input == "attack"){
        allyList[0].Action = input;
    }
    else if (input == "defend"){
        allyList[0].Action = input;
    }
    else if (input == "cast"){
        allyList[0].Action = input;
    }
    else if (input == "Not in combat"){
        alert(allyList[0].Name + " looks confused.")
        return;
    }
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
        Player.InCombat = false;
        drawStatus(); //Monsters.JS -> drawStatus();
        despawnMonster([(Player.Position[0] + Player.Faceing[0]) , (Player.Position[1] + Player.Faceing[1])], Map1)
    }
    else {
        drawMon();
    }
    return list;
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
                drawMon();
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + "!")
            }
            else{
                drawMon();
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
                drawMon();
                if (criticalHit) {alert("CRITICAL HIT!!!")}
                alert(user.Name + " delt " + damage + " damage to " + target.Name + " despite their Defences!")
            }
            else {
                drawMon();
                alert(user.Name + " failed to break " + target.Name + "'s defences!")
            }
        }
    }
}
