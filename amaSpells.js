function CastSpell(name, user, target){
    switch (name){
        case "Meditate":
            Meditate(user,target);
            break;
        case "Earth Bolt":
            EarthBolt(user,target)
            break;
    }
}

function Meditate(user, target){
    if (user.BattleStats.MPCur >= 15){
        user.BattleStats.MPCur -= 15;
        let amount = Math.floor(random3()*user.BattleStats.Wisdom)
        if(amount <= 0 ){
            amount = 1;
        }
        if(user.BattleStats.HPCur+amount > user.BattleStats.HPMax){
            amount = user.BattleStats.HPMax-user.BattleStats.HPCur;
        }
        user.BattleStats.HPCur+=amount;
        drawBattle();
        alert(user.Name + " Healed " + amount + " HP!")
    }
    else {
        alert("Not Enough MP!")
    }
}

function EarthBolt(user, target){
    if (user.BattleStats.MPCur >= 5){
        user.BattleStats.MPCur -= 5;
        let amount = Math.floor(random3() * ((user.BattleStats.Wisdom/2) - (user.BattleStats.Wisdom/4)));
        if (amount < 0) {amount = 0}
        target.BattleStats.HPCur -= amount;
        drawBattle();
        alert(user.Name +" flings an Earth Bolt at "+ target.Name +" dealing "+ amount +" damage!");
    }
    else{
        alert("Not Enough MP!")
    }
}
