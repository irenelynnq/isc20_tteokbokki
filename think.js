class Think {
  constructor(str, startTime, endTime, startX, startY, endX, endY, angle, fontSize) {
    this.str = str;
    this.x = startX;
    this.y = startY;
    this.startTime = startTime;
    this.endTime = endTime;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.angle = angle;
    this.fontSize = fontSize;
    this.on = true;
    this.moveX = (endX - startX) / (endTime - startTime);
    this.moveY = (endY - startY) / (endTime - startTime);
  }

  reOn() {
    this.on = true;
  }
  off() {
    this.on = false;
  }

  show() {
    if (this.on && frameCount > stage1Time + this.startTime) {
      angleMode(DEGREES);
      textAlign(CENTER);
      textSize(this.fontSize);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      text(this.str, 0, 0);
      pop();
    }
  }

  move() {
    if(this.moveX > 0) {
      this.x = constrain(this.startX + this.moveX * (frameCount - (stage1Time + this.startTime)), this.startX, this.endX);
    } else if (this.moveX < 0) {
      this.x = constrain(this.startX + this.moveX * (frameCount - (stage1Time + this.startTime)), this.endX, this.startX);
    }

    if(this.moveY > 0) {
      this.y = constrain(this.startY + this.moveY * (frameCount - (stage1Time + this.startTime)), this.startY, this.endY);
    } else if (this.moveY < 0){
      this.y = constrain(this.startY + this.moveY * (frameCount - (stage1Time + this.startTime)), this.endY, this.startY);
    }


  }

  getString() {
    return this.str;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getOn() {
    return this.on;
  }

}
