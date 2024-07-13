var GenericItem = {
    "Name" : "Generic Item",
    "Description" : "Restores 5 HP.",
    "Mass" : 1,
    "Volume" : 1,
    use (target){
        if (target.BattleStats.HPCur <= 0){
            dialogObj.write("Generic Item does nothing for " + target.Name + "'s corpse.")
            return false;
        }
        let amount = 5;
        if (target.BattleStats.HPCur + amount > target.BattleStats.HPMax){
            amount = target.BattleStats.HPMax - target.BattleStats.HPCur;
        }
        target.BattleStats.HPCur += amount;
        dialogObj.write(target.Name + " eats the Generic Item and heals " + amount + " HP!");
        return true;
    }
}

var HealingPotion = {
    "Name" : "Healing Potion", // M=Vd
    "Description" : "Restores 5 HP, and adds 5 Age.\n Mass: 500g \n Volume 500cm^3", // M/d=V  ---> 10kg/997m^3 ~= 0.010m^3
    "Mass" : 500, //g
    "Volume" : 500, //cm^3
    //density = g/ml
    use (target){
        if (target.BattleStats.HPCur <= 0){
            dialogObj.write("A Healing Potion won't save " + target.Name + "'s corpse.")
            return false;
        }
        let amount = 5;
        if (target.BattleStats.HPCur + amount > target.BattleStats.HPMax){
            amount = target.BattleStats.HPMax - target.BattleStats.HPCur;
        }
        target.BattleStats.HPCur += amount;
        target.Age += 5;
        dialogObj.write(target.Name + " drinks the Healing Potion and heals " + amount + " HP!");
        return true;
    }
}

var MagicEnergyPotion = {
    "Name" : "Magic Energy Potion", // M=Vd
    "Description" : "Restores 5 MP, and adds 5 Age.\n Mass: 500g \n Volume 491cm^3", // M/d=V  ---> 10kg/997m^3 ~= 0.010m^3
    "Mass" : 500, //g
    "Volume" : 491, //cm^3
    //density = g/ml
    use (target){
        if (target.BattleStats.HPCur <= 0){
            dialogObj.write(target.Name + "'s corpse can't drink a Magic Energy Potion.")
            return false;
        }
        let amount = 5;
        if (target.BattleStats.MPCur + amount > target.BattleStats.MPMax){
            amount = target.BattleStats.MPMax - target.BattleStats.MPCur;
        }
        target.BattleStats.MPCur += amount;
        target.Age += 5;
        dialogObj.write(target.Name + " drinks the Magic Energy Potion and regains " + amount + " MP!");
        return true;
    }
}

var RebirthCyrstal = {
    "Name" : "Rebirth Crystal", // M=Vd
    "Description" : "After placing into a monsters corpse, a genetic clone emerges.\n Mass: 1369g \n Volume 412cm^3", // M/d=V  ---> 10kg/997m^3 ~= 0.010m^3
    "Mass" : 1369, //g
    "Volume" : 412, //cm^3
    //density = g/ml
    use (target){
        if (target.BattleStats.HPCur <= 0 && target.isWild == false){
            target.reset();
            dialogObj.write("A baby " + target.Name + " emerges from the corpse.");
            return true;
        }
        else {
            dialogObj.write("It would be cruel to do this now, wait for " + target.Name + " to die first..")
            return false;
        }
    }
}