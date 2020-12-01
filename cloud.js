class Cloud {
  constructor(_x, _y, _speed) {
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
  }
  display() {
    image(cloud1, this.x, this.y);
  }
  move() {
    this.x = this.x + this.speed;
    if(this.x > 480) {
      this.x = 0;
    }
  }
}
