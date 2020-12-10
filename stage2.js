class Stage2 {

constructor() {
    this.buttonLeft = [];
    this.buttonRight = [];
    this.text1 = [];
    this.text2 = [];
    this.buttonNum = 0;
    //this.textShow = false;
    this.textLeft = false;
    this.textRight = false;
    //처음 버튼 뜨는 시간
    this.timedue = 2;
    this.time = 0;
    this.d = 0;
    this.clouds = [];
  }

ready() {
    this.buttonLeft = [];
    this.buttonRight = [];
    // this.text1 = [];
    // this.text2 = [];
    this.buttonNum = 0;
    //this.textShow = false;
    this.textLeft = false;
    this.textRight = false;
    //
    this.time = millis();
    this.clouds = [];
    this. d = 0;

    //
    afterImg = bed3;
    //구름 제작
   for(let i=0; i<6; i++) {
     let x = random(0, 400);
     let y = random(0, 300);
     //속도
     let speed = random(0.01, 0.2);
     this.clouds.push(new Cloud(x, y, speed));
   }
     //버튼 생성
   for(let i=0; i<10; i++) {
     this.buttonLeft.push(new Button(52, 413, choiceA[i]));
     this.buttonRight.push(new Button(52, 505, choiceB[i]));
   }
}

/*pushButton() {
  let a1 = new Button(52, 413, choiceA[i]);
  let a2 = new Button(52, 505, choiceB[i]);
  this.buttonLeft.push(a1);
  this.buttonRight.push(a2);
}*/

countdown() {
    if(this.timedue>0 && frameCount % 60 == 0)
      this.timedue --;

   if(this.timedue <= 0) {
      return true;
    } else {
      return false;
    }
}

mousePressed2() {
 /*  if (this.buttonLeft[this.buttonNum].contains() ||
  this.buttonRight[this.buttonNum].contains() ) {
     this.buttonLeft[this.buttonNum].showOff();
     this.buttonRight[this.buttonNum].showOff();

     this.textShow = true;

     if (this.buttonNum < 9) {
       this.timedue = 2;
     } else if (this.buttonNum == 9)
       this.timedue = 2;

     this.buttonNum++;
   }*/
  if(this.buttonLeft[this.buttonNum].showing && this.buttonRight[this.buttonNum].showing) {
  if(this.buttonLeft[this.buttonNum].contains()) {
    this.buttonLeft[this.buttonNum].showOff();
    this.buttonRight[this.buttonNum].showOff();

    this.textLeft = true;
    this.textRight = false;

    if (this.buttonNum < 9) {
      this.timedue = 8;
    } else if (this.buttonNum == 9)
      this.timedue = 2;

    this.buttonNum++;
  } else if(this.buttonRight[this.buttonNum].contains()) {
     this.buttonLeft[this.buttonNum].showOff();
     this.buttonRight[this.buttonNum].showOff();

    this.textRight = true;
    this.textLeft = false;

    if (this.buttonNum < 9) {
      this.timedue = 8;
    } else if (this.buttonNum == 9)
      this.timedue = 2;

    this.buttonNum++;
  }
 }
}

afterEffect() {
    if ((millis() - this.time) >= wait && this.d == 0) {
     afterImg = happy1;
     this.d = 1;
     this.time = millis();
   } else if((millis() - this.time) >= wait && this.d == 1) {
     afterImg = happy2;
     this.d = 2;
     this.time = millis();
   } else if((millis() - this.time) >= wait && this.d == 2) {
     this.finish();
   }
}

messageShowLeft() {
    noStroke();
    fill(100);
    textSize(25);
    textAlign(LEFT);
    textFont(momletterB);
    text(this.text1[this.buttonNum], 444, 79);
}

messageShowRight() {
  noStroke();
  fill(100);
  textSize(25);
  textAlign(LEFT);
  textFont(momletterB);
  text(this.text2[this.buttonNum], 444, 79);
}
drawStage2() {
  background(191, 228, 242);
  tint(255);

     // cloud 움직임
    for(let i=0; i<this.clouds.length; i++) {
      this.clouds[i].move();
      this.clouds[i].display();
    }

    // button 누를 때 배경
     if(this.buttonNum < 7) {
       //background(bed1);
       image(bed1, 0, 0);
     } else if (this.buttonNum < 8) {
       // background(bed2);
       image(bed2, 0, 0);
     } else {
       // background(bed3);
       image(bed3, 0, 0);
     }

     // button 전부 누르면
    if(this.buttonNum >= 10) {
      image(afterImg, 0, 0);
      //background(img);
      noStroke();
      fill(100);
      textSize(25);
      textAlign(LEFT);
      textFont(momletterB);
      if(this.textLeft) {
      text("그래, 가자.", 741, 79);
    } else if (this.textRight) {
      text("아, 몰라. 일단 먹고 생각할래.", 655, 79);
    }

      //if(this.countdown()) {
        this.afterEffect();
      //}
    } else {
      if(this.textLeft == true) {
        this.messageShowLeft();
      } else if (this.textRight == true) {
        this.messageShowRight();
      }
      if(this.countdown()) {
        tint(this.buttonLeft[this.buttonNum].tint);
        //this.buttonLeft[this.buttonNum].on == true;
        this.buttonLeft[this.buttonNum].show();

        tint(this.buttonRight[this.buttonNum].tint);
        //this.buttonRight[this.buttonNum].on == true;
        this.buttonRight[this.buttonNum].show();

        tint(255);
      }
    }
}

finish() {
  noTint();
  gameStat = statTutorial3;
}

}
