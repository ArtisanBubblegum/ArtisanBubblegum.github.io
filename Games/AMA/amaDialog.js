document.getElementById("DialogCanvas").textContent = "";
    
//setInterval( () => {document.getElementById("TestCanvas2").textContent = dialogObj.timeoutMulti;}, 100);
 
dialogObj = {
    continue : false,
    timeout : 50,
    letterTimeout: 1000,
    timeoutMulti : 1,
    letterTimeoutMulti: -1,
    dialogQueue : [],
    dialogWriter : setInterval( () => {console.log("dialogWriter Waiting.")}, this.timeout),

	async write(text){
        if (text == ""){
            this.dialogQueue = [];
            document.getElementById("DialogCanvas").textContent = "";
            clearInterval(this.dialogWriter);
			console.log("Queue Emptied");
        }
        else {
            this.dialogQueue.push(text);
            console.log(this.dialogQueue.length + "# - " + this.dialogQueue.at(-1));
            if (this.dialogQueue.length == 1){
				document.getElementById("DialogCanvas").textContent = this.dialogQueue[0] + "\n";
				clearInterval(this.dialogWriter);
				this.dialogWriter = setInterval( () => {dialogObj.postLine();}, dialogObj.timeout);
			}
        }
        return true;
    },
	
	postLine(){
		if (this.dialogQueue.length > 1){
			console.log("posting Line");
			document.getElementById("DialogCanvas").textContent += this.dialogQueue[1] + "\n";
			this.dialogQueue.shift();
		}
		else {
			console.log("clearing Line");
			this.dialogQueue = [];
			clearInterval(this.dialogWriter);
			this.dialogWriter = setInterval( () => {console.log("dialogWriter Waiting. again")}, dialogObj.timeout)
		}
	},
	
    waitToWrite(text){
        setTimeout(() => {document.getElementById("DialogCanvas").textContent += text + "\n";}, (this.timeout * this.timeoutMulti));
		this.timeoutMulti -= 1;
        return true;
    },
    waitToClear(){
        setTimeout(() => {document.getElementById("DialogCanvas").textContent = "";}, (this.timeout * this.timeoutMulti));
        this.timeoutMulti = 1;
        return true;
    },
    // async oneLetterLoop(text){
    //     letterTimeoutMulti = -1;
    //     for (i = 0; i > text.length - 1; i++){
    //         letterTimeoutMulti += 1;
    //         setTimeout(() => {document.getElementById("DialogCanvas").textContent += text[i];}, (this.letterTimeout/text.length) * this.letterTimeoutMulti);
    //         //waitingVar = await this.oneLetter(text[i]);
    //     }
    // },
    // oneLetter(letter){
    //     alert(letter);
    //     setTimeout(() => {document.getElementById("DialogCanvas").textContent += letter;}, this.timeout);
    //     return true;
    // },
    // write(text){
    //     if (document.getElementById("DialogCanvas").textContent == "..."){
    //         document.getElementById("DialogCanvas").textContent = ""
    //     }
    //     document.getElementById("DialogCanvas").textContent += text + "\n";
    // },
    // test(text){
    //     if (document.getElementById("DialogCanvas").textContent == "..."){document.getElementById("DialogCanvas").textContent = ""}
    //     document.getElementById("DialogCanvas").textContent += text + "\n";
    // },
    unwrite(){
        document.getElementById("DialogCanvas").textContent = "";
        // for (index = this.activeTimeouts.length; index > 0; index++){
        //     clearTimeout(this.activeTimeouts[0]);
        // }
        this.timeoutMulti = 0;
        return true
    },
    // writeAndWait(text, timeout){
    //     setTimeout(() => {
    //         this.write(text);
    //     }, timeout);
    // }
}

//setInterval( () => {document.getElementById("TestCanvas3").textContent = dialogObj.dialogQueue.length;}, 100);
//var dialogWriter = setInterval( () => {dialogObj.postLine();}, dialogObj.timeout);
