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
    this.keyIndex = 0;
    this.personId = 0;
    this.player = new Player();
    this.isSorry = false;
    this.sorryTime = 0;
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
    displayButton();
  }

  finish(){
    gameStat = statFinished;
    hideButton();
  }

  drawStage3() {
    background(255);
    this.drawBackground();
    this.drawPeople();
    this.showSequence();

    if (this.player.getPos() >= goal && this.player.getY() == lane0) {
      this.finish();
    }
    if (this.isSorry) {
      this.displaySorry();
    }
    if (frameCount % 400 == 0) {
      //generate random person
      let lane = int(random(0, 3));
      this.people[lane].push(new Person(this.personId, lane, int(random(3)), random(0.5, 0.7)));
      this.personId += 1;
      console.log("generate!" + this.people[lane][0].type);
    }
  }

  keyPressedStage3() {
    if (keyCode === UP_ARROW) {
      this.player.up();
    } else if (keyCode === DOWN_ARROW) {
      this.player.down();
    } else {
      this.movePlayer(key.toString());
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
      image(stage3Background, start - semiGoal, 0);
    } else {
      image(stage3Background, start - this.player.getPos(), 0);
    }

  }

  showSequence() {
    if (this.keyIndex > 0) {
      for (let i = this.keyIndex - 1; i < constrain(this.keyIndex + 7, 0, this.sequence.length); i++) {
        textSize(20);
        fill(255);
        text(this.sequence[i], (i - this.keyIndex + 1) * 30 + this.player.getX() - 30, this.player.getY() - 120);
      }
      textSize(20);
      fill(255);
      text(this.sequence[this.keyIndex - 1], this.player.getX() - 30, this.player.getY() - 90);
    } else {
      for (let i = this.keyIndex; i < this.keyIndex + 8; i++) {
        textSize(20);
        fill(255);
        text(this.sequence[i], (i - this.keyIndex) * 30 + this.player.getX() - 30, this.player.getY() - 120);
      }
    }
  }

  drawPeople() {
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].length > 0) {
        if (this.people[i][0].getX() < -50) {
          //delete people out of the scene
          this.people[i].splice(0, 1);
          console.log("delete " + i + " " + this.people[i].length);
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
        this.player.show(this.keyIndex);
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
    fill(255);
    textAlign(LEFT);
    text("죄송합니다...", 80, 560);
    if (frameCount - this.sorryTime >= 200) {
      this.isSorry = false;
    }
  }

  saySorry() {
    this.isSorry = true;
    this.sorryTime = frameCount;
  }
}
