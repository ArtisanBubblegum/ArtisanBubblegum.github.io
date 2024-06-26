

var Ally1 = {
    "Name" : "George Markus",
    "Genus" : "Giant Rat",
    "Family" : "Beast",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
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
        "TurnValue" : 0,
        "Luck" : 1,
        "Aflictions" : []
    },
    "GrowthStats" : {
        "HP" : 2, //+1
        "MP" : 20, //+1
        "Attack" : 3, //+2
        "Defence" : 2, //+1
        "Wisdom" : 2, //+1
        "Speed" : 1, //0
        "Luck" : 0, //-1
        "GrowthRate" : 1.25 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [Meditate, EarthBolt],
    "LearnableSpells" : [],
    "Tactic" : mindlessMagical,
    "Action" : "defend",
    "Target" : {},

    populate(target){
        this.Name = "George Markus II";
        this.Genus = target.Genus;
        this.Family = target.Family;
        this.Age = 1;
        this.Level = 1;
        this.EXP = 0;
        this.expToLevel = target.expToLevel;
        this.BattleStats.HPMax = target.BattleStats.HPMax;
        this.BattleStats.HPCur = target.BattleStats.HPCur;
        this.BattleStats.MPMax = target.BattleStats.MPMax;
        this.BattleStats.MPCur = target.BattleStats.MPCur;
        this.BattleStats.Attack = target.BattleStats.Attack;
        this.BattleStats.Defence = target.BattleStats.Defence;
        this.BattleStats.Wisdom = target.BattleStats.Wisdom;
        this.BattleStats.Speed = target.BattleStats.Speed;
        this.BattleStats.TurnValue = target.BattleStats.TurnValue;
        this.BattleStats.Luck = target.BattleStats.Luck;
        this.GrowthStats.HP = target.GrowthStats.HP;
        this.GrowthStats.MP = target.GrowthStats.MP;
        this.GrowthStats.Attack = target.GrowthStats.Attack;
        this.GrowthStats.Defence = target.GrowthStats.Defence;
        this.GrowthStats.Wisdom = target.GrowthStats.Wisdom;
        this.GrowthStats.Speed = target.GrowthStats.Speed;
        this.GrowthStats.Luck = target.GrowthStats.Luck;
        this.GrowthStats.GrowthRate = target.GrowthStats.GrowthRate;
        this.Spells = [];
        for (const spell in target.Spells){
            if (target.Spells[spell].CanLearn(this)){
                this.Spells.push(target.Spells[spell]);
            }
            else {
                this.LearnableSpells.push(target.Spells[spell]);
            }
        }
        this.LearnableSpells = [];
        for (const SpellIndex in target.LearnableSpells){
            console.log("adding spell to learnable spells :" + target.LearnableSpells[SpellIndex].Name);
            this.LearnableSpells.push(target.LearnableSpells[SpellIndex]);
        }
        console.log("Total Learnable Spells " + this.LearnableSpells.length);
        this.Tactic = target.Tactic;
    },
    reset(){
        var PreviousAge = this.Age;
        this.populate(Giant_Rat);
        this.Age = PreviousAge + 1;
    },
    levelUP(){
        alert (this.Name + " Gained a Level!");
        this.BattleStats.HPMax += this.GrowthStats.HP;
        this.BattleStats.HPCur += this.GrowthStats.HP;
        this.BattleStats.MPMax += this.GrowthStats.MP;
        this.BattleStats.MPMas += this.GrowthStats.MP;
        this.BattleStats.Attack += this.GrowthStats.Attack;
        this.BattleStats.Defence += this.GrowthStats.Defence;
        this.BattleStats.Wisdom += this.GrowthStats.Wisdom;
        this.BattleStats.Speed += this.GrowthStats.Speed;
        this.BattleStats.Luck += this.GrowthStats.Luck;
        for (learnableSpellIndex = this.LearnableSpells.length - 1; learnableSpellIndex >= 0 ; learnableSpellIndex--){
            console.log("checking learnable spell: " + learnableSpellIndex + " " + this.LearnableSpells[learnableSpellIndex].Name);
            if (this.LearnableSpells[learnableSpellIndex].CanLearn(this) == true){
                alert(this.Name + " learned a new spell!\n" + this.LearnableSpells[learnableSpellIndex].Name)
                this.Spells.push(this.LearnableSpells[learnableSpellIndex]);
                this.LearnableSpells.splice(learnableSpellIndex, 1);
            }
        }
        this.Level += 1;
        this.expToLevel += this.expToLevel * this.GrowthStats.GrowthRate;
        this.expToLevel = Math.floor(this.expToLevel);
    }
}

function drawStatus() {
    let text = "";
    text += Ally1.Name + ": (" + Ally1.Genus+ ", " + Ally1.Family + ")\n";
    text += "Level: " + Ally1.Level + " (" + Ally1.EXP + "/" + Ally1.expToLevel + ")\n";
    //text += "EXP: " + Ally1.EXP + " / " + Ally1.expToLevel + "\n";
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
//drawStatus();