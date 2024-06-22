// function CastSpell(name, user, target){
//     switch (name){
//         case "Meditate":
//             Meditatex(user,target);
//             break;
//         case "Earth Bolt":
//             EarthBoltx(user,target)
//             break;
//     }
// }

// --- Common Functions ---

function GetEffectiveAttack (Mon) {
    return Mon.BattleStats.Attack * (Mon.BattleStats.HPCur / (Mon.BattleStats.HPMax / 2));
}

function GetEffectiveDefence (Mon) {
    return Mon.BattleStats.Defence * (Mon.BattleStats.HPCur / (Mon.BattleStats.HPMax / 2));
}

function GetEffectiveWisdom (Mon) {
    return Mon.BattleStats.Wisdom * (Mon.BattleStats.MPCur / (Mon.BattleStats.MPMax / 2));
}

// --- FIRE ---

var FireBolt = {
    "Name" : "Fire Bolt",
    "Description" : "    Cost: 5mp\n" + "    Flings a Bolt made of mundane fire to burn a target.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings a Fire Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var FireT1 = {
    "Name" : "Mana Burn",
    "Description" : "    Cost: 5mp\n" + "    Flings a Bolt made of arcane fire to burn a target. (Damages MP)",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.MPCur -= amount;
            if (target.BattleStats.MPCur < 0) {
                amount += target.BattleStats.MPCur;
                target.BattleStats.MPCur = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings an Arcane Flame at "+ target.Name +" burning away "+ amount +" Mana!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var FireT2 = {
    "Name" : "Arcan Combustion",
    "Description" : "    Cost: 10mp\n" + "    Ignites the target's Mana to Burn their body with their own power!",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            target.BattleStats.MPCur -= amount;
            if (target.BattleStats.MPCur < 0) {
                //target.BattleStats.HPCur += target.BattleStats.MPCur;
                target.BattleStats.MPCur = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" ignites "+ target.Name +"'s Mana, burning away "+ amount +" Mana and dealing " + (Math.floor(amount/2)+1) + " Damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var FireT3 = {
    "Name" : "Essence to Ashes",
    "Description" : "    Cost: 15mp\n" + "    Ignites the target's very essence, to purmanently burn away their mind and body.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 15){
            user.BattleStats.MPCur -= 15;
            effectiveWisdom = GetEffectiveWisdom(user);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            target.BattleStats.HPMax -= Math.floor(amount/2);
            target.BattleStats.MPCur -= amount;
            if (target.BattleStats.MPCur < 0) {
                //target.BattleStats.HPCur += target.BattleStats.MPCur;
                target.BattleStats.MPCur = 0;
            }
            target.BattleStats.MPMax -= Math.floor(amount/2);
            if (target.BattleStats.MPMax < 0) {
                //target.BattleStats.HPCur += target.BattleStats.MPCur;
                target.BattleStats.MPMax = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings a Fire Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

// --- EARTH ---

var EarthBolt = {  //Giant Rat
    "Name" : "Earth Bolt",
    "Description" : "    Cost: 5mp & 5hp\n" + "    Hardens a part of the users body into rock to be flung at the target, dealing heavy damage.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            user.BattleStats.HPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            amount *= 2;
            if (amount <= 0) {
                amount = 0;
            }
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings an Earth Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT1Def = {  //Giant Rat
    "Name" : "Harden",
    "Description" : "    Cost: 5mp\n" + "    Hardens the User's body making them more resistant to Physical Attack.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.Defence += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" hardens their body, gaining "+ amount +" defence!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT1Spd = {  //Giant Rat
    "Name" : "Refine",
    "Description" : "    Cost: 5mp\n" + "    Refines the User's body making them more Agile.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.Speed += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" refines their body, gaining "+ amount +" speed!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT2Atk = {  //Giant Rat
    "Name" : "Flex",
    "Description" : "    Cost: 5mp\n" + "    The user flexes their muscles to increase their strength.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.Attack += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flexes their muscles, gaining "+ amount +" attack!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT2Wis = {  //Giant Rat
    "Name" : "Ruminate",
    "Description" : "    Cost: 5mp\n" + "    The user ruminates, causing their mind to expand.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.Wisdom += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" ruminates and mumbles to themselves, gaining "+ amount +" wisdom!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT3HP = {  //Giant Rat
    "Name" : "Sanguinate Crimson",
    "Description" : "    Cost: 10mp\n" + "    The user uses the power of the earth to generate additional life force for themselves.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.HPCur += amount;
            user.BattleStats.HPMax += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" bows and starts to glow red, gaining "+ amount +" Maximum HP!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var EarthT3MP = {  //Giant Rat
    "Name" : "Sanguinate Lazuli",
    "Description" : "    Cost: 10hp\n" + "    The user uses the power of the earth to generate additional mental force for themselves.",
    Cast(user, target){

        if (user.BattleStats.HPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.HPCur -= 10;
            let amount = Math.floor(random3() * (effectiveWisdom/2) * 5);
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.MPCur += amount;
            user.BattleStats.MPMax += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" bows and starts to glow blue, gaining "+ amount +" Maximum MP!");
        }
        else{
            alert("Not Enough HP!")
        }
    }
}

// --- METAL ---

var MetalBolt = {
    "Name" : "Metal Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a glob of metal to be flung at the target, pearing through their defences.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings a Metal Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT1Def = {
    "Name" : "Shell Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their defences.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Defence -= amount;
            if (target.BattleStats.Defence < 0){
                target.BattleStats.Defence = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" defence!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT1Atk = {
    "Name" : "Arms Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their will to fight.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Attack -= amount;
            if (target.BattleStats.Attack < 0){
                target.BattleStats.Attack = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" attack!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT1Spd = {
    "Name" : "Speed Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their agility.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Speed -= amount;
            if (target.BattleStats.Speed < 0){
                target.BattleStats.Speed = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" speed!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT1Wis = {
    "Name" : "Mind Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their thoughts.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Wisdom -= amount;
            if (target.BattleStats.Wisdom < 0){
                target.BattleStats.Wisdom = 0;
            }
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" wisdom!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT2Crit = {
    "Name" : "Metalic Surge!",
    "Description" : "    Cost: 10mp\n" + "    The user coats themselves in a lucky metal for an all out attack! (Triple Crit Chance)",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (Math.floor(Math.random()*1000) <= (user.BattleStats.Luck * 3)){
                if (amount < 1) {amount = 1};
                amount * 3;
                user.BattleStats.Luck -= 1;
                alert("CRITICAL HIT!!!" + user.Name + " loses 1 Luck!");
            }
            else {
                user.BattleStats.Luck += 10;
                alert("MISS!!! " + user.Name + " gains 10 Luck!")
            }
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" defence!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var MetalT3Multi = {
    "Name" : "Lucky Volley",
    "Description" : "    Cost: 15mp\n" + "    The user flings multiple globs of lucky metal at the target. (0-5 Attacks)",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 15){
            effectiveWisdom = GetEffectiveWisdom(user) * 3;
            user.BattleStats.MPCur -= 15;
            let attackNum = 0;
            let dropped = false;
            while (attackNum < 5 && dropped == false){
                attackNum++;
                
                let maxAmount = (effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6);
                maxAmount = Math.floor(maxAmount/5);
                let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
                amount = Math.floor(amount/5);
                if (Math.floor(Math.random()*1000) <= (user.BattleStats.Luck)){
                    if (amount < 1) {amount = 1};
                    amount * 3;
                }
                if (amount < 0) {amount = 0};
                target.BattleStats.HPCur -= amount;
                if(gameState == "battle") {drawBattle();}
                alert(user.Name +" flings glob " + attackNum + " of lucky metal at "+ target.Name +" causing "+ amount +" damage!");
                
                if (Math.floor(random3()*maxAmount)+1 > amount && attackNum < 5){
                    dropped = true;
                }
            }
            if (dropped){
                alert("All remaining globs of Lucky Metal miss their target.")
            }
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

// --- WATER ---

var WaterBolt = {
    "Name" : "Water Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a bolt of water to be flung at the target, sometimes making them trip.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount <= 0) {
                amount = 0
            }
            else {
                target.BattleStats.Aflictions.push("Trip");
                //alert(target.BattleStats.Aflictions[0]);
            }
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings a Water Bolt at "+ target.Name +" dealing "+ amount +" damage and making the floor slippery!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1DeftoSpd = {
    "Name" : "Unburden",
    "Description" : "    Cost: 5mp\n" + "    the user shrugs off some of their bulk to become faster.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Defence){
                amount = user.BattleStats.Defence - 1;
            }
            user.BattleStats.Defence -= amount;
            user.BattleStats.Speed += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" Shakes off some extra weight, and stretches as they gain "+ amount +" speed! Losing " + amount + " defence!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1SpdtoDef = {
    "Name" : "Bulk Up",
    "Description" : "    Cost: 5mp\n" + "    the user swells up as they gain extra bulk to resist physical attacks, becoming slower in the process.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Speed){
                amount = user.BattleStats.Speed - 1;
            }
            user.BattleStats.Speed -= amount;
            user.BattleStats.Defence += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" swells up gaining "+ amount +" defence! Losing " + amount + " speed!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1DeftoStr = {
    "Name" : "Lean-ing",
    "Description" : "    Cost: 5mp\n" + "    The user starts to sweat, burning calories and rappidly building muscle.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Defence){
                amount = user.BattleStats.Defence - 1;
            }
            user.BattleStats.Defence -= amount;
            user.BattleStats.Attack += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" burns away their bulk, gaining "+ amount +" attack! Losing " + amount + " defence!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1StrtoDef = {
    "Name" : "Fortify-ing",
    "Description" : "    Cost: 5mp\n" + "    The user swells up as their bodies consume their muscles to grow extra bulky.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Attack){
                amount = user.BattleStats.Attack - 1;
            }
            user.BattleStats.Attack -= amount;
            user.BattleStats.Defence += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" burns away their muscle, gaining "+ amount +" defence! Losing " + amount + " attack!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1SpdtoStr = {
    "Name" : "Slow Power",
    "Description" : "    Cost: 5mp\n" + "    The user converts fast-twich muscle fibers into slower more powerful muscle fibers.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Speed){
                amount = user.BattleStats.Speed - 1;
            }
            user.BattleStats.Speed -= amount;
            user.BattleStats.Attack += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" grows their muscles, gaining "+ amount +" attack! Losing " + amount + " speed!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT1StrtoSpd = {
    "Name" : "Gentile Agility",
    "Description" : "    Cost: 5mp\n" + "    The user converts slow-twich muscle fibers into faster more agile muscle fibers.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Attack){
                amount = user.BattleStats.Attack - 1;
            }
            user.BattleStats.Attack -= amount;
            user.BattleStats.Speed += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" slims their muscles, gaining "+ amount +" speed! Losing " + amount + " attack!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT2WistoDef = {
    "Name" : "Mental Block",
    "Description" : "    Cost: 10mp\n" + "    Uses their mind to fortify their body.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Wisdom){
                amount = user.BattleStats.Wisdom - 1;
            }
            user.BattleStats.Wisdom -= amount;
            user.BattleStats.Defence += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" creates a mental barrior on their body gaining "+ amount +" defence! Losing " + amount + " wisdom!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT2WistoSpd = {
    "Name" : "Think Fast-er",
    "Description" : "    Cost: 10mp\n" + "    Uses their mind to lighten their body.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Wisdom){
                amount = user.BattleStats.Wisdom - 1;
            }
            user.BattleStats.Wisdom -= amount;
            user.BattleStats.Speed += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" let's out a sigh of relief, gaining "+ amount +" speed! Losing " + amount + " wisdom!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterT2WistoStr = {
    "Name" : "Cerebral Sword",
    "Description" : "    Cost: 10mp\n" + "    converts brain power into power power. The brain sword in mightier that the pen pen.",
    Cast(user, target){

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor( random3()*( effectiveWisdom/2 ) );
            if (amount <= 0) {
                amount = 0
            }
            if (amount >= user.BattleStats.Wisdom){
                amount = user.BattleStats.Wisdom - 1;
            }
            user.BattleStats.Wisdom -= amount;
            user.BattleStats.Attack += amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" get's all worked up and upset, gaining "+ amount +" attack! Losing " + amount + " wisdom!" );
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

// --- WOOD ---

var WoodBolt = {
    "Name" : "Wood Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a bolt of earth to be flung at the target, draining some HP.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.HPCur += Math.floor(amount/2)+1;
            }
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" heals "+ Math.floor(amount/2) +" and flings a Wood Bolt at "+ target.Name +" dealing "+ amount +" damage!\n And Heals " + (Math.floor(amount/2)+1) + " Health!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT1HP = {
    "Name" : "Drain Life",
    "Description" : "    Cost: 10mp\n" + "    Magical Vines latch onto the target, draining them of their life force.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.HPCur) {amount = targe.BattleStats.HPCur}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.HPCur += amount;
            }
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" summons magic vines that drain "+ amount +" of HP from "+ target.Name +"!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT1MP = {
    "Name" : "Drain Mind",
    "Description" : "    Cost: 10mp\n" + "    Magical Vines latch onto the target, draining them of their mental force.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.MPCur) {amount = targe.BattleStats.MPCur}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.MPCur += amount;
            }
            target.BattleStats.MPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" summons magic vines that drain "+ amount +" of MP from "+ target.Name +"!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT2Atk = {
    "Name" : "Drain Muscle",
    "Description" : "    Cost: 10mp\n" + "    Summons a swarm of insects that harmlessly transplants the target's muscles into the user.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Attack) {amount = targe.BattleStats.Attack - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Attack += amount;
            }
            target.BattleStats.Attack -= amount;
            if(gameState == "battle") {drawBattle();}
            alert("A swarm of insects appear ripping away " + amount +" attack from "+ target.Name +"! "+ user.Name +" grows stronger!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT2Spd = {
    "Name" : "Drain Blood",
    "Description" : "    Cost: 10mp\n" + "    Summons a swarm of insects that harmlessly transfuses the target's blood into the user.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Speed) {amount = targe.BattleStats.Speed - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Speed += amount;
            }
            target.BattleStats.Speed -= amount;
            if(gameState == "battle") {drawBattle();}
            alert("A swarm of insects appear and extract blood from " + target.Name +", draining "+ amount +" speed! "+ user.Name +" grows more agile!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT3Def = {
    "Name" : "Drain Skin",
    "Description" : "    Cost: 10mp\n" + "    the target's skin peels itself away and layers onto the users.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 3;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Defence) {amount = targe.BattleStats.Defence - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Defence += amount;
            }
            target.BattleStats.Defence -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(target.Name + "'s skin starts to peel off and attach to " + user.Name +", draining "+ amount +" defence!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WoodT3Wis = {
    "Name" : "Drain Skin",
    "Description" : "    Cost: 10mp\n" + "    Mind eating fungus sprouts from the target, the spores expand the users mind.",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 3;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Wisdom) {amount = targe.BattleStats.Wisdom - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Wisdom += amount;
            }
            target.BattleStats.Wisdom -= amount;
            if(gameState == "battle") {drawBattle();}
            alert("Fungus suddenly sprouts from " + target.Name + "! Their mind start's to fade as they release their spores! Losing " + amount + " wisdom!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

// --- OTHER ---

var Meditate = {  //Giant Rat
    "Name" : "Meditate",
    "Description" : "    Cost: 15mp\n" + "    The user focuses their mind and body on recovery. (Does NOT overheal)",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 15){
            user.BattleStats.MPCur -= 15;
            let amount = Math.floor(random3()*user.BattleStats.Wisdom)
            if(amount <= 0 ){
                amount = 1;
            }
            if(user.BattleStats.HPCur+amount > user.BattleStats.HPMax){
                amount = user.BattleStats.HPMax-user.BattleStats.HPCur;
                if (amount < 0) {amount = 0};
            }
            user.BattleStats.HPCur+=amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name + " Healed " + amount + " HP!")
        }
        else {
            alert("Not Enough MP!")
        }    
    }
}

var AirBolt = {  //Carn Canary
    "Name" : "Air Bolt",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            user.BattleStats.MPCur -= 5;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Speed/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings an Air Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var VoidBolt = {  //Giant Cent
    "Name" : "Void Bolt",
    Cast(user, target){
        if (Object.keys(target) == 0){
            alert("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 7){
            user.BattleStats.MPCur -= 7;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Wisdom/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            alert(user.Name +" flings a Void Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}