class Player {
  constructor(){
    this.x = start;
    this.y = lane0;
    this.pos = start;
    this.dia = 75;
    this.speed = playerSpeed;
  }
  
  getPos(){
    return this.pos;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getSpeed(){
    return this.speed;
  }
  getLane(){
    if(this.y == lane0){
      return 0;
    } else if (this.y == lane1){
      return 1;
    } else {
      return 2;
    }
  }
  
  
  show(index){
    imageMode(CENTER);
    if(this.pos > semiGoal) {
      image(happinessWalkImages[index % 8], this.x + (this.pos - semiGoal), this.y);
    } else {
      image(happinessWalkImages[index % 8], this.x, this.y);
    }
    
  }
  
  go(){
    if (this.pos + this.speed < goal){
      this.pos += this.speed;
    } else {
      this.pos = goal;
    }
  }
  
  up(){
    console.log("up");
    if (this.y == lane1) {
      this.y = lane0;
    } else if (this.y == lane2) {
      this.y = lane1;
    }
  }
  down(){
    console.log("down");
    if (this.y == lane0) {
      this.y = lane1;
    } else if (this.y == lane1) {
      this.y = lane2;
    }
  }
  
  isCollided(px, py){
    if (dist(this.x, this.y, px, py) < this.dia) {
      return true;
    } else {
      return false;
    }
  }
  
  slowDown(){
    this.speed *= 0.9;
    console.log(this.speed);
  }
  
}