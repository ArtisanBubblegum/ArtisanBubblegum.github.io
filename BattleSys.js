let allyList = [Ally1];

let Enemy1 = {
    "Name" : "Giant Centipede",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "lvlUP" : 100,
    "BattleStats" : {
        "HPMax" : 12,
        "HPCur" : 12,
        "MPMax" : 120,
        "MPCur" : 120,
        "Attack" : 11,
        "Defence" : 7,
        "Defending": false,
        "Wisdom" : 13,
        "Speed" : 13,
        "Luck" : 3,
        "Aflictions" : []
    },
    "Action" : "defend",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

Ally1.Target = Enemy1;
Enemy1.Target = Ally1;

function drawMon(){
    document.getElementById("MonCanvas").textContent = "Giant Rat VS Giant Centipede";
    let text = "";
    text += Enemy1.Name + ":\nHP: " + Enemy1.BattleStats.HPCur + " / " + Enemy1.BattleStats.HPMax + "\n\n";
    text += Ally1.Name + ":\nHP: " + Ally1.BattleStats.HPCur + " / " + Ally1.BattleStats.HPMax + "\n\n";
    text += "\n\n\n";
    document.getElementById("MonCanvas").textContent = text;
}

function StepBattle(input){
    input = input.toLowerCase();
    if (Player.InCombat == false){
        input = "Not in combat";
    }

    if (input == "attack"){
        Ally1.Action = input;
    }
    else if (input == "defend"){
        Ally1.Action = input;
    }
    else if (input == "cast"){
        Ally1.Action = input;
    }
    else if (input == "Not in combat"){
        alert(Ally1.Name + " looks confused.")
        return;
    }
    else{
        alert("Invalid Battle Entry.")
        return;
    }

    if (Math.random() >= Enemy1.BattleStats.HPCur/Enemy1.BattleStats.HPMax || Enemy1.BattleStats.HPCur == Enemy1.BattleStats.HPMax){
        Enemy1.Action = "attack";
    }
    else {
        Enemy1.Action = "defend";
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
        while (turnIndex < fastest.length){
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
            drawMon();
        }
    }

    alive = checkAlive();
}

function checkAlive(){
    let list = [];
    if (Ally1.BattleStats.HPCur > 0){
        list.push(Ally1);
    }
    if (Enemy1.BattleStats.HPCur > 0){
        list.push(Enemy1);
    }
    
    if (list.length == 1){
        alert(list[0].Name + " has Survived the Battle!")
        if (Ally1.BattleStats.HPCur <= 0){
            Ally1.reset();
        }
        Enemy1.reset();
        Player.InCombat = false;
        drawStatus(); //Monsters.JS -> drawStatus();
    }
    return list;
}

function TryAttack(user, target) {
    if (user.BattleStats.HPCur > 0){
        if (user.BattleStats.Attack > target.BattleStats.Defence){
            damage = Math.floor(Math.random()*(user.BattleStats.Attack-target.BattleStats.Defence))
            if (target.BattleStats.Defending){
                damage -= Math.floor(target.BattleStats.Defence / 2);
            }
            if (damage > 0){
                target.BattleStats.HPCur -= damage;
                drawMon();
                alert(user.Name + " Delt " + damage + " damage to " + target.Name + "!")
            }
            else{
                drawMon();
                alert(user.Name + " Delt Zero damage to " + target.Name + "!")
            }
        }
        else {
            damage = Math.floor(Math.random()*(user.BattleStats.Attack / (user.BattleStats.Defence / 2)));
            if (target.BattleStats.Defending){
                damage -= Math.floor(target.BattleStats.Defence / 2);
            }
            if (damage > 0){
                target.BattleStats.HPCur -= damage;
                drawMon();
                alert(user.Name + " Delt " + damage + " damage to " + target.Name + " despite their Defences!")
            }
            else {
                drawMon();
                alert(user.Name + " Delt Zero damage to " + target.Name + "!")
            }
        }
    }
}
