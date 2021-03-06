class Stage3 {
  constructor() {
    this.people = [];
    for (let i = 0; i < 3; i++) {
      let arr = [];
      this.people.push(arr);
    }
    this.collidedPeople = [];
    this.sequence = [];
    this.sequenceE = [];
    this.sequenceFull = [];
    this.keyIndex = 0;
    this.personId = 0;
    this.player = new Player();
    this.isSorry = false;
    this.sorryTime = 0;
    this.finishFlag = 2;
    this.timeStandard = 0;
    this.personTime = 0;
    this.fullSequenceIndex = 0;
  }

  ready(){
    this.people = [];
    for (let i = 0; i < 3; i++) {
      let arr = [];
      this.people.push(arr);
    }
    this.collidedPeople = [];
    this.keyIndex = 0;
    this.personId = 0;
    this.player = new Player();
    this.isSorry = false;
    this.sorryTime = 0;
    this.finishFlag = 2;
    this.personTime = millis();
    this.fullSequenceIndex = 0;
  }

  finish(){
    gameStat = statFinishedStage3;
    ending = true;
  }

  drawStage3() {
    background(255);
    this.drawBackground();
    this.drawPeople();
    if(this.finishFlag >= 2) {
      this.showSequence();
    }

    if (this.player.getPos() >= goal && this.player.getY() == lane0) {
      switch (this.finishFlag) {
        case 0:
          if(countSec(1, this.timeStandard)) {
            this.finish();
          }
          break;
        case 1:
          if(countSec(1, this.timeStandard)) {
            this.timeStandard = millis();
            this.finishFlag -= 1;
          }
          break;
        case 2:
          this.timeStandard = millis();
          this.finishFlag -= 1;
          break;
        default:
      }

    }
    if (this.isSorry) {
      this.displaySorry();
    }
    if (millis() >= this.personTime + 6000) {
      //generate random person
      this.personTime = millis();
      let lane = int(random(0, 3));
      this.people[lane].push(new Person(this.personId, lane, int(random(3)), random(0.5, 0.7)));
      this.personId += 1;
    }
  }

  keyPressedStage3() {
    if (!this.isSorry) {
      if (keyCode === UP_ARROW) {
        this.player.up();
      } else if (keyCode === DOWN_ARROW) {
        this.player.down();
      } else {
        this.movePlayer(key.toString());
      }
    }
    return false;
  }

  movePlayer(k) {
    if (k === this.sequenceE[this.keyIndex]) {
      this.keyIndex++;
      if (this.keyIndex >= this.sequence.length) {
        this.keyIndex = 0;
      }
      this.player.go();
      this.passPeople();
    }
  }

  drawBackground() {
    imageMode(CORNER);
    if (this.player.getPos() >= semiGoal) {
      image(stage3Background, start - semiGoal, 0, 2880, 600);
    } else {
      image(stage3Background, start - this.player.getPos(), 0, 2880, 600);
    }

  }

  showSequence() {
    for (let i = this.keyIndex; i < constrain(this.keyIndex + 7, 0, this.sequence.length); i++) {
      textSize(30);
      textFont(momletterB);
      fill(255);
      text(this.sequence[i], (i - this.keyIndex) * 30 + this.player.getX(), this.player.getY() - 100);
    }
    textFont(momletter);

    // if (this.keyIndex > 0) {
    //   for (let i = this.keyIndex - 1; i < constrain(this.keyIndex + 7, 0, this.sequence.length); i++) {
    //     textSize(30);
    //     fill(255);
    //     text(this.sequence[i], (i - this.keyIndex + 1) * 30 + this.player.getX() - 30, this.player.getY() - 120);
    //   }
    //   textSize(30);
    //   fill(255);
    //   text(this.sequence[this.keyIndex - 1], this.player.getX() - 30, this.player.getY() - 90);
    // } else {
    //   for (let i = this.keyIndex; i < this.keyIndex + 8; i++) {
    //     textSize(20);
    //     fill(255);
    //     text(this.sequence[i], (i - this.keyIndex) * 30 + this.player.getX() - 30, this.player.getY() - 120);
    //   }
    // }
  }

  drawPeople() {
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].length > 0) {
        if (this.people[i][0].getX() < -50) {
          //delete people out of the scene
          this.people[i].splice(0, 1);
        }
      }
    }

    for (let i = 0; i < this.people.length; i++) {
      for (let j = 0; j < this.people[i].length; j++) {
        this.people[i][j].move();
        this.people[i][j].show();
        //check collision
        if (this.player.isCollided(this.people[i][j].getX(), this.people[i][j].getY())) {
          if (!this.findPersonId(this.people[i][j].getId())) {
            //없으면
            this.saySorry();
            this.player.slowDown();
            this.collidedPeople.push(this.people[i][j].getId());
          }
        }
      }
      if (this.player.getLane() == i) {
        if (this.finishFlag < 2) {
          this.player.showBack(this.finishFlag);
        } else if(this.isSorry) {
          this.player.showSorry();
        } else {
          this.player.show(this.keyIndex);
        }
      }
    }
  }

  passPeople() {
    for (let i = 0; i < this.people.length; i++) {
      for (let j = 0; j < this.people[i].length; j++) {
        this.people[i][j].pass(this.player.getSpeed());
      }

    }
  }

  findPersonId(id) {
    let res = false;
    for (let i = 0; i < this.collidedPeople.length; i++) {
      if (this.collidedPeople[i] == id) {
        res = true;
        break;
      }
    }
    return res;
  }

  displaySorry() {
    imageMode(CORNER);
    image(sorryBox, this.player.getX() + 35, this.player.getY() - 50, 108, 27);
    if (millis() - this.sorryTime >= 2000) {
      this.isSorry = false;
    }
  }

  saySorry() {
    this.isSorry = true;
    this.sorryTime = millis();
  }

  drawStage3Finished(){
    image(stage3FinishBackground, 0, 0);
    let s;
    textAlign(LEFT, TOP);
    textFont(momletterB);
    textSize(40);
    fill(255);
    if(this.fullSequenceIndex == this.sequenceFull.length) {
      this.timeStandard = millis();
      this.writeSentence(this.sequenceFull[this.sequenceFull.length - 1]);
    } else if (this.fullSequenceIndex > this.sequenceFull.length) {
      this.writeSentence(this.sequenceFull[this.sequenceFull.length - 1]);
      if(countSec(3, this.timeStandard)) {
        gameStat = statEnding;
        currentBgm.stop();
        currentBgm = bgmEnding;
        currentBgm.loop();
        textFont(momletter);
      }
    } else {
      this.writeSentence(this.sequenceFull[this.fullSequenceIndex]);
    }
    if(frameCount % 5 == 0) {
      this.fullSequenceIndex += 1;
    }
  }

  writeSentence(str){
    let limit = int(str.length / charMax);
    for (let i = 0; i < limit; i++) {
      let sub = str.substring(constrain(i * charMax, 0, str.length), constrain((i+1) * charMax, 0, str.length));
      text(sub, 166.5, i * 50 + 76.5);
    }
    let sub = str.substring(limit * charMax, str.length);
    text(sub, 166.5, limit * 50 + 76.5);
  }

}
