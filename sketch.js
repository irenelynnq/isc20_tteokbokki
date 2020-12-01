//global variables
const statMain = 0;
const statTutorial1 = 1;
const statStage1 = 2;
const statTutorial2 = 3;
const statStage2 = 4;
const statTutorial3 = 5;
const statStage3 = 6;
const statFinished = 7;
const statFail = 8;

let gameStat;
let giveupButton;

let tutorialImages;
let mainImage;
let momletter;

//data tables
let thinkTable;
let sequenceTable;


//for stage1
let stage1;
let stage1Time;
let stage1Background;


//for stage2
let stage2;
let buttonImg;
let bed1;
let bed2;
let bed3;
let happy1;
let happy2;
let cloud1;
const wait = 2000;
let img;
let bright = 10;


//for stage3
let stage3;
const lane0 = 285;
const lane1 = 380;
const lane2 = 470;
const goal = 2680;
const semiGoal = 2000;
let start = 80;
//let playerSpeed = 20;
let playerSpeed = 6.5;
let happinessWalkImages;
let passerbyImages;
let passerbyAImages;
let passerbyBImages;
let passerbyCImages;
let stage3Background;


function preload() {
  happinessWalkImages = [];
  passerbyImages = [];
  passerbyAImages = [];
  passerbyBImages = [];
  passerbyCImages = [];
  stage1 = new Stage1();

  stage2 = new Stage2();

  stage3 = new Stage3();

  preloadEtc();
  preloadImages();
  preloadTutorial();
  preloadData();

}

function setup() {
  createCanvas(960, 600);
  textFont(momletter);
  gameStat = statTutorial3;
  giveupButton = createButton('포기하기');
  giveupButton.size(110, 40);
  hideButton();
  giveupButton.mousePressed(giveup);
}

function draw() {
  // background(225);
  switch (gameStat) {
    case statMain:
      background(255);
      displayMain();
      break;
    case statTutorial1:
      displayTutorial(1);
      break;
    case statStage1:
      stage1.drawStage1();
      break;
    case statTutorial2:
      displayTutorial(2);
      break;
    case statStage2:
      stage2.drawStage2();
      break;
    case statTutorial3:
      displayTutorial(3);
      break;
    case statStage3:
      stage3.drawStage3();
      break;
    case statFinished:
      background(255);
      fill(0);
      textAlign(CENTER);
      text("떡볶이를 먹었습니다!\n처음부터 다시 하려면 엔터키를 누르세요.", width / 2, height / 2);
      break;
    case statFail:
      background(255);
      fill(0);
      textAlign(CENTER);
      text("떡볶이를 먹지 못했습니다.\n처음부터 다시 하려면 엔터키를 누르세요.", width / 2, height / 2);
      break;
  }
}
//
function mousePressed() {
  if(gameStat == statStage2)
  stage2.mousePressed2();
}
//
function keyPressed() {
  switch (gameStat) {
    case statMain:
      if (keyCode === ENTER) {
        gameStat = statTutorial1;
      }
      break;
    case statTutorial1:
      if (keyCode === ENTER) {
        stage1Time = frameCount;
        stage1.ready();
        displayButton();
        gameStat = statStage1;
      }
      break;
    case statStage1:
      stage1.keyPressedStage1();
      break;
    case statTutorial2:
      if (keyCode === ENTER) {
        displayButton();
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
        displayButton();
        gameStat = statStage3;
      }
      break;
    case statStage3:
      stage3.keyPressedStage3();
      break;
    case statFinished:
      if (keyCode === ENTER) {
        gameStat = statMain;
      }
      break;
    case statFail:
      if (keyCode === ENTER) {
        tint(255);
        gameStat = statMain;
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

function displayButton() {
  giveupButton.position(830, 540);
}

function hideButton() {
  giveupButton.position(-999, -999);
}

function giveup() {
  if (gameStat == statStage1) {
    stage1.hideInput();
  }
  gameStat = statFail;
  hideButton();
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
}

function preloadData() {
  thinkTable = loadTable('assets/stage1/thinkList.csv', 'csv', 'header', loadThink);
  sequenceTable = loadTable('assets/stage3/sequenceList.csv', 'csv', 'header', loadSequence);
}

function preloadImages() {
  stage1Background = loadImage('assets/stage1/Stage1Background.png');
  stage3Background = loadImage('assets/stage3/Stage3Background.png');
  for (let i = 1; i < 9; i++) {
    happinessWalkImages.push(loadImage('assets/stage3/happinessWalk/HappinessWalk' + i + '.png'));
    passerbyAImages.push(loadImage('assets/stage3/passerbyA/PasserbyA' + i + '.png'));
    passerbyBImages.push(loadImage('assets/stage3/passerbyB/PasserbyB' + i + '.png'));
    passerbyCImages.push(loadImage('assets/stage3/passerbyC/PasserbyC' + i + '.png'));
  }
  passerbyImages.push(passerbyAImages);
  passerbyImages.push(passerbyBImages);
  passerbyImages.push(passerbyCImages);

  //for stage2
  buttonImg = loadImage('assets/stage2/WillButtonTest.png');
  bed1 = loadImage('assets/stage2/Bed1.png');
  bed2 = loadImage('assets/stage2/Bed2.png');
  bed3 = loadImage('assets/stage2/Bed3.png');
  happy1 = loadImage('assets/stage2/HappinessLeaving1.png');
  happy2 = loadImage('assets/stage2/HappinessLeaving2.png');
  cloud1 = loadImage('assets/stage2/Cloud1.png');
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
