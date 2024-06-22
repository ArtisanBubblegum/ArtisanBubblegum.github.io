var aggressivePhysical = {
    think (mon){
        if (Math.random() <= mon.BattleStats.HPCur/mon.BattleStats.HPMax){
            mon.Action = "attack";
        }
        else {
            mon.Action = "defend";
        }
    }
}

var defensivePhysical = {
    think (mon){
        if (Math.random() <= mon.BattleStats.HPCur/mon.BattleStats.HPMax){
            mon.Action = "defend";
        }
        else {
            mon.Action = "attack";
    }
    }
}

var aggressiveMagical ={ 
    think (mon){
        if (Math.random() <= mon.BattleStats.HPCur/mon.BattleStats.HPMax){
            if (Math.random() <= mon.BattleStats.MPCur/mon.BattleStats.MPMax){
                mon.Action = mon.Spells[0];
            }
            else {
                mon.Action = "attack";
            }
        }
        else {
            mon.Action = "defend";
        }
    }
}

var defensiveMagical = {
    think (mon){
        if (Math.random() <= mon.BattleStats.HPCur/mon.BattleStats.HPMax){
            mon.Action = "defend";
        }
        else {
            if (Math.random() <= mon.BattleStats.MPCur/mon.BattleStats.MPMax){
                mon.Action = mon.Spells[0];
            }
            else {
                mon.Action = "attack";
            }
        }
    }
}

var mindlessPhysical = {
    think(mon){
        mon.Action = "attack";
    }
}

var mindlessMagical = { 
    think (mon){
        if (Math.random() <= mon.BattleStats.MPCur/mon.BattleStats.MPMax){
            mon.Action = mon.Spells[0];
        }
        else {
            mon.Action = "attack";
        }
    }
}

var aggressiveHealer = {
    think(mon){
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