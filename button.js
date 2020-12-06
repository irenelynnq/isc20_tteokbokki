class Button {
  constructor(x, y, _image) {
    this.x = x;
    this.y = y;
    this.tint = 100;
    this.on = true;
    this.img = _image;
  }
  show() {
  if(this.on) {
  image(this.img, this.x, this.y);
  if(this.contains())
   this.tint = 100;
  else
   this.tint = 200;
  }
}

showOff() {
  this.on = false;
  this.show();
}

contains() {
     if((this.x<mouseX)&&(this.x + 30 >mouseX)&&(this.y<mouseY)&&(this.y + 30>mouseY))
   return true;
  else
   return false;
}

}
