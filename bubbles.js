class Bubble {
  constructor(x, y, bright) {
    this.x = x;
    this.y = y;
    this.on = true;
    this.bright = bright;
  }

  showOff() {
    this.on = false;
  }
}
