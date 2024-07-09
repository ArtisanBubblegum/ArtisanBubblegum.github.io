document.getElementById("DialogCanvas").textContent = "";
    
dialogObj = {
    continue : false,
    timeout : 50,
    letterTimeout: 100,
    timeoutMulti : 1,
    letterTimeoutMulti: -1,
    activeTimeouts : [],

    async write(text){
        if (text == ""){
            //document.getElementById("DialogCanvas").textContent = "...";
            this.timeoutMulti += 1;
            waitingVar = await this.waitToClear();
            this.timeoutMulti = 1;
        }
        else {
            // if (document.getElementById("DialogCanvas").textContent == "..."){
            //     document.getElementById("DialogCanvas").textContent = "";
            // }
            this.timeoutMulti += 1;
            waitingVar = await this.waitToWrite(text);
            this.timeoutMulti -= 1;
            
        }
        return true;
    },

    waitToWrite(text){
        console.log("TimeoutMulti: " + this.timeoutMulti + " " + text);
        setTimeout(() => {document.getElementById("DialogCanvas").textContent += text + "\n";}, (this.timeout * this.timeoutMulti));
        //setTimeout(() => {this.oneLetterLoop(text);}, (this.timeout * this.timeoutMulti));
        return true;
    },
    waitToClear(){
        console.log("TimeoutMulti: " + this.timeoutMulti + " ");
        setTimeout(() => {document.getElementById("DialogCanvas").textContent = "";}, (this.timeout * this.timeoutMulti));
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