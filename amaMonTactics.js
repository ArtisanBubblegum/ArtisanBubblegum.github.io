function getAttackValue(user, target){
    let value = 0;
    value = (GetEffectiveAttack(user)/2) - (GetEffectiveDefence(target)/4)
    if (value < 0) {value = 0}
    if (value > target.BattleStats.HPCur * 2){
        value *= 2;
    }
    return value;
}

var aggressivePhysical = {
    Name: "aggressivePhysical",
    think (mon){
        let bestChoice = "skip";
        if (getAttackValue(mon, mon.Target) > 0){
            bestChoice = "attack";
        }
        if (mon.Spells.length > 0){
            let bestSpell = mon.Spells[0];
            for (const spell in mon.Spells){
                if (bestSpell.getValue(mon, mon.Target) < mon.Spells[spell].getValue(mon, mon.Target)) {
                    bestSpell = mon.Spells[spell];
                }
            }
            if (bestSpell.getValue(mon, mon.Target) * 0.9 * (1 - mon.BattleStats.HPCur/mon.BattleStats.HPMax) > getAttackValue(mon, mon.Target)){
                bestChoice = bestSpell;
            }
        }
        if (mon.BattleStats.HPCur < mon.BattleStats.HPMax/2 
            && Math.random() > mon.BattleStats.HPCur/(mon.BattleStats.HPMax/2)
        ){
            bestChoice = "defend"
        }

        if (bestChoice == "skip"){
            dialogObj.write(mon.Name + " Can't decide what to do!");
        }
        mon.Action = bestChoice;
    }
}

var defensivePhysical = {
    Name: "defensivePhysical",
    think (mon){
        let bestChoice = "skip";
        if (getAttackValue(mon, mon.Target) > 0){
            bestChoice = "attack";
        }
        if (mon.Spells.length > 0){
            let bestSpell = mon.Spells[0];
            for (const spell in mon.Spells){
                if (bestSpell.getValue(mon, mon.Target) < mon.Spells[spell].getValue(mon, mon.Target)) {
                    bestSpell = mon.Spells[spell];
                }
            }
            if (bestSpell.getValue(mon, mon.Target) * 0.9 * (1 - mon.BattleStats.HPCur/mon.BattleStats.HPMax) > getAttackValue(mon, mon.Target)){
                bestChoice = bestSpell;
            }
        }
        if (mon.BattleStats.HPCur > mon.BattleStats.HPMax * (3/4)
            || Math.random() < mon.BattleStats.HPCur/(mon.BattleStats.HPMax)
        ){
            bestChoice = "defend"
        }

        if (bestChoice == "skip"){
            dialogObj.write(mon.Name + " Can't decide what to do!");
        }
        mon.Action = bestChoice;
    }
}

var aggressiveMagical ={ 
    Name: "aggressiveMagical",
    think (mon){
        let bestChoice = "skip";
        if (getAttackValue(mon, mon.Target) > 0){
            bestChoice = "attack";
        }
        if (mon.Spells.length > 0){
            let bestSpell = mon.Spells[0];
            for (const spell in mon.Spells){
                if (bestSpell.getValue(mon, mon.Target) < mon.Spells[spell].getValue(mon, mon.Target)) {
                    bestSpell = mon.Spells[spell];
                }
            }
            if (bestSpell.getValue(mon, mon.Target) * 1.1 > getAttackValue(mon, mon.Target)){
                bestChoice = bestSpell;
            }
        }
        if (mon.BattleStats.HPCur < mon.BattleStats.HPMax/2 
            && Math.random() > mon.BattleStats.HPCur/(mon.BattleStats.HPMax/2)
        ){
            bestChoice = "defend"
        }

        if (bestChoice == "skip"){
            dialogObj.write(mon.Name + " Can't decide what to do!");
        }
        mon.Action = bestChoice;
    }
}

var defensiveMagical = {
    Name: "defensiveMagical",
    think (mon){
        let bestChoice = "skip";
        if (getAttackValue(mon, mon.Target) > 0){
            bestChoice = "attack";
        }
        if (mon.Spells.length > 0){
            let bestSpell = mon.Spells[0];
            for (const spell in mon.Spells){
                if (bestSpell.getValue(mon, mon.Target) < mon.Spells[spell].getValue(mon, mon.Target)) {
                    bestSpell = mon.Spells[spell];
                }
            }
            if (bestSpell.getValue(mon, mon.Target) * 1.1 > getAttackValue(mon, mon.Target)){
                bestChoice = bestSpell;
            }
        }
        if (mon.BattleStats.HPCur > mon.BattleStats.HPMax * (3/4)
            || Math.random() < mon.BattleStats.HPCur/(mon.BattleStats.HPMax)
        ){
            bestChoice = "defend"
        }

        if (bestChoice == "skip"){
            dialogObj.write(mon.Name + " Can't decide what to do!");
        }
        mon.Action = bestChoice;
    }
}

var mindlessPhysical = {
    Name: "mindlessPhysical",
    think(mon){
        if (getAttackValue(mon, mon.Target) > 0){
            mon.Action = "attack"
        }
        else {
            mon.Action = "skip"
            dialogObj.write(mon.Name + " flails wildly!")
        }
    }
}

var mindlessMagical = { 
    Name: "mindlessMagical",
    think (mon){
        let bestChoice = "skip";
        if (mon.Spells.length > 0){
            let bestSpell = mon.Spells[0];
            for (const spell in mon.Spells){
                if (bestSpell.getValue(mon, mon.Target) < mon.Spells[spell].getValue(mon, mon.Target)) {
                    bestSpell = mon.Spells[spell];
                }
            }
            if (bestSpell.getValue(mon, mon.Target) > 0){
                bestChoice = bestSpell;
            }
        }

        if (bestChoice == "skip"){
            dialogObj.write(mon.Name + " stares into the distance!");
        }
        mon.Action = bestChoice;
    }
}

var aggressiveHealer = {
    Name: "aggressiveHealer",
    think(mon){
        alert("ERROR #80085: Depricated Tactics Block in use, please alert developer!")
        if (Math.random() <= mon.BattleStats.HPCur/mon.BattleStats.HPMax){
            mon.Action = "attack";
        }
        else {
            if (mon.BattleStats.HPCur/mon.BattleStats.HPMax < mon.Target.BattleStats.HPCur/mon.Target.BattleStats.HPMax){
                if (Math.random() <= mon.BattleStats.MPCur/mon.BattleStats.MPMax){
                    //alert(mon.Spells[0].Name);
                    mon.Action = mon.Spells[0];
                    
                }
                else {
                    //alert("defend");
                    mon.Action = "defend";
                    
                }
            }
            else {
                if (Math.random() <= mon.BattleStats.MPCur/mon.BattleStats.MPMax){
                    //alert(mon.Spells[1].Name);
                    mon.Action = mon.Spells[1];
                    
                }
                else {
                    //alert("attack");
                    mon.Action = "attack";
                    
                }
            }
        }
    }
}