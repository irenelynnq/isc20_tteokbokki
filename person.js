class Person {
  constructor(id, lane, type, speed){
    this.id = id;
    this.x = width;
    if(lane == 0){
      this.y = lane0;
    } else if(lane == 1){
      this.y = lane1;
    } else {
      this.y = lane2;
    }
    this.type = type;
    this.speed = speed;
    this.anim = 0;
  }
  
  getId(){
    return this.id;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  
  move(){
    this.x -= this.speed;
  }
  
  pass(dis){
    this.x -= dis;
  }
  
  show(){
    imageMode(CENTER);
    image(passerbyImages[this.type][this.anim], this.x, this.y);
    if(frameCount % int(12 * this.speed) == 0) {
      this.anim += 1;
      if (this.anim >= 8) {
        this.anim = 0;
      }
    }
  }
}