// var MonsterBase = {
//     "Name" : "Monster",
//     "Genus" : "Monster",
//     "Family" : "Monster",
//     "Age" : 1,
//     "Level" : 1,
//     "EXP" : 0,
//     "expToLevel" : 20,
//     "BattleStats" : {
//         "HPMax" : 10,
//         "HPCur" : 10,
//         "MPMax" : 100,
//         "MPCur" : 100,
//         "Attack" : 10,
//         "Defence" : 10,
//         "Defending": false,
//         "Wisdom" : 10,
//         "Speed" : 10,
//         "Luck" : 5,
//         "Aflictions" : []
//     },
//     "Action" : "defend",
//     "Target" : {},

//     reset(){
//         this.BattleStats.HPCur = this.BattleStats.HPMax;
//         this.BattleStats.Defending = false;
//     }
// }



var Giant_Rat = {
    "Name" : "Giant Rat",
    "Genus" : "Giant Rat",
    "Family" : "Beast",
    "Age" : 1,
    "LifeSpan" : 3650,
    "DeathChance" : 0.274,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : { //10
        "HPMax" : 20, //+10
        "HPCur" : 20, 
        "MPMax" : 10, //+0
        "MPCur" : 10,
        "Attack" : 18, //+8
        "Defence" : 8, //-2
        "Defending": false,
        "Wisdom" : 13, //+3
        "Speed" : 5, //-5
        "TurnValue" : 0,
        "Luck" : 1, //-4
        "Aflictions" : []
    },
    "GrowthStats" : { //5
        "HP" : 2, //+1
        "MP" : 2, //+1
        "Attack" : 3, //+2
        "Defence" : 2, //+1
        "Wisdom" : 2, //+1
        "Speed" : 1, //0
        "Luck" : 0, //-1
        "GrowthRate" : 1.25 //??1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [Meditate, EarthBolt], // MetalBolt, WaterBolt, WoodBolt, FireBolt],
    "LearnableSpells" : [WoodBolt, FireT3, MetalT2Crit],
    "Tactic" : aggressivePhysical,
    Tactics(){ //Aggressive
        if (Math.random() <= this.BattleStats.HPCur/this.BattleStats.HPMax){
            this.Action = "attack";
        }
        else {
            if (Math.random() <= this.BattleStats.MPCur/this.BattleStats.MPMax){
                this.Action = Meditate;
            }
            else {
                this.Action = "defend";
            }
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Mud_Slipper = {
    "Name" : "Mud Slipper",
    "Genus" : "Mud Slipper",
    "Family" : "Aquatic",
    "Age" : 1,
    "LifeSpan" : 1825,
    "DeathChance" : 0.274,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {//10
        "HPMax" : 8, //-2
        "HPCur" : 8,
        "MPMax" : 15, //+5
        "MPCur" : 15,
        "Attack" : 5, //-5
        "Defence" : 8, //-2
        "Defending": false,
        "Wisdom" : 15, //+5
        "Speed" : 12, //+2
        "TurnValue" : 0,
        "Luck" : 7, //+7
        "Aflictions" : []
    },
    "GrowthStats" : {//5
        "HP" : 1, //0
        "MP" : 4, //+3
        "Attack" : 1, //0
        "Defence" : 1, //0
        "Wisdom" : 2, //+1
        "Speed" : 1, //0
        "Luck" : 2, //+1
        "GrowthRate" : 1.3 //??1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [WaterBolt],
    "LearnableSpells" : [MetalT1Spd, EarthT3HP],
    "Tactic" : aggressiveMagical,
    Tactics(){ //Aggressive
        if (Math.random() <= this.BattleStats.HPCur/this.BattleStats.HPMax){
            if(this.BattleStats.MPCur >= 4){
                this.Action = WaterBolt;
            }
            else{
                this.Action = "attack";
            }
        }
        else {
            this.Action = "defend";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Giant_Centipede = {
    "Name" : "Giant Centipede",
    "Genus" : "Giant Centipede",
    "Family" : "Insect",
    "Age" : 1,
    "LifeSpan" : 1095,
    "DeathChance" : 0.027,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {//10
        "HPMax" : 11, //+1
        "HPCur" : 11,
        "MPMax" : 11, //+1
        "MPCur" : 11,
        "Attack" : 11, //+1
        "Defence" : 5, //-5
        "Defending": false,
        "Wisdom" : 15, //+5
        "Speed" : 13, //+3
        "TurnValue" : 0,
        "Luck" : 4, //+4
        "Aflictions" : []
    },
    "GrowthStats" : {//5
        "HP" : 1, //0
        "MP" : 1, //0
        "Attack" : 3, //+2
        "Defence" : 1, //0
        "Wisdom" : 3, //+2
        "Speed" : 2, //+1
        "Luck" : 1, //0
        "GrowthRate" : 1.15 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [VoidBolt],
    "LearnableSpells" : [FireT2, MetalT3Multi],
    "Tactic" : aggressiveMagical,
    Tactics(){ //Aggressive
        if (Math.random() <= this.BattleStats.HPCur/this.BattleStats.HPMax || this.BattleStats.HPCur == this.BattleStats.HPMax){
            if (Math.random() <= this.BattleStats.MPCur/this.BattleStats.MPMax){
                this.Action = VoidBolt;
            }
            else {
                this.Action = "attack";
            }
        }
        else {
            this.Action = "defend";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Bed_Biter = {
    "Name" : "Bed Biter",
    "Genus" : "Bed Biter",
    "Family" : "Insect",
    "Age" : 1,
    "LifeSpan" : 730,
    "DeathChance" : 0.045,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : { //10
        "HPMax" : 13, //+3
        "HPCur" : 13,
        "MPMax" : 4, //-6
        "MPCur" : 4,
        "Attack" : 13, //+3
        "Defence" : 9, //-1
        "Defending": false,
        "Wisdom" : 15, //+5
        "Speed" : 10, //0
        "TurnValue" : 0,
        "Luck" : 5, //+5
        "Aflictions" : []
    },
    "GrowthStats" : { //5
        "HP" : 2, //+1
        "MP" : 2, //+1
        "Attack" : 3, //+2
        "Defence" : 2, //+1
        "Wisdom" : 2, //+1
        "Speed" : 1, //0
        "Luck" : 0, //-1
        "GrowthRate" : 1.15 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [],
    "LearnableSpells" : [WoodT1HP, WoodT3Def, FireT1],
    "Tactic" : defensivePhysical,
    Tactics(){ //Defensive
        if (Math.random() >= this.BattleStats.HPCur/this.BattleStats.HPMax || this.BattleStats.HPCur == this.BattleStats.HPMax){
            this.Action = "attack";
        }
        else {
            this.Action = "defend";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Error_Ant = {
    "Name" : "Error Ant",
    "Genus" : "Error Ant",
    "Family" : "Insect",
    "Age" : 1,
    "LifeSpan" : 730,
    "DeathChance" : 0.045,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : { //10
        "HPMax" : 13, //+3
        "HPCur" : 13,
        "MPMax" : 7, //-3
        "MPCur" : 7,
        "Attack" : 16, //+6
        "Defence" : 11, //+1
        "Defending": false,
        "Wisdom" : 7, //-3
        "Speed" : 11, //+1
        "TurnValue" : 0,
        "Luck" : 5, //+5
        "Aflictions" : []
    },
    "GrowthStats" : { //5
        "HP" : 2, //+1
        "MP" : 1, //0
        "Attack" : 3, //+2
        "Defence" : 2, //+1
        "Wisdom" : 1, //0
        "Speed" : 2, //+1
        "Luck" : 1, //0
        "GrowthRate" : 1.15 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [],
    "LearnableSpells" : [MetalT2Crit],
    "Tactic" : mindlessPhysical,
    Tactics(){ //very aggressive
        if (Math.random() <= ((this.BattleStats.HPCur/this.BattleStats.HPMax)+1)/2){
            this.Action = "attack";
        }
        else {
            this.Action = "defend";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Carnivorous_Canary = {
    "Name" : "Carnivorous Canary",
    "Genus" : "Carnivorous Canary",
    "Family" : "Avian",
    "Age" : 1,
    "LifeSpan" : 3650,
    "DeathChance" : 0.136,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {//10
        "HPMax" : 8, //-2
        "HPCur" : 8, 
        "MPMax" : 13, //+3
        "MPCur" : 13,
        "Attack" : 5, //-5
        "Defence" : 7, //-3
        "Defending": false,
        "Wisdom" : 17, //+7
        "Speed" : 15, //+5
        "TurnValue" : 0,
        "Luck" : 5, //+5
        "Aflictions" : []
    },
    "GrowthStats" : {//5
        "HP" : 1, //0
        "MP" : 2, //+1
        "Attack" : 2, //+1
        "Defence" : 1, //0
        "Wisdom" : 2, //+1
        "Speed" : 3, //+2
        "Luck" : 1, //0
        "GrowthRate" : 1.2 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [AirBolt],
    "LearnableSpells" : [WaterBolt, WoodT2Spd, MetalT3Multi],
    "Tactic" : aggressiveMagical,
    Tactics(){//very aggressive
        if (Math.random() <= ((this.BattleStats.HPCur/this.BattleStats.HPMax)+1)/2){
            if (this.BattleStats.MPCur >= 5){
                this.Action = AirBolt;
            }
            else {
            this.Action = "attack";
            }
        }
        else {
            this.Action = "defend";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Magic_Sword = {
    "Name" : "Magic Sword",
    "Genus" : "Magic Sword",
    "Family" : "Material",
    "Age" : 1,
    "LifeSpan" : 36500,
    "DeathChance" : 0.005,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {//15
        "HPMax" : 5, //-5
        "HPCur" : 5,
        "MPMax" : 13, //+3
        "MPCur" : 13,
        "Attack" : 15, //+5
        "Defence" : 13, //+3
        "Defending": false,
        "Wisdom" : 12, //+2
        "Speed" : 12, //+2
        "TurnValue" : 0,
        "Luck" : 5, //+5
        "Aflictions" : []
    },
    "GrowthStats" : {//0
        "HP" : 1, //0
        "MP" : 1, //0
        "Attack" : 2, //+1
        "Defence" : 2, //+1
        "Wisdom" : 0, //-1
        "Speed" : 1, //0
        "Luck" : 0, //-1
        "GrowthRate" : 1.4 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [],
    "LearnableSpells" : [MetalBolt, MetalT1Def],
    "Tactic" : mindlessPhysical,
    Tactics(){//mindlessly aggressive
        this.Action = "attack";
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

var Orange_Ooze = {
    "Name" : "Orange Ooze",
    "Genus" : "Orange Ooze",
    "Family" : "Slime",
    "Age" : 1,
    "LifeSpan" : 36500,
    "DeathChance" : 0.01,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : { //10
        "HPMax" : 16, // +6
        "HPCur" : 16,
        "MPMax" : 10, // 0
        "MPCur" : 10,
        "Attack" : 13, // +3
        "Defence" : 8, // -2
        "Defending": false,
        "Wisdom" : 15, // +5
        "Speed" : 4, // -6
        "TurnValue" : 0,
        "Luck" : 4, // +4
        "Aflictions" : []
    },
    "GrowthStats" : { //5
        "HP" : 3, //+2
        "MP" : 2, //+1
        "Attack" : 1, //0
        "Defence" : 1, //0
        "Wisdom" : 3, //+2
        "Speed" : 1, //0
        "Luck" : 1, //0
        "GrowthRate" : 1.5 //1+(stat_value/10)  =  1+(5/10)
    },
    "Spells" : [FireBolt],
    "LearnableSpells" : [FireT1, FireT2, FireT3, MetalT1Def, WoodT3Wis],
    "Tactic" : mindlessMagical,
    Tactics(){ //Mindlessly Aggressive
        if(this.BattleStats.MPCur >= 5){
            this.Action = FireBolt;
        }
        else{
            this.Action = "attack";
        }
    },
    "Action" : "fight",
    "Target" : {},

    reset(){
        this.BattleStats.HPCur = this.BattleStats.HPMax;
        this.BattleStats.Defending = false;
    }
}

wildMonsterList = [Giant_Rat, Mud_Slipper, Giant_Centipede, Bed_Biter, Error_Ant, Carnivorous_Canary, Magic_Sword, Orange_Ooze];