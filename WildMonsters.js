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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 20, // +10
        "HPCur" : 20, // +10
        "MPMax" : 100,
        "MPCur" : 100,
        "Attack" : 18, // +8
        "Defence" : 8, // -2
        "Defending": false,
        "Wisdom" : 13, // +3
        "Speed" : 5, // -5
        "TurnValue" : 0,
        "Luck" : 1, //-4
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
    "Spells" : [Meditate, EarthBolt], // MetalBolt, WaterBolt, WoodBolt, FireBolt],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 8,
        "HPCur" : 8,
        "MPMax" : 120,
        "MPCur" : 120,
        "Attack" : 5,
        "Defence" : 8,
        "Defending": false,
        "Wisdom" : 15,
        "Speed" : 12,
        "TurnValue" : 0,
        "Luck" : 5,
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
    "Spells" : [WaterBolt],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 12,
        "HPCur" : 12,
        "MPMax" : 120,
        "MPCur" : 120,
        "Attack" : 11,
        "Defence" : 7,
        "Defending": false,
        "Wisdom" : 15,
        "Speed" : 13,
        "TurnValue" : 0,
        "Luck" : 5,
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
    "Spells" : [VoidBolt],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 13,
        "HPCur" : 13,
        "MPMax" : 90,
        "MPCur" : 90,
        "Attack" : 13,
        "Defence" : 5,
        "Defending": false,
        "Wisdom" : 15,
        "Speed" : 10,
        "TurnValue" : 0,
        "Luck" : 10,
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
    "Spells" : [],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 13,
        "HPCur" : 13,
        "MPMax" : 70,
        "MPCur" : 70,
        "Attack" : 16,
        "Defence" : 11,
        "Defending": false,
        "Wisdom" : 10,
        "Speed" : 13,
        "TurnValue" : 0,
        "Luck" : 5,
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
    "Spells" : [],
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

var Carniverous_Canary = {
    "Name" : "Carniverous Canary",
    "Genus" : "Carniverous Canary",
    "Family" : "Avian",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 8,
        "HPCur" : 8,
        "MPMax" : 130,
        "MPCur" : 130,
        "Attack" : 5,
        "Defence" : 7,
        "Defending": false,
        "Wisdom" : 17,
        "Speed" : 15,
        "TurnValue" : 0,
        "Luck" : 10,
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
    "Spells" : [AirBolt],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 5,
        "HPCur" : 5,
        "MPMax" : 130,
        "MPCur" : 130,
        "Attack" : 15,
        "Defence" : 13,
        "Defending": false,
        "Wisdom" : 12,
        "Speed" : 12,
        "TurnValue" : 0,
        "Luck" : 5,
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
    "Spells" : [],
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
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 20,
    "BattleStats" : {
        "HPMax" : 16,
        "HPCur" : 16,
        "MPMax" : 60,
        "MPCur" : 60,
        "Attack" : 12,
        "Defence" : 8,
        "Defending": false,
        "Wisdom" : 14,
        "Speed" : 5,
        "TurnValue" : 0,
        "Luck" : 4,
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
    "Spells" : [FireBolt],
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



wildMonsterList = [Giant_Rat, Mud_Slipper, Giant_Centipede, Bed_Biter, Error_Ant, Carniverous_Canary, Magic_Sword, Orange_Ooze];