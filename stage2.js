class Stage2 {
  constructor() {
    this.bubbles = [];
    this.texts = [];
    this.buttonNum = 0;
    this.textShow = false;
    //처음 버튼 뜨는 시간
    this.timedue = 10;
    this.bright = 10;
    this.time = 0;
    this.d = 0;
    this.clouds = [];
  }

  ready() {
    this.bubbles = [];
    this.buttonNum = 0;
    this.textShow = false;
    //처음 버튼 뜨는 시간
    this.timedue = 1;
    this.bright = 10;
    this.time = millis();
    this.d = 0;
    this.clouds = [];
    //
    this.texts.push(' ');
    this.texts.push('아...씻어야되는데...');
    this.texts.push('도저히 일어날 힘이 없어......');
    this.texts.push('안행복 핸드폰 그만 봐. 몇 시간 째 이러는 거야 대체.');
    this.texts.push('아... 그냥 침대 밑으로 빨려들어가 사라지고 싶다...');
    this.texts.push('뭘까... 이대로 없어져도 전혀 안 이상할 것 같은 기분.');
    this.texts.push('그치만 천장만 본다고 달라지는건 아무것도 없어.');
    this.texts.push('너무 오래 누워있었더니 어지럽다... 지금 몇 시지?');
    this.texts.push('자, 하나둘셋 하면 일어나는 거야 안행복.');
    this.texts.push('근데 내가 과연 떡볶이를 먹을 자격이 있나...');
    this.texts.push('몰라. 일단 먹고 생각할래.');
    //

    img = bed3;

    for(let i=0; i<10; i++) {
      this.pushButton();
    }

    //구름 제작
    for(let i=0; i<6; i++) {
      let x = random(0, 400);
      let y = random(0, 300);
      //속도
      let speed = random(0.01, 0.2);
      this.clouds.push(new Cloud(x, y, speed));
    }
  }

  pushButton() {
    let x = random(20,940);
    let y = random(20,580);
    let b = new Bubble(x, y, bright);
    this.bubbles.push(b);
  }

  countdown() {
    if(this.timedue>0 && frameCount % 60 == 0)
      this.timedue --;

    if(this.timedue == 0)
      return true;
  }

  buttonShow() {
    if(this.bubbles[this.buttonNum].on && this.timedue == 0) {

    if(this.buttonContain(mouseX, mouseY))
      tint(100, 50);

      else
      tint(255, 20 * (this.buttonNum + 1));

      image(buttonImg, this.bubbles[this.buttonNum].x, this.bubbles[this.buttonNum].y);
    }

      else if(this.bubbles[this.buttonNum].on == false) {

      }
  }

   buttonContain(px, py) {
    let a = false;
    let b = false;

      if(this.bubbles[this.buttonNum].x < px && px < (this.bubbles[this.buttonNum].x + 30))
      a = true;

      if(this.bubbles[this.buttonNum].y < py && py < (this.bubbles[this.buttonNum].y + 30))
      b = true;

      if(a && b) {
        return true;
      } else {
        return false;
      }
  }

  mousePressed2() {
    if(this.buttonContain(mouseX, mouseY)) {
    this.bubbles[this.buttonNum].showOff();

    this.textShow = true;

    if(this.buttonNum < 9) {
      this.timedue = int(random(20,30));
    } else if (this.buttonNum == 9)
      this.timedue = 2;

    this.buttonNum++;
    }
  }

  afterEffect() {
    if ((millis() - this.time) >= wait && this.d == 0) {
     img = happy1;
     this.d++;
     this.time = millis();
   } else if((millis() - this.time) >= wait && d > 0) {
     img = happy2;
     this.finish();
   }
  }

  drawStage2() {
    background(191,228,242);
    tint(255);

    // cloud 움직임
    for(let i=0; i<this.clouds.length; i++) {
      this.clouds[i].move();
      this.clouds[i].display();
    }

    // button 누를 때 배경
    if(this.buttonNum < 3) {
      background(bed1);
    } else if (this.buttonNum < 6) {
      background(bed2);
    } else {
      background(bed3);
    }

    // button 전부 누르면
    if(this.buttonNum >= 10) {
      background(img);

      noStroke();
      fill(100);
      textSize(20);
      textAlign(RIGHT);
      textFont(momletter);
      text("몰라.일단 먹고 생각할래.", 945, 65);

      if(this.countdown()) {
        this.afterEffect();
      }
    }  else {
        if(this.textShow == true) {
        noStroke();
        fill(100);
        textSize(20);
        textAlign(RIGHT);
        textFont(momletter);
        text(this.texts[this.buttonNum], 945, 65);
        }
        if(this.countdown())
        this.buttonShow();
      }
  }

  finish(){
    gameStat = statTutorial3;
    hideButton();
  }

}
