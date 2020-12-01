class Stage1 {
  constructor() {
    this.thinkList = [];

    this.input = createInput('');
    this.input.position(-9999, -9999);
    this.input.size(700, 40);

    this.thinkNum = 0;
    this.thinkIndex = 0;
  }

  ready(){
    this.input.position(65, 540);
    this.thinkNum = this.thinkList.length;
    this.thinkIndex = 0;
    this.thinkOn();
  }

  finish(){
    this.hideInput();
    gameStat = statTutorial2;
    hideButton();
  }

  thinkOn(){
    for(let i = 0; i < this.thinkList.length; i++) {
      this.thinkList[i].reOn();
    }
  }

  drawStage1() {
    background(255);
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

  hideInput(){
    this.input.position(-9999, -9999);
  }

  displayInput(){
    this.input.position(65, 540);
  }

}
