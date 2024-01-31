function CastSpell(name, user, target){
    switch (name){
        case "Meditate":
            Meditatex(user,target);
            break;
        case "Earth Bolt":
            EarthBoltx(user,target)
            break;
    }
}

var Meditate = {  //Giant Rat
    "Name" : "Meditate",
    Cast(user, target){
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
}

var EarthBolt = {  //Giant Rat
    "Name" : "Earth Bolt",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 5){
            user.BattleStats.MPCur -= 5;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Defence/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/4)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            drawBattle();
            alert(user.Name +" flings an Earth Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var WaterBolt = {
    "Name" : "Water Bolt",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 4){
            user.BattleStats.MPCur -= 4;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.MPMax/20);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/4)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            drawBattle();
            alert(user.Name +" flings a Water Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var FireBolt = {
    "Name" : "Fire Bolt",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 5){
            user.BattleStats.MPCur -= 5;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Attack/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/4)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            drawBattle();
            alert(user.Name +" flings a Fire Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

var AirBolt = {  //Carn Canary
    "Name" : "Air Bolt",
    Cast(user, target){
        if (user.BattleStats.MPCur >= 5){
            user.BattleStats.MPCur -= 5;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Speed/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/4)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            drawBattle();
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
        if (user.BattleStats.MPCur >= 7){
            user.BattleStats.MPCur -= 7;
            let effectiveWisdom = user.BattleStats.Wisdom + (user.BattleStats.Wisdom/2);
            let amount = Math.floor(random3() * ((effectiveWisdom/2) - (target.BattleStats.Wisdom/4)));
            if (amount < 0) {amount = 0};
            target.BattleStats.HPCur -= amount;
            drawBattle();
            alert(user.Name +" flings a Void Bolt at "+ target.Name +" dealing "+ amount +" damage!");
        }
        else{
            alert("Not Enough MP!")
        }
    }
}

function Meditatex(user, target){
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

function EarthBoltx(user, target){
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
