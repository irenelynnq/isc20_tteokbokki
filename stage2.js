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
    this.timedue = 1;
    this.time = 0;
    this.d = 0;
    this.clouds = [];
  }

ready() {
    this.buttonLeft = [];
    this.buttonRight = [];
    this.text1 = [];
    this.text2 = [];
    this.buttonNum = 0;
    //this.textShow = false;
    this.textLeft = false;
    this.textRight = false;
    //
    this.time = millis();
    this.clouds = [];
    //
    this.text1.push(' ');
    this.text1.push('근데 도저히 일어날 힘이 없어...');
    this.text1.push('맞아... 그치만 못 일어나겠어 정말...');
    this.text1.push('아... 그냥 침대 밑으로 빨려들어가 사라지고 싶다.');
    this.text1.push('그러게... 나 정말 제정신이 아닌 것 같아...');
    this.text1.push('그래 이것만 보고...');
    this.text1.push('이것만......');
    this.text1.push('조급해하지마. 일단 이불이라도 걷었으니까...');
    this.text1.push('음... 급하게 일어나니 어지러운데 다시 누울까...');
    this.text1.push('근데 내가 과연 떡볶이를 먹을 자격이 있나...');
    this.text1.push('그래, 가자.');
    //
    this.text2.push(' ');
    this.text2.push('아... 그치만 씻어야되는데...');
    this.text2.push('아니, 넌 아무래도 그럴 마음이 없는 것 같아.');
    this.text2.push('그래서 어제도 그렇게 1시간을 더 누워있었지.');
    this.text2.push('핑계 대지마 제발. 넌 그냥 게으를 뿐이야.');
    this.text2.push('아무래도 미쳤구나 너... 이럴거면 왜 살지?');
    this.text2.push('근데 그럼 슬퍼해줄 사람은 있을까.');
    this.text2.push('안되겠다. 넌 이불 덮고 있을 자격도 없어.');
    this.text2.push('제발. 천장만 본다고 달라지는건 아무것도 없어.');
    this.text2.push('안돼. 제발 1분만이라도 인내라는 걸 좀 해봐.');
    this.text2.push('몰라. 일단 먹고 생각할래.');
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
     this.pushButton();
   }
}

pushButton() {
  let a1 = new Button(320, 550);
  let a2 = new Button(640, 550);
  this.buttonLeft.push(a1);
  this.buttonRight.push(a2);
}

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
  if(this.buttonLeft[this.buttonNum].contains()) {
    this.buttonLeft[this.buttonNum].showOff();
    this.buttonRight[this.buttonNum].showOff();

    this.textLeft = true;
    this.textRight = false;

    if (this.buttonNum < 9) {
      this.timedue = 2;
    } else if (this.buttonNum == 9)
      this.timedue = 2;

    this.buttonNum++;
  } else if(this.buttonRight[this.buttonNum].contains()) {
     this.buttonLeft[this.buttonNum].showOff();
     this.buttonRight[this.buttonNum].showOff();

    this.textRight = true;
    this.textLeft = false;

    if (this.buttonNum < 9) {
      this.timedue = 2;
    } else if (this.buttonNum == 9)
      this.timedue = 2;

    this.buttonNum++;
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
    textFont(momletter);
    text(this.text1[this.buttonNum], 434, 61);
}

messageShowRight() {
  noStroke();
  fill(100);
  textSize(25);
  textAlign(LEFT);
  textFont(momletter);
  text(this.text2[this.buttonNum], 434, 61);
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
      textFont(momletter);
      if(this.textLeft) {
      text("그래, 가자.", 434, 61);
    } else if (this.textRight) {
      text("몰라. 일단 먹고 생각할래.", 434, 61);
    }

      if(this.countdown()) {
        this.afterEffect();
      }
    } else {
      if(this.textLeft == true) {
        this.messageShowLeft();
      } else if (this.textRight == true) {
        this.messageShowRight();
      }
      if(this.countdown()) {
        tint(this.buttonLeft[this.buttonNum].tint);
        this.buttonLeft[this.buttonNum].show();

        tint(this.buttonRight[this.buttonNum].tint);
        this.buttonRight[this.buttonNum].show();

        tint(255);
      }
    }
}

finish() {
  tint(255);
  gameStat = statTutorial3;
}

}
