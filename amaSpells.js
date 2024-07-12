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
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" flings a Fire Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(1, 0, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 5 &&
            Mon.BattleStats.MPMax >= 15 &&
            Mon.BattleStats.Attack >= 20 &&
            Mon.BattleStats.Defence >= 5 &&
            Mon.BattleStats.Wisdom >= 15 &&
            Mon.BattleStats.Speed >= 5 &&
            Mon.BattleStats.Luck >= 5
        ){    
            return true;
        }
        return false;
    }
}

var FireT1 = {
    "Name" : "Mana Burn",
    "Description" : "    Cost: 5mp\n" + "    Flings a Bolt made of arcane fire to burn a target. (Damages MP)",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
            dialogObj.write(user.Name +" flings an Arcane Flame at "+ target.Name +" burning away "+ amount +" Mana!");
            user.addMagicCon(3, 0, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
            else if (value > target.BattleStats.MPCur){
                value = target.BattleStats.MPCur;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 50 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
    }
}

var FireT2 = {
    "Name" : "Arcan Combustion",
    "Description" : "    Cost: 10mp\n" + "    Ignites the target's Mana to Burn their body with their own power!",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
            dialogObj.write(user.Name +" ignites "+ target.Name +"'s Mana, burning away "+ amount +" Mana and dealing " + (Math.floor(amount/2)+1) + " Damage!");
            user.addMagicCon(5, 0, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
            else if (value > target.BattleStats.MPCur){
                value += target.BattleStats.MPCur;
            }
            else {
                value *= 2;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 75 &&
            Mon.BattleStats.Defence >= 30 &&
            Mon.BattleStats.Wisdom >= 45 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
    }
}

var FireT3 = {
    "Name" : "Essence to Ashes",
    "Description" : "    Cost: 15mp\n" + "    Ignites the target's very essence, to purmanently burn away their mind and body.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
            dialogObj.write(user.Name +" flings a Fire Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(7, 0, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 15){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
            else if (value > target.BattleStats.MPCur){
                value += Math.floor(value/2) + target.BattleStats.MPCur + Math.floor(value/2);
            }
            else {
                value += Math.floor(value/2) + value + Math.floor(value/2);
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 20 &&
            Mon.BattleStats.MPMax >= 60 &&
            Mon.BattleStats.Attack >= 100 &&
            Mon.BattleStats.Defence >= 40 &&
            Mon.BattleStats.Wisdom >= 60 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 20
        ){    
            return true;
        }
        return false;
    }
}

// --- EARTH ---

var EarthBolt = {  //Giant Rat
    "Name" : "Earth Bolt",
    "Description" : "    Cost: 5mp & 5hp\n" + "    Hardens a part of the users body into rock to be flung at the target, dealing heavy damage.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        else if (user.BattleStats.MPCur >= 5){
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
            dialogObj.write(user.Name +" flings an Earth Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(0, 1, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5 ||
            user.BattleStats.HPCur <= 5
        ){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            value *= 2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 15 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 5 &&
            Mon.BattleStats.Wisdom >= 15 &&
            Mon.BattleStats.Speed >= 5 &&
            Mon.BattleStats.Luck >= 5
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" hardens their body, gaining "+ amount +" defence!");
            user.addMagicCon(0, 3, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 30 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" refines their body, gaining "+ amount +" speed!");
            user.addMagicCon(0, 3, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 30 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" flexes their muscles, gaining "+ amount +" attack!");
            user.addMagicCon(0, 5, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 45 &&
            Mon.BattleStats.Defence >= 15 &&
            Mon.BattleStats.Wisdom >= 45 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" ruminates and mumbles to themselves, gaining "+ amount +" wisdom!");
            user.addMagicCon(0, 5, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 15 &&
            Mon.BattleStats.Defence >= 15 &&
            Mon.BattleStats.Wisdom >= 75 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" bows and starts to glow red, gaining "+ amount +" Maximum HP!");
            user.addMagicCon(0, 7, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            value *= 2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 60 &&
            Mon.BattleStats.MPMax >= 60 &&
            Mon.BattleStats.Attack >= 20 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 60 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 20
        ){    
            return true;
        }
        return false;
    }
}

var EarthT3MP = {  //Giant Rat
    "Name" : "Sanguinate Lazuli",
    "Description" : "    Cost: 10hp\n" + "    The user uses the power of the earth to generate additional mental force for themselves.",
    Cast(user, target){

        if (user.BattleStats.HPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.HPCur -= 10;
            let amount = Math.floor(random3() * (effectiveWisdom/2));
            if (amount <= 0) {
                amount = 0;
            }
            user.BattleStats.MPCur += amount;
            user.BattleStats.MPMax += amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" bows and starts to glow blue, gaining "+ amount +" Maximum MP!");
            user.addMagicCon(0, 7, 0, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough HP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = GetEffectiveWisdom(user)/2;
            value *= 2;
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 20 &&
            Mon.BattleStats.MPMax >= 100 &&
            Mon.BattleStats.Attack >= 20 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 60 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 20
        ){    
            return true;
        }
        return false;
    }
}

// --- METAL ---

var MetalBolt = {
    "Name" : "Metal Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a glob of metal to be flung at the target, pearing through their defences.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" flings a Metal Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(0, 0, 1, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 5 &&
            Mon.BattleStats.MPMax >= 15 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 5 &&
            Mon.BattleStats.Wisdom >= 15 &&
            Mon.BattleStats.Speed >= 5 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
    }
}

var MetalT1Def = {
    "Name" : "Shell Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their defences.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Defence -= amount;
            if (target.BattleStats.Defence < 1){
                amount = target.BattleStats.Defence - 1;
                target.BattleStats.Defence = 1;
            }
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" defence!");
            user.addMagicCon(0, 0, 3, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));
            if (value < 0){
                value = 0;
            }
            else if (value >= target.BattleStats.Defence){
                value = target.BattleStats.Defence - 1;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 30
        ){    
            return true;
        }
        return false;
    }
}

var MetalT1Atk = {
    "Name" : "Arms Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their will to fight.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Attack -= amount;
            if (target.BattleStats.Attack < 1){
                amount = target.BattleStats.Attack - 1;
                target.BattleStats.Attack = 1;
            }
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" attack!");
            user.addMagicCon(0, 0, 3, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));
            if (value < 0){
                value = 0;
            }
            else if (value >= target.BattleStats.Attack){
                value = target.BattleStats.Attack - 1;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 40 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 30
        ){    
            return true;
        }
        return false;
    }
}

var MetalT1Spd = {
    "Name" : "Speed Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their agility.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Speed -= amount;
            if (target.BattleStats.Speed < 1){
                amount = target.BattleStats.Speed - 1;
                target.BattleStats.Speed = 1;
            }
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" speed!");
            user.addMagicCon(0, 0, 3, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));
            if (value < 0){
                value = 0;
            }
            else if (value >= target.BattleStats.Speed){
                value = target.BattleStats.Speed - 1;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 30
        ){    
            return true;
        }
        return false;
    }
}

var MetalT1Wis = {
    "Name" : "Mind Cutter",
    "Description" : "    Cost: 10mp\n" + "    An arcane blade is swung at the target to cut their thoughts.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)));
            if (amount < 0) {amount = 0};
            target.BattleStats.Wisdom -= amount;
            if (target.BattleStats.Wisdom < 1){
                amount = target.BattleStats.Wisdom - 1;
                target.BattleStats.Wisdom = 1;
            }
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" wisdom!");
            user.addMagicCon(0, 0, 3, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));
            if (value < 0){
                value = 0;
            }
            else if (value >= target.BattleStats.Wisdom){
                value = target.BattleStats.Wisdom - 1;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 40 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 30
        ){    
            return true;
        }
        return false;
    }
}

var MetalT2Crit = {
    "Name" : "Metalic Surge!",
    "Description" : "    Cost: 10mp\n" + "    The user coats themselves in a lucky metal for an all out attack! (Triple Crit Chance)",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
                dialogObj.write("CRITICAL HIT!!!" + user.Name + " loses 1 Luck.");
            }
            else {
                user.BattleStats.Luck += 10;
                dialogObj.write("Normal hit... " + user.Name + " gains 10 Luck!")
            }
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" swings a Metal Blade at "+ target.Name +" cutting away "+ amount +" health!");
            user.addMagicCon(0, 0, 5, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*2) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6)); //Effective Wisdom has a teir bonus of *2
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 45 &&
            Mon.BattleStats.Defence >= 15 &&
            Mon.BattleStats.Wisdom >= 45 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 75
        ){    
            return true;
        }
        return false;
    }
}

var MetalT3Multi = {
    "Name" : "Lucky Volley",
    "Description" : "    Cost: 15mp\n" + "    The user flings multiple globs of lucky metal at the target. (0-5 Attacks)",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
                dialogObj.write(user.Name +" flings glob " + attackNum + " of lucky metal at "+ target.Name +" causing "+ amount +" damage!");
                
                if (Math.floor(random3()*maxAmount)+1 > amount && attackNum < 5){
                    dropped = true;
                }
            }
            if (dropped){
                dialogObj.write("All remaining globs of Lucky Metal miss their target.")
            }
            user.addMagicCon(0, 0, 7, 0, 0, 0);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 15){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*3) - (GetEffectiveWisdom(target)/7.6) - (GetEffectiveDefence(target)/7.6));//effective wisdom gets a teir bonus of *3
            if (value < 0){
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 20 &&
            Mon.BattleStats.MPMax >= 60 &&
            Mon.BattleStats.Attack >= 80 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 60 &&
            Mon.BattleStats.Speed >= 60 &&
            Mon.BattleStats.Luck >= 100
        ){    
            return true;
        }
        return false;
    }
}

// --- WATER ---

var WaterBolt = {
    "Name" : "Water Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a bolt of water to be flung at the target, sometimes making them trip.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 5;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount <= 0) {
                amount = 0
                dialogObj.write(user.Name +" flings a Water Bolt, but misses "+ target.Name +"!");
            }
            else {
                target.BattleStats.Aflictions.push("Trip");
                //dialogObj.write(target.BattleStats.Aflictions[0]);
                target.BattleStats.HPCur -= amount;
                dialogObj.write(user.Name +" flings a Water Bolt at "+ target.Name +" dealing "+ amount +" damage and making the floor slippery!");
            }
            //if(gameState == "battle") {drawBattle();}   
            user.addMagicCon(0, 0, 0, 1, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
            else {
                value += 5; //Because of Trip Effect
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 5 &&
            Mon.BattleStats.MPMax >= 15 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 5 &&
            Mon.BattleStats.Wisdom >= 15 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 5
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" Shakes off some extra weight, and stretches as they gain "+ amount +" speed! Losing " + amount + " defence!" );  
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 40 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 30 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" swells up gaining "+ amount +" defence! Losing " + amount + " speed!" );
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 40 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 40 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" burns away their bulk, gaining "+ amount +" attack! Losing " + amount + " defence!" );
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 40 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" burns away their muscle, gaining "+ amount +" defence! Losing " + amount + " attack!" );
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 40 &&
            Mon.BattleStats.Defence >= 30 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" grows their muscles, gaining "+ amount +" attack! Losing " + amount + " speed!" );
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 40 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" slims their muscles, gaining "+ amount +" speed! Losing " + amount + " attack!" );
            user.addMagicCon(0, 0, 0, 3, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 40 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 30 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" creates a mental barrior on their body gaining "+ amount +" defence! Losing " + amount + " wisdom!" );
            user.addMagicCon(0, 0, 0, 5, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 15 &&
            Mon.BattleStats.Defence >= 45 &&
            Mon.BattleStats.Wisdom >= 75 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" let's out a sigh of relief, gaining "+ amount +" speed! Losing " + amount + " wisdom!" );
            user.addMagicCon(0, 0, 0, 5, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 15 &&
            Mon.BattleStats.Defence >= 15 &&
            Mon.BattleStats.Wisdom >= 75 &&
            Mon.BattleStats.Speed >= 45 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
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
            dialogObj.write(user.Name +" get's all worked up and upset, gaining "+ amount +" attack! Losing " + amount + " wisdom!" );
            user.addMagicCon(0, 0, 0, 5, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 45 &&
            Mon.BattleStats.Defence >= 15 &&
            Mon.BattleStats.Wisdom >= 75 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
    }
}

// --- WOOD ---

var WoodBolt = {
    "Name" : "Wood Bolt",
    "Description" : "    Cost: 5mp\n" + "    generates a bolt of earth to be flung at the target, draining some HP.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
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
            dialogObj.write(user.Name +" heals "+ Math.floor(amount/2) +" and flings a Wood Bolt at "+ target.Name +" dealing "+ amount +" damage!\n And Heals " + (Math.floor(amount/2)+1) + " Health!");
            user.addMagicCon(0, 0, 0, 0, 1, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value < 0){
                value = 0;
            }
            else {
                value += Math.floor(value/2)+1;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 5 &&
            Mon.BattleStats.MPMax >= 15 &&
            Mon.BattleStats.Attack >= 10 &&
            Mon.BattleStats.Defence >= 10 &&
            Mon.BattleStats.Wisdom >= 15 &&
            Mon.BattleStats.Speed >= 5 &&
            Mon.BattleStats.Luck >= 5
        ){    
            return true;
        }
        return false;
    }
}

var WoodT1HP = {
    "Name" : "Drain Life",
    "Description" : "    Cost: 10mp\n" + "    Magical Vines latch onto the target, draining them of their life force.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.HPCur) {amount = target.BattleStats.HPCur}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.HPCur += amount; //this spell is intended to overheal.
            }
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" summons magic vines that drain "+ amount +" of HP from "+ target.Name +"!");
            user.addMagicCon(0, 0, 0, 0, 3, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value > target.BattleStats.HPCur) {value = target.BattleStats.HPCur}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 40 &&
            Mon.BattleStats.MPMax >= 30 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
    }
}

var WoodT1MP = {
    "Name" : "Drain Mind",
    "Description" : "    Cost: 10mp\n" + "    Magical Vines latch onto the target, draining them of their mental force.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user);
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.MPCur) {amount = target.BattleStats.MPCur}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.MPCur += amount; //this is meant to overcharge mp
            }
            target.BattleStats.MPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" summons magic vines that drain "+ amount +" of MP from "+ target.Name +"!");
            user.addMagicCon(0, 0, 0, 0, 3, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = ((GetEffectiveWisdom(user)/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8));
            if (value > target.BattleStats.MPCur) {value = target.BattleStats.MPCur}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 10 &&
            Mon.BattleStats.MPMax >= 50 &&
            Mon.BattleStats.Attack >= 30 &&
            Mon.BattleStats.Defence >= 20 &&
            Mon.BattleStats.Wisdom >= 30 &&
            Mon.BattleStats.Speed >= 10 &&
            Mon.BattleStats.Luck >= 10
        ){    
            return true;
        }
        return false;
    }
}

var WoodT2Atk = {
    "Name" : "Drain Muscle",
    "Description" : "    Cost: 10mp\n" + "    Summons a swarm of insects that harmlessly transplants the target's muscles into the user.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Attack) {amount = target.BattleStats.Attack - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Attack += amount;
            }
            target.BattleStats.Attack -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write("A swarm of insects appear ripping away " + amount +" attack from "+ target.Name +"! "+ user.Name +" grows stronger!");
            user.addMagicCon(0, 0, 0, 0, 5, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)); //effective wisdom gets a teir bonus of *2
            if (value > target.BattleStats.Attack) {value = target.BattleStats.Attack - 1}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 75 &&
            Mon.BattleStats.Defence >= 45 &&
            Mon.BattleStats.Wisdom >= 45 &&
            Mon.BattleStats.Speed >= 15 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
    }
}

var WoodT2Spd = {
    "Name" : "Drain Blood",
    "Description" : "    Cost: 10mp\n" + "    Summons a swarm of insects that harmlessly transfuses the target's blood into the user.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 2;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Speed) {amount = target.BattleStats.Speed - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Speed += amount;
            }
            target.BattleStats.Speed -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write("A swarm of insects appear and extract blood from " + target.Name +", draining "+ amount +" speed! "+ user.Name +" grows more agile!");
            user.addMagicCon(0, 0, 0, 0, 5, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)); //effective wisdom gets a teir bonus of *2
            if (value > target.BattleStats.Speed) {value = target.BattleStats.Speed - 1}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 15 &&
            Mon.BattleStats.MPMax >= 45 &&
            Mon.BattleStats.Attack >= 45 &&
            Mon.BattleStats.Defence >= 45 &&
            Mon.BattleStats.Wisdom >= 45 &&
            Mon.BattleStats.Speed >= 60 &&
            Mon.BattleStats.Luck >= 15
        ){    
            return true;
        }
        return false;
    }
}

var WoodT3Def = {
    "Name" : "Drain Skin",
    "Description" : "    Cost: 10mp\n" + "    the target's skin peels itself away and layers onto the users.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 3;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Defence) {amount = target.BattleStats.Defence - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Defence += amount;
            }
            target.BattleStats.Defence -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(target.Name + "'s skin starts to peel off and attach to " + user.Name +", draining "+ amount +" defence!");
            user.addMagicCon(0, 0, 0, 0, 5, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*3) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)); //effective wisdom gets a teir bonus of *3
            if (value > target.BattleStats.Defence) {value = target.BattleStats.Defence - 1}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 20 &&
            Mon.BattleStats.MPMax >= 60 &&
            Mon.BattleStats.Attack >= 60 &&
            Mon.BattleStats.Defence >= 100 &&
            Mon.BattleStats.Wisdom >= 60 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 20
        ){    
            return true;
        }
        return false;
    }
}

var WoodT3Wis = {
    "Name" : "Drain Skin",
    "Description" : "    Cost: 10mp\n" + "    Mind eating fungus sprouts from the target, the spores expand the users mind.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 10){
            effectiveWisdom = GetEffectiveWisdom(user) * 3;
            user.BattleStats.MPCur -= 10;
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)));
            if (amount > target.BattleStats.Wisdom) {amount = target.BattleStats.Wisdom - 1}
            if (amount < 0) {amount = 0}
            else {
                user.BattleStats.Wisdom += amount;
            }
            target.BattleStats.Wisdom -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write("Fungus suddenly sprouts from " + target.Name + "! Their mind start's to fade as they release their spores! Losing " + amount + " wisdom!");
            user.addMagicCon(0, 0, 0, 0, 5, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 10){
            value = 0;
        }
        else {
            value = (((GetEffectiveWisdom(user)/2)*3) - (GetEffectiveWisdom(target)/8) - (GetEffectiveDefence(target)/8)); //effective wisdom gets a teir bonus of *3
            if (value > target.BattleStats.Wisdom) {value = target.BattleStats.Wisdom - 1}
            if (value < 0){
                value = 0;
            }
            else {
                value += value;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.HPMax >= 20 &&
            Mon.BattleStats.MPMax >= 60 &&
            Mon.BattleStats.Attack >= 60 &&
            Mon.BattleStats.Defence >= 60 &&
            Mon.BattleStats.Wisdom >= 100 &&
            Mon.BattleStats.Speed >= 20 &&
            Mon.BattleStats.Luck >= 20
        ){    
            return true;
        }
        return false;
    }
}

// --- OTHER ---

var Meditate = {  //Giant Rat
    "Name" : "Meditate",
    "Description" : "    Cost: 1mp\n" + "    The user focuses their mind and body on recovery. (Does NOT overheal)",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 1){
            user.BattleStats.MPCur -= 1;
            let amount = 1; //Math.floor(random3()*effectiveWisdom(user))
            if(amount <= 0 ){
                amount = 1;
            }
            if(user.BattleStats.HPCur+amount > user.BattleStats.HPMax){
                amount = user.BattleStats.HPMax-user.BattleStats.HPCur;
                if (amount < 0) {amount = 0};
            }
            user.BattleStats.HPCur+=amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name + " Healed " + amount + " HP!");
        }
        else {
            dialogObj.write("Not Enough MP!");
        }    
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 1){
            value = 0;
        }
        else {
            if (user.BattleStats.HPCur < user.BattleStats.HPMax){
                value  = 1;
            }
            else {
                value = 0;
            }
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.MPMax >= 10 &&
            Mon.BattleStats.Wisdom >= 10
        ){    
            return true;
        }
        return false;
    }
}

var AirBolt = {  //Carn Canary
    "Name" : "Air Bolt",
    "Description" : "    Cost: 5mp\n" + "    The user conjures a powerful gust of wind.",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 5){
            user.BattleStats.MPCur -= 5;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Speed/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" flings an Air Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(1, 0, 0, 1, 0, 0); 
        }
        else{
            dialogObj.write("Not Enough MP!");
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = (( (user.BattleStats.Wisdom + (user.BattleStats.Speed/2)) /2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)); //effective wisdom gets a teir bonus of *3
            if (value < 0){value = 0;}
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.MPMax >= 5 &&
            Mon.BattleStats.Speed >= 15
        ){    
            return true;
        }
        return false;
    }
}

var VoidBolt = {  //Giant Cent
    "Name" : "Void Bolt",
    Cast(user, target){
        if (typeof(target) != "object"){
            dialogObj.write("No Valid Target!");
            return;
        }

        if (user.BattleStats.MPCur >= 7){
            user.BattleStats.MPCur -= 7;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Wisdom/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            if(gameState == "battle") {drawBattle();}
            dialogObj.write(user.Name +" flings a Void Bolt at "+ target.Name +" dealing "+ amount +" damage!");
            user.addMagicCon(0, 0, 0, 0, 0, 1);
            target.addMagicCon(0, 0, 0, 0, 0, 1);
        }
        else{
            dialogObj.write("Not Enough MP!")
        }
    },
    getValue(user, target){
        let value = 0;
        if (user.BattleStats.MPCur < 5){
            value = 0;
        }
        else {
            value = (( (user.BattleStats.Wisdom + (user.BattleStats.Wisdom/2)) /2) - (target.BattleStats.Wisdom/8) - (target.BattleStats.Wisdom/8)); //effective wisdom gets a teir bonus of *3
            if (value < 0){value = 0;}
        }
        return value;
    },
    CanLearn(Mon){
        if (Mon.BattleStats.MPMax >= 7){    
            return true;
        }
        return false;
    }
}