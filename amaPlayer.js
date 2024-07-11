var PlayerBase = {
    "Name" : "Artisan Skeleton",
    "Genus" : "Skeleton",
    "GenusObj" : {},
    "Family" : "Humanoid",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 100,
    "BattleStats" : {
        "HPMax" : 10,
        "HPCur" : 10,
        "MPMax" : 10,
        "MPCur" : 10,
        "Attack" : 10,
        "Defence" : 10,
        "Defending": false,
        "Wisdom" : 10,
        "Speed" : 10,
        "TurnValue" : 0,
        "Luck" : 10,
        "Aflictions" : []
    },
    "GrowthStats" : {
        "HP" : 1, //0
        "MP" : 1, //0
        "Attack" : 1, //0
        "Defence" : 1, //0
        "Wisdom" : 1, //0
        "Speed" : 1, //0
        "Luck" : 1, //0
        "GrowthRate" : 1.5 //1+(stat_value/10)?
    },
    "MagicCon" : {
        "FireCon" : 0,
        "EarthCon" : 0,
        "MetalCon" : 0,
        "WaterCon" : 0,
        "WoodCon" : 0,
        "VoidCon" : 0
    },
    "Spells" : [],
    "LearnableSpells" : [],
    "Tactic" : aggressivePhysical,
    "Action" : "fight",
    "Target" : "noValidTarget",
    "isWild" : false
}

var Player = {
    "Name" : "Artisan Skeleton",
    "Genus" : "Skeleton",
    "GenusObj" : {},
    "Family" : "Humanoid",
    "Age" : 1,
    "Level" : 1,
    "EXP" : 0,
    "expToLevel" : 100,
    "BattleStats" : {
        "HPMax" : 10,
        "HPCur" : 10,
        "MPMax" : 10,
        "MPCur" : 10,
        "Attack" : 10,
        "Defence" : 10,
        "Defending": false,
        "Wisdom" : 10,
        "Speed" : 10,
        "TurnValue" : 0,
        "Luck" : 10,
        "Aflictions" : []
    },
    "GrowthStats" : {
        "HP" : 1, //0
        "MP" : 1, //0
        "Attack" : 1, //0
        "Defence" : 1, //0
        "Wisdom" : 1, //0
        "Speed" : 1, //0
        "Luck" : 1, //0
        "GrowthRate" : 1.5 //1+(stat_value/10)?
    },
    "MagicCon" : {
        "FireCon" : 0,
        "EarthCon" : 0,
        "MetalCon" : 0,
        "WaterCon" : 0,
        "WoodCon" : 0,
        "VoidCon" : 0
    },
    "Spells" : [],
    "LearnableSpells" : [],
    "Tactic" : aggressivePhysical,
    "Action" : "skip",
    "Target" : "noValidTarget",
    "isWild" : false,

    populate(target){
        //this.Name = "George Markus II";
        this.Genus = target.Genus;
        this.GenusObj = target;
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
        this.MagicCon.FireCon = 0;
        this.MagicCon.EarthCon = 0;
        this.MagicCon.MetalCon = 0;
        this.MagicCon.WaterCon = 0;
        this.MagicCon.WoodCon = 0;
        this.MagicCon.VoidCon = 0;
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
        this.populate(this.GenusObj);
        this.Age = PreviousAge + 1;
    },
    addAge(x){
        this.Age += x;
    },
    die(){
        this.Name = "R.I.P."
        this.BattleStats.HPCur = -100;
        this.BattleStats.MPCur = -100;
    },
    levelUP(){
        dialogObj.write("-");
        dialogObj.write(this.Name + " Gained a Level!");
        //alert (this.Name + " Gained a Level!");
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
                dialogObj.write(this.Name + " learned a new spell!\n" + "~ " + this.LearnableSpells[learnableSpellIndex].Name + " ~");
                //alert(this.Name + " learned a new spell!\n" + this.LearnableSpells[learnableSpellIndex].Name)
                this.Spells.push(this.LearnableSpells[learnableSpellIndex]);
                this.LearnableSpells.splice(learnableSpellIndex, 1);
            }
        }
        this.Level += 1;
        this.expToLevel += this.expToLevel * this.GrowthStats.GrowthRate;
        this.expToLevel = Math.floor(this.expToLevel);
    },
    addMagicCon (fireAdd, earthAdd, metalAdd, waterAdd, woodAdd, voidAdd){
        let startingFire = this.MagicCon.FireCon;
        let startingEarth = this.MagicCon.EarthCon;
        let startingMetal = this.MagicCon.MetalCon;
        let startingWater = this.MagicCon.WaterCon;
        let startingWood = this.MagicCon.WoodCon;
        let startingVoid = this.MagicCon.VoidCon;
        
        if (fireAdd > 0){ // Fire Overcomes Metal, Metal Generates Water
            if (this.MagicCon.MetalCon >= fireAdd){ // 2 1
                this.MagicCon.WaterCon += fireAdd; // 3 1
                this.MagicCon.MetalCon -= fireAdd; // 2 1
                fireAdd = 0; // 1
            }
            else {
                this.MagicCon.WaterCon += this.MagicCon.MetalCon; // 3 2
                fireAdd -= this.MagicCon.MetalCon; // 1 2
                this.MagicCon.MetalCon = 0; // 2
            }
            this.MagicCon.FireCon += fireAdd; // 1 1
        }

        if (earthAdd > 0){ // Earth overcomes Water, Water Generates Wood
            if (this.MagicCon.WaterCon >= earthAdd){ // 2 1
                this.MagicCon.WoodCon += earthAdd; // 3 1
                this.MagicCon.WaterCon -= earthAdd; // 2 1
                earthAdd = 0; // 1
            }
            else {
                this.MagicCon.WoodCon += this.MagicCon.WaterCon; // 3 2
                earthAdd -= this.MagicCon.WaterCon; // 1 2
                this.MagicCon.WaterCon = 0; // 2
            }
            this.MagicCon.EarthCon += earthAdd; // 1 1
        }

        if (metalAdd > 0){ // Metal overcomes Wood, Wood Generates Fire
            if (this.MagicCon.WoodCon >= metalAdd){ // 2 1
                this.MagicCon.FireCon += metalAdd; // 3 1
                this.MagicCon.WoodCon -= metalAdd; // 2 1
                metalAdd = 0; // 1
            }
            else {
                this.MagicCon.FireCon += this.MagicCon.WoodCon; // 3 2
                metalAdd -= this.MagicCon.WoodCon; // 1 2
                this.MagicCon.WoodCon = 0; // 2
            }
            this.MagicCon.MetalCon += metalAdd; // 1 1
        }

        if (waterAdd > 0){ // Water overcomes Fire, Fire Generates Earth
            if (this.MagicCon.FireCon >= waterAdd){ // 2 1
                this.MagicCon.EarthCon += waterAdd; // 3 1
                this.MagicCon.FireCon -= waterAdd; // 2 1
                waterAdd = 0; // 1
            }
            else {
                this.MagicCon.EarthCon += this.MagicCon.FireCon; // 3 2
                waterAdd -= this.MagicCon.FireCon; // 1 2
                this.MagicCon.FireCon = 0; // 2
            }
            this.MagicCon.WaterCon += waterAdd; // 1 1
        }

        if (woodAdd > 0){ // Wood overcomes Earth, Earth Generates Metal
            if (this.MagicCon.EarthCon >= woodAdd){ // 2 1
                this.MagicCon.MetalCon += woodAdd; // 3 1
                this.MagicCon.EarthCon -= woodAdd; // 2 1
                woodAdd = 0; // 1
            }
            else {
                this.MagicCon.MetalCon += this.MagicCon.EarthCon; // 3 2
                woodAdd -= this.MagicCon.EarthCon; // 1 2
                this.MagicCon.EarthCon = 0; // 2
            }
            this.MagicCon.WoodCon += woodAdd; // 1 1
        }

        if (voidAdd > 0){
            this.MagicCon.VoidCon += voidAdd;
        }

        while (this.MagicCon.FireCon > 0
            && this.MagicCon.EarthCon > 0
            && this.MagicCon.MetalCon > 0
            && this.MagicCon.WaterCon > 0
            && this.MagicCon.WoodCon > 0
        ){
            this.MagicCon.FireCon -= 1;
            this.MagicCon.EarthCon -= 1;
            this.MagicCon.MetalCon -= 1;
            this.MagicCon.WaterCon -= 1;
            this.MagicCon.WoodCon -= 1;
            this.MagicCon.VoidCon += 1;
        }
        
        if (this.MagicCon.FireCon >= 100){
            alert(this.Name + " combusts into acrane fire, dieing of Fire Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.Fire >= 50 && startingFire < 50){
            alert("A visable steam starts to billow out from " + this.Name + ".")
        }
        
        if (this.MagicCon.EarthCon >= 100){
            alert(this.Name + " crumbles into arcane dust, dieing of Earth Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.EarthCon >= 50 && startingEarth < 50){
            alert(this.Name + "'s body starts to crack grind like stone.")
        }
        
        if (this.MagicCon.MetalCon >= 100){
            alert(this.Name + " suddenlty falls over lifelessly, dieing of Metal Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.MetalCon >= 50 && startingMetal < 50){
            alert("You get an unluck feeling about " + this.Name + ".")
        }
        
        if (this.MagicCon.WaterCon >= 100){
            alert(this.Name + " slumps into a floppy piles as their inside liquefy, dieing of Water Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.WaterCon >= 50 && startingWater < 50){
            alert("" + this.Name + " seems to wobble and jiggle as they move.")
        }
        
        if (this.MagicCon.WoodCon >= 100){
            alert(this.Name + " bursts open sprouting vines and mushrooms, dieing of Wood Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.WoodCon >= 50 && startingWood < 50){
            alert("" + this.Name + "'s body starts to bloat, and moldy oder eminates from them.")
        }
        
        if (this.MagicCon.VoidCon >= 100){
            alert(this.Name + " fades out of existance, dieing of Void Contamination.");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.VoidCon >= 50 && startingVoid < 50){
            alert("" + this.Name + " become a little blurry around the edges.")
        }
        
    }
}

function LoadPlayer(){
    Player.populate(PlayerBase);
}