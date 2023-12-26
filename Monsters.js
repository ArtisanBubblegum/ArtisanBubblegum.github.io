var Ally1 = {
    "Name" : "George Markus",
    "Genus" : "Giant Rat",
    "Family" : "Beast",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "lvlUP" : 100,
    "BattleStats" : {
        "HPMax" : 20,
        "HPCur" : 20,
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
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
        this.Age++;
    }
}

function drawStatus() {
    let text = "";
    text += Ally1.Name + ": (" + Ally1.Genus+ ", " + Ally1.Family + ")\n";
    text += "HP: " + Ally1.BattleStats.HPCur + " / " + Ally1.BattleStats.HPMax +"\n";
    text += "MP:" + Ally1.BattleStats.MPCur + " / " + Ally1.BattleStats.MPMax + "\n";
    text += "Attack: " + Ally1.BattleStats.Attack + "\n";
    text += "Defence: " + Ally1.BattleStats.Defence + "\n";
    text += "Wisdom: " + Ally1.BattleStats.Wisdom + "\n";
    text += "Speed: " + Ally1.BattleStats.Speed + "\n";
    text += "Luck: " + Ally1.BattleStats.Luck + "\n";
    text += "Generation: " + Ally1.Age + "\n";
    document.getElementById("MonCanvas").textContent = text;
}
drawStatus();