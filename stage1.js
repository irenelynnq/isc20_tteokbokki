class Stage1 {
  constructor() {
    this.thinkList = [];
    
    this.input = createInput('');
    this.input.position(-9999, -9999);
    this.input.size(800, 40);

    this.thinkNum = 0;
    this.thinkIndex = 0;
  }
  
  ready(){
    this.thinkNum = this.thinkList.length;
    this.input.position(80, 540);
  }
  
  finish(){
    this.input.position(-9999, -9999);
    this.thinkIndex = 0;
    this.thinkNum = this.thinkList.length;
    gameStat = statTutorial2;
  }

  drawStage1() {
    background(220);
    image(stage1Background, 0, 0);

    for (let i = 0; i < this.thinkList.length; i++) {
      this.thinkList[i].move();
      this.thinkList[i].show();
    }

    if (this.thinkNum <= 0) {
      console.log("finish stage 1");
      this.finish();
    }
  }

  keyPressedStage1() {
    if (keyCode === ENTER) {
      this.typedString = this.input.value();
      this.input.value('');
    }
    this.deleteString(this.typedString);
  }

  deleteString(str) {
    //find typed String in the list
    //if the string exists, off String
    if (this.thinkList[this.thinkIndex].getString() == str) {
      this.thinkList[this.thinkIndex].off();
      this.thinkIndex += 1;
      this.thinkNum -= 1;
    }
  }


}