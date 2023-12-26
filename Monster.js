let Ally1 = {
    "Name" : "Giant Rat",
    "Level" : 1,
    "EXP" : 0,
    "lvlUP" : 100,
    "BattleStats" : {
        "HPMax" : 100,
        "HPCur" : 100,
        "MPMax" : 100,
        "MPCur" : 100,
        "Attack" : 15,
        "Defence" : 5,
        "Defending": false,
        "Wisdom" : 10,
        "Speed" : 5,
        "Luck" : 1,
        "Aflictions" : []
    },
    "Action" : "defend",
    "Target" : {}
}

let Enemy1 = {
    "Name" : "Giant Centipede",
    "Level" : 1,
    "EXP" : 0,
    "lvlUP" : 100,
    "BattleStats" : {
        "HPMax" : 120,
        "HPCur" : 120,
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
    "Target" : {}
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
drawMon();

function StepBattle(input){
    input = input.toLowerCase();
    if (input == "attack"){
        Ally1.Action = input;
    }
    else if (input == "defend"){
        Ally1.Action = input;
    }
    else if (input == "cast"){
        Ally1.Action = input;
    }
    else{
        alert("Invalid Battle Entry.")
    }

    if (Math.random() >= Enemy1.BattleStats.HPCur/Enemy1.BattleStats.HPMax){
        Enemy1.Action = "attack";
    }
    else {
        Enemy1.Action = "defend";
    }

    let alive = [];
    if (Ally1.BattleStats.HPCur > 0){
        alive.push(Ally1);
    }
    if (Enemy1.BattleStats.HPCur > 0){
        alive.push(Enemy1);
    }
    
    if (alive.length == 1){
        alert(alive[0].Name + " has Survived the Battle!")
    }
    else{
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
}

function TryAttack(user, target) {
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
