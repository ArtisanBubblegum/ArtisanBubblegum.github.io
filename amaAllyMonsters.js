var PartyList = []

var Ally1 = {
    "Name" : "George Markus",
    "Genus" : "Giant Rat",
    "GenusObj" : {},
    "Family" : "Beast",
    "Age" : 1,
    "LifeSpan" : 1,
    "DeathChance" : 0.5,
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
        "GrowthRate" : 1.25 //1+(stat_value/10)?
    },
    "MagicCon" : {
        "FireCon" : 0,
        "EarthCon" : 0,
        "MetalCon" : 0,
        "WaterCon" : 0,
        "WoodCon" : 0,
        "VoidCon" : 0
    },
    "Spells" : [Meditate, EarthBolt],
    "LearnableSpells" : [],
    "Tactic" : mindlessMagical,
    "Action" : "defend",
    "Target" : {},
    "isWild" : false,

    populate(target){
        //this.Name = "George Markus II";
        this.Genus = target.Genus;
        this.GenusObj = target;
        this.Family = target.Family;
        this.Age = 1;
        this.LifeSpan = target.LifeSpan;
        this.DeathChance = target.DeathChance;
        this.Level = 1;
        this.EXP = 0;
        this.expToLevel = Math.floor(target.expToLevel * target.GrowthStats.GrowthRate);
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
        this.populate(this.GenusObj);
        this.Age = 1;
    },
    addAge(x){
        let previousAge = this.Age;
        this.Age += x;
        if (this.Age > this.LifeSpan
            && Math.floor(Math.random()) <= this.DeathChance)
        {
            this.die();
            dialogObj.write("+++ " + this.Name + " has died due to old age. +++")
        }
        else if (previousAge < this.LifeSpan*0.9
            && this.Age >= this.LifeSpan*0.9)
        {
            dialogObj.write("++ " + this.Name + " has grown old. ++");
        }
    },
    die(){
        this.Genus = "R.I.P."
        this.BattleStats.HPCur = -1;
        this.BattleStats.MPCur = -1;
    },
    levelUP(){
        //dialogObj.write("-");
        dialogObj.write(this.Name + " Gained a Level!");
        this.Level += 1;
        dialogObj.write("( Level: " + AllyList[x].Level + " )");
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
        this.expToLevel += this.expToLevel * this.GrowthStats.GrowthRate;
        this.expToLevel = Math.floor(this.expToLevel);
        //dialogObj.write("-");
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
            dialogObj.write("+++ " + this.Name + " combusts into acrane fire, dieing of Fire Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.Fire >= 50 && startingFire < 50){
            dialogObj.write("++ A visable steam starts to billow out from " + this.Name + ". ++")
        }
        
        if (this.MagicCon.EarthCon >= 100){
            dialogObj.write("+++ " + this.Name + " crumbles into arcane dust, dieing of Earth Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.EarthCon >= 50 && startingEarth < 50){
            dialogObj.write("+++ " + this.Name + "'s body starts to crack grind like stone. +++")
        }
        
        if (this.MagicCon.MetalCon >= 100){
            dialogObj.write("+++ " + this.Name + " suddenlty falls over lifelessly, dieing of Metal Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.MetalCon >= 50 && startingMetal < 50){
            dialogObj.write("++ You get an unluck feeling about " + this.Name + ". ++")
        }
        
        if (this.MagicCon.WaterCon >= 100){
            dialogObj.write("+++ " + this.Name + " slumps into a floppy piles as their inside liquefy, dieing of Water Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.WaterCon >= 50 && startingWater < 50){
            dialogObj.write("++ " + this.Name + " seems to wobble and jiggle as they move. ++")
        }
        
        if (this.MagicCon.WoodCon >= 100){
            dialogObj.write("+++ " + this.Name + " bursts open sprouting vines and mushrooms, dieing of Wood Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.WoodCon >= 50 && startingWood < 50){
            dialogObj.write("++ " + this.Name + "'s body starts to bloat, and moldy oder eminates from them. ++")
        }
        
        if (this.MagicCon.VoidCon >= 100){
            dialogObj.write("+++ " + this.Name + " fades out of existance, dieing of Void Contamination. +++");
            if (gameState = "battle"){
                this.BattleStats.HPCur = 0;
            }
            else {
                this.reset()
            }
        }
        else if (this.MagicCon.VoidCon >= 50 && startingVoid < 50){
            dialogObj.write("++ " + this.Name + " become a little blurry around the edges. ++")
        }
        
    }
}

function drawStatus(mon) {
    document.getElementById("DialogCanvas").textContent = getStatusText(mon);
}

function getStatusText(mon) {
    let text = "";
    text += mon.Name + ": (" + mon.Genus+ ", " + mon.Family + ")\n";
    text += "Age: " + mon.Age + "\n";
    text += "Level: " + mon.Level + " (" + Math.floor(mon.EXP) + "/" + mon.expToLevel + ")\n";
    text += "HP: " + mon.BattleStats.HPCur + " / " + mon.BattleStats.HPMax +"\n";
    text += "MP: " + mon.BattleStats.MPCur + " / " + mon.BattleStats.MPMax + "\n";
    text += "Attack: " + mon.BattleStats.Attack + "\n";
    text += "Defence: " + mon.BattleStats.Defence + "\n";
    text += "Wisdom: " + mon.BattleStats.Wisdom + "\n";
    text += "Speed: " + mon.BattleStats.Speed + "\n";
    text += "Luck: " + mon.BattleStats.Luck + "\n";
    text += "Magic Contamination: Fi" + mon.MagicCon.FireCon + "/ Ea" + mon.MagicCon.EarthCon + "/ Me" + mon.MagicCon.MetalCon + "/ Wa" + mon.MagicCon.WaterCon + "/ Wo" + mon.MagicCon.WoodCon + "/ Vo" + mon.MagicCon.VoidCon + "\n";
    return text;
}

// function undrawStatus() {
//     //document.getElementById("DialogCanvas").textContent = "";
// }
//drawStatus();

function LoadParty(){
    PartyList.push({...Ally1});
    PartyList[0].BattleStats = {...Ally1.BattleStats};
    PartyList[0].GrowthStats = {...Ally1.GrowthStats};
    PartyList[0].MagicCon = {...Ally1.MagicCon};
    PartyList[0].Name = "George Markus III";
    PartyList[0].Target = "";
    PartyList[0].populate(Giant_Rat);

    PartyList.push({...Ally1});
    PartyList[1].BattleStats = {...Ally1.BattleStats};
    PartyList[1].GrowthStats = {...Ally1.GrowthStats};
    PartyList[1].MagicCon = {...Ally1.MagicCon};
    PartyList[1].Name = "Mortus the Quick";
    PartyList[1].Target = "";
    PartyList[1].populate(Carnivorous_Canary);
}