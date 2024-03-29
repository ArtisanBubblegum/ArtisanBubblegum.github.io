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
        "MPMax" : 100,  //Water
        "MPCur" : 100,
        "Attack" : 16,  //Fire
        "Defence" : 5,  //Earth
        "Defending": false,
        "Wisdom" : 10,  //Void
        "Speed" : 5,  //Air
        "Luck" : 1,
        "Aflictions" : []
    },
    "Spells" : [Meditate, EarthBolt],
    Tactics(){ //aggressive
        if (Math.random() <= this.BattleStats.HPCur/this.BattleStats.HPMax){
            this.Action = "attack";
        }
        else {
            if (Math.random() <= this.BattleStats.MPCur/this.BattleStats.MPMax || 
                    (this.BattleStats.HPCur < 5 && this.BattleStats.MPCur >= 15)){
                this.Action = Meditate;
            }
            else {
                this.Action = "defend";
            }
        }
    },
    "Action" : "defend",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.MPCur = this.BattleStats.MPMax;
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