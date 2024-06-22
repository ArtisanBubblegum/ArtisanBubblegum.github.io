var Enemy1 = {
    "Name" : "Bahd Guie",
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
    "Tactic" : aggressivePhysical,
    "Action" : "defend",
    "Target" : {},

    populate(target){
        this.Name = target.Name;
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
            this.Spells.push(target.Spells[spell]);
        }
        this.Tactic = target.Tactic;
    },
    reset(){
        var PreviousAge = this.Age;
        this.populate(Giant_Rat);
        this.Age = PreviousAge + 1;
    },
    levelUP(){
        this.BattleStats.HPMax += this.GrowthStats.HP;
        this.BattleStats.HPCur += this.GrowthStats.HP;
        this.BattleStats.MPMax += this.GrowthStats.MP;
        this.BattleStats.MPMas += this.GrowthStats.MP;
        this.BattleStats.Attack += this.GrowthStats.Attack;
        this.BattleStats.Defence += this.GrowthStats.Defence;
        this.BattleStats.Wisdom += this.GrowthStats.Wisdom;
        this.BattleStats.Speed += this.GrowthStats.Speed;
        this.BattleStats.Luck += this.GrowthStats.Luck;
        this.Level += 1;
        this.expToLevel += this.expToLevel * this.GrowthStats.GrowthRate;
        this.expToLevel = Math.floor(this.expToLevel);
        //alert (this.Name + " Gained a Level!");
    }
}
