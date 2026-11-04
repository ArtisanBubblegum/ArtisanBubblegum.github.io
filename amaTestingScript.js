let testLimit = 10;
let testNum = 1;
let testDir = "up";
let seconds = 0;

setInterval( () => {animStep()}, 100);

function animStep(){
	if (testNum == 1){
			document.getElementById("TestCanvas").textContent = "|*---------|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testDir = "up";
				testNum ++;
			}
	}
	else if (testNum == 2){
			document.getElementById("TestCanvas").textContent = "|-*--------|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 3){
			document.getElementById("TestCanvas").textContent = "|--*-------|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 4){
			document.getElementById("TestCanvas").textContent = "|---*------|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 5){
			document.getElementById("TestCanvas").textContent = "|----*-----|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 6){
			document.getElementById("TestCanvas").textContent = "|-----*----|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 7){
			document.getElementById("TestCanvas").textContent = "|------*---|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 8){
			document.getElementById("TestCanvas").textContent = "|-------*--|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum ==  9){
			document.getElementById("TestCanvas").textContent = "|--------*-|";
			if (testDir == "up"){
				testNum ++;
			}
			else {
				testNum --;
			}
	}
	else if (testNum == 10){
			document.getElementById("TestCanvas").textContent = "|---------*|";
			if (testDir == "up"){
				testDir = "down";
				testNum --;
			}
			else {
				testNum --;
			}
	}
}

if (localStorage.getItem("PlayTime") == null){
	localStorage.setItem("PlayTime", 0);
}
else {
	seconds = localStorage.getItem("PlayTime");
}

setInterval( () => {storePlayTime()}, 1000);

function storePlayTime(){
	seconds++;
	localStorage.setItem("PlayTime", seconds);
}
