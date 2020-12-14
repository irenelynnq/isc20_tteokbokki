//global variables
const statWarning = 0;
const statMain = 1;
const statIntro = 2;
const statTutorial1 = 3;
const statStage1 = 4;
const statFinishedStage1 = 5;
const statTutorial2 = 6;
const statStage2 = 7;
const statTutorial3 = 8;
const statStage3 = 9;
const statFinishedStage3 = 10;
const statEnding = 11;
const statEndingTitle = 12;
const statEndingCredit = 13;
const statGiveup = 14;
const statGiveupTitle = 15;
const statGiveupCredit = 16;

let gameStat;
let giveupButtonNormal;
let giveupButtonHover;

let tutorialImages;
let mainImage;
let warningImage;
let momletter;
let momletterB;
let bgm1;
let bgm2;
let bgm3;
let bgmEnding;
let bgmGiveup;
let currentBgm;
let playing = false;
let ending;

//data tables
let thinkTable;
let sequenceTable;
let fullSequenceTable;


//for stage1
let stage1;
let stage1Time;
let stage1Background;
let stage1FinishedImage;


//for stage2
let stage2;
let buttonImg;
let choiceA;
let choiceB;
let bed1;
let bed2;
let bed3;
let happy1;
let happy2;
let cloud1;
const wait = 2000;
let afterImg;

//for stage3
let stage3;
const lane0 = 285;
const lane1 = 380;
const lane2 = 470;
const goal = 2680;
const semiGoal = 2000;
const charMax = 18;
let start = 80;
//let playerSpeed = 20;
let playerSpeed = 6.5;
let happinessWalkImages;
let happinessBackImages;
let happinessSorryImage;
let passerbyImages;
let passerbyAImages;
let passerbyBImages;
let passerbyCImages;
let stage3Background;
let sorryBox;
let stage3FinishBackground;

//for story
let introImages;
let giveupImages;
let endingImages;
let timeCounter;
let imageIndex;
let giveupTitleImage;
let giveupCreditImage;
let endingTitleImage;
let endingCreditImage;

function preload() {
  happinessWalkImages = [];
  happinessBackImages = [];
  passerbyImages = [];
  passerbyAImages = [];
  passerbyBImages = [];
  passerbyCImages = [];
  introImages = [];
  giveupImages = [];
  endingImages = [];
  // for Stage 2
  choiceA = [];
  choiceB = [];
  //
  stage1 = new Stage1();

  stage2 = new Stage2();

  stage3 = new Stage3();

  preloadEtc();
  preloadImages();
  preloadTutorial();
  preloadData();
  loadStage2();
  soundFormats('mp3', 'ogg');
  preloadSound();

}

function setup() {
  createCanvas(960, 600);
  textFont(momletter);
  gameStat = statWarning;
  imageIndex = 0;
  ending = false;
}

function draw() {
  // background(225);
  switch (gameStat) {
    case statWarning:
      displayWarning();
      break;
    case statMain:
      background(255);
      displayMain();
      break;
    case statIntro:
      drawIntro();
      break;
    case statTutorial1:
      displayTutorial(1);
      break;
    case statStage1:
      stage1.drawStage1();
      drawGiveupButton();
      break;
    case statFinishedStage1:
      stage1.drawStage1Finished();
      break;
    case statTutorial2:
      displayTutorial(2);
      break;
    case statStage2:
      stage2.drawStage2();
      drawGiveupButton();
      break;
    case statTutorial3:
      displayTutorial(3);
      break;
    case statStage3:
      stage3.drawStage3();
      drawGiveupButton();
      break;
    case statFinishedStage3:
      stage3.drawStage3Finished();
      break;
    case statEnding:
      drawEnding();
      break;
    case statEndingTitle:
      drawTitle();
      break;
    case statEndingCredit:
      drawCredit();
      break;
    case statGiveup:
      drawGiveup();
      break;
    case statGiveupTitle:
      drawTitle();
      break;
    case statGiveupCredit:
      drawCredit();
      break;
  }
}


//
function mousePressed() {
  if(gameStat == statStage1 || gameStat == statStage2 || gameStat == statStage3) {
    if(mouseX >= 805 && mouseX <=930 && mouseY >= 535 && mouseY <= 590) {
      //giveupButton clicked
      giveup();
    } else if(gameStat == statStage2){
      stage2.mousePressed2();
    }
  }
}
//
function keyPressed() {
  switch (gameStat) {
    case statWarning:
      if (keyCode === ENTER) {
        gameStat = statMain;
      }
      break;
    case statMain:
      if (keyCode === ENTER) {
        if(!playing) {
          playing = true;
          currentBgm = bgm1;
          currentBgm.loop();
        }
        imageIndex = 0;
        gameStat = statIntro;
      }
      // else if (key == '1') {
      //   gameStat = statTutorial1;
      // } else if (key == '2') {
      //   gameStat = statTutorial2;
      // } else if (key == '3') {
      //   gameStat = statTutorial3;
      // }
      break;
    case statIntro:
      if (keyCode === ENTER){
        if (imageIndex < introImages.length - 1) {
          imageIndex += 1;
        } else if (imageIndex == introImages.length - 1) {
          gameStat = statTutorial1;
          imageIndex = 0;
        }
      }
      break;
    case statTutorial1:
      if (keyCode === ENTER) {
        stage1Time = frameCount;
        stage1.ready();
        gameStat = statStage1;
      }
      break;
    case statStage1:
      stage1.keyPressedStage1();
      break;
    case statFinishedStage1:
      if (keyCode === ENTER) {
        gameStat = statTutorial2;
        currentBgm.stop();
        currentBgm = bgm2;
        currentBgm.loop();
      }
      break;
    case statTutorial2:
      if (keyCode === ENTER) {
        gameStat = statStage2;
        stage2.ready();
      }
      break;
    case statStage2:
      // if (keyCode === ENTER) {
      //   gameStat = statTutorial3;
      // }
      break;
    case statTutorial3:
      if (keyCode === ENTER) {
        stage3.ready();
        gameStat = statStage3;
      }
      break;
    case statStage3:
      stage3.keyPressedStage3();
      break;
    case statEnding:
      if (keyCode === ENTER){
        if (imageIndex < endingImages.length - 1) {
          imageIndex += 1;
          if (imageIndex == endingImages.length - 1) {
            //last image
            timeCounter = millis();
          }
        }
      }
      break;
    case statEndingTitle:
      break;
    case statEndingCredit:
      if (keyCode === ENTER){
        gameStat = statMain;
        currentBgm.stop();
        currentBgm = bgm1;
        currentBgm.loop();
      }
      break;
    case statGiveup:
      if (keyCode === ENTER){
        if (imageIndex < giveupImages.length - 1) {
          imageIndex += 1;
          if (imageIndex == giveupImages.length - 1) {
            //last image
            timeCounter = millis();
          }
        }
      }
      break;
    case statGiveupTitle:
      break;
    case statGiveupCredit:
      if (keyCode === ENTER){
        gameStat = statMain;
        currentBgm.stop();
        currentBgm = bgm1;
        currentBgm.loop();
      }
      break;
  }
}

function displayTutorial(stage) {
  background(255);
  imageMode(CORNER);
  image(tutorialImages[stage - 1], 0, 0);
}

function displayMain() {
  imageMode(CORNER);
  image(mainImage, 0, 0);
}

function displayWarning() {
  imageMode(CORNER);
  image(warningImage, 0, 0);
}

function drawIntro(){
  imageMode(CORNER);
  image(introImages[imageIndex], 0, 0);
}

function drawGiveup(){
  imageMode(CORNER);
  image(giveupImages[imageIndex], 0, 0);
  if(imageIndex == giveupImages.length - 1) {
    if(countSec(3, timeCounter)) {
      gameStat = statGiveupTitle;
      imageIndex = 0;
      timeCounter = millis();
    }
  }
}

function drawEnding(){
  imageMode(CORNER);
  image(endingImages[imageIndex], 0, 0);
  if(imageIndex == endingImages.length - 1) {
    if(countSec(3, timeCounter)) {
      gameStat = statEndingTitle;
      imageIndex = 0;
      timeCounter = millis();
    }
  }
}

function drawTitle(){
  imageMode(CORNER);
  if (ending){
    image(endingTitleImage, 0, 0);
    if(countSec(2, timeCounter)) {
      gameStat = statEndingCredit;
    }
  } else {
    image(giveupTitleImage, 0, 0);
    if(countSec(2, timeCounter)) {
      gameStat = statGiveupCredit;
    }
  }

}
function drawCredit(){
  imageMode(CORNER);
  if (ending){
    image(endingCreditImage, 0, 0);
  } else {
    image(giveupCreditImage, 0, 0);
  }
}

function drawGiveupButton(){
  if(mouseX >= 805 && mouseX <=930 && mouseY >= 535 && mouseY <= 590) {
    //hover
    imageMode(CORNER);
    image(giveupButtonHover, 805, 535);
  } else {
    imageMode(CORNER);
    image(giveupButtonNormal, 805, 535);
  }
}


function countSec(sec, standard){
  if(millis() >= standard + (sec * 1000)) {
    return true;
  } else {
    return false;
  }
}

function giveup() {
  if (gameStat == statStage1) {
    stage1.hideInput();
  }
  noTint();
  ending = false;
  gameStat = statGiveup;
  currentBgm.stop();
  currentBgm = bgmGiveup;
  currentBgm.loop();

}

function preloadTutorial() {
  tutorialImages = [];
  for (let i = 1; i < 4; i++) {
    tutorialImages.push(loadImage('assets/tutorials/Tutorial' + i + '.png'));
  }
}

function preloadEtc() {
  mainImage = loadImage('assets/etc/MainCover.png');
  momletter = loadFont('assets/etc/a엄마의편지M.ttf');
  momletterB = loadFont('assets/etc/a엄마의편지B.ttf');
  giveupButtonNormal = loadImage('assets/etc/giveupButton2.png');
  giveupButtonHover = loadImage('assets/etc/giveupButton1.png');
}

function preloadData() {
  thinkTable = loadTable('assets/stage1/thinkList.csv', 'csv', 'header', loadThink);
  sequenceTable = loadTable('assets/stage3/sequenceList.csv', 'csv', 'header', loadSequence);
  fullSequenceTable = loadTable('assets/stage3/fullSequenceList.csv', 'csv', 'header', loadFullSequence);
}

function preloadImages() {
  warningImage = loadImage('assets/etc/Warning.png');
  giveupTitleImage = loadImage('assets/etc/GiveUpTitle.png');
  giveupCreditImage = loadImage('assets/etc/GiveUpCredit.png');
  endingTitleImage = loadImage('assets/etc/EndingTitle.png');
  endingCreditImage = loadImage('assets/etc/EndingCredit.png');

  for(let i = 1; i < 7; i++) {
    introImages.push(loadImage('assets/cutScene/Intro' + i + '.png'));
  }
  for(let i = 1; i < 10; i++) {
    giveupImages.push(loadImage('assets/cutScene/GiveUp' + i + '.png'));
    endingImages.push(loadImage('assets/cutScene/Ending' + i + '.png'));
  }
  stage1Background = loadImage('assets/stage1/Stage1Background.png');
  stage1FinishedImage = loadImage('assets/stage1/Stage1Clear.png');
  stage3Background = loadImage('assets/stage3/Stage3Background.png');
  stage3FinishBackground = loadImage('assets/stage3/Stage3FinishBackground.png');
  for (let i = 1; i < 9; i++) {
    happinessWalkImages.push(loadImage('assets/stage3/happinessWalk/HappinessWalk' + i + '.png'));
    passerbyAImages.push(loadImage('assets/stage3/passerbyA/PasserbyA' + i + '.png'));
    passerbyBImages.push(loadImage('assets/stage3/passerbyB/PasserbyB' + i + '.png'));
    passerbyCImages.push(loadImage('assets/stage3/passerbyC/PasserbyC' + i + '.png'));
  }
  passerbyImages.push(passerbyAImages);
  passerbyImages.push(passerbyBImages);
  passerbyImages.push(passerbyCImages);
  happinessBackImages.push(loadImage('assets/stage3/HappinessBack1.png'));
  happinessBackImages.push(loadImage('assets/stage3/HappinessBack2.png'));
  happinessSorryImage = loadImage('assets/stage3/HappinessSorry.png');
  sorryBox = loadImage('assets/stage3/SorryBox.png');

  //for stage2
  buttonImg = loadImage('assets/stage2/WillButtonTest.png');
  bed1 = loadImage('assets/stage2/Bed1.png');
  bed2 = loadImage('assets/stage2/Bed2.png');
  bed3 = loadImage('assets/stage2/Bed3.png');
  happy1 = loadImage('assets/stage2/HappinessLeaving1.png');
  happy2 = loadImage('assets/stage2/HappinessLeaving2.png');
  cloud1 = loadImage('assets/stage2/Cloud1.png');
  for (let i = 0; i < 10; i++) {
    choiceA.push(loadImage('assets/stage2/ChoiceA/ChoiceA' + i + '.png'));
    choiceB.push(loadImage('assets/stage2/ChoiceB/ChoiceB' + i + '.png'));
  }
}

function preloadSound(){
  bgm1 = loadSound('assets/etc/the woods silent partner.mp3');
  bgm2 = loadSound('assets/etc/carried.mp3');
  bgm3 = loadSound('assets/etc/three wise people.mp3');
  bgmEnding = loadSound('assets/etc/wave in the atmosphere.mp3');
  bgmGiveup = loadSound('assets/etc/calmant.mp3');
}

function loadThink() {
  for (let r = 0; r < thinkTable.getRowCount(); r++) {
    stage1.thinkList.push(new Think(thinkTable.getString(r, 1), thinkTable.getNum(r, 2), thinkTable.getNum(r, 3), thinkTable.getNum(r, 4), thinkTable.getNum(r, 5), thinkTable.getNum(r, 6), thinkTable.getNum(r, 7), thinkTable.getNum(r, 8), thinkTable.getNum(r, 9)));
  }
}

function loadSequence() {
  for (let r = 0; r < sequenceTable.getRowCount(); r++) {
    stage3.sequence.push(sequenceTable.getString(r, 1));
    stage3.sequenceE.push(sequenceTable.getString(r, 2));
  }
}

function loadFullSequence(){
  for (let r = 0; r < fullSequenceTable.getRowCount(); r++) {
    stage3.sequenceFull.push(fullSequenceTable.getString(r, 1).toString());
  }
}

function loadStage2(){
  stage2.text1.push(' ');
  stage2.text1.push('근데 도저히 일어날 힘이 없어...');
  stage2.text1.push('맞아... 그치만 못 일어나겠어 정말...');
  stage2.text1.push('몰라... 그냥 침대 밑으로 조용히 가라앉고 싶어.');
  stage2.text1.push('그러게... 나 정말 제정신이 아닌 것 같아...');
  stage2.text1.push('그래 이것만 보고...');
  stage2.text1.push('이것만......');
  stage2.text1.push('조급해하지말자. 일단 이불이라도 걷었으니까...');
  stage2.text1.push('음... 급하게 일어나니 어지러운데 다시 누울까...');
  stage2.text1.push('그나저나... 내가 지금 떡볶이를 먹을 자격이 있나...');
  stage2.text1.push('그래, 가자.');
  //
  stage2.text2.push(' ');
  stage2.text2.push('아... 그치만 씻어야되는데...');
  stage2.text2.push('아니, 넌 아무래도 그럴 마음이 없는 것 같아.');
  stage2.text2.push('그래서 어제도 그렇게 1시간을 더 누워있었지.');
  stage2.text2.push('아니, 핑계 대지마 제발. 넌 그냥 게으를 뿐이야.');
  stage2.text2.push('그럼 평생 누워있을거야? 아주 이대로 죽으려고?');
  stage2.text2.push('근데 그럼 과연 슬퍼해줄 사람은 있을까...');
  stage2.text2.push('휴... 안되겠다. 넌 이불 덮고 있을 자격도 없어.');
  stage2.text2.push('제발. 천장만 본다고 달라지는건 아무것도 없어.');
  stage2.text2.push('안돼. 제발 1분만이라도 인내라는 걸 좀 해봐.');
  stage2.text2.push('아, 몰라. 일단 먹고 생각할래.');
}
