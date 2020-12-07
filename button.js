class Button {
  constructor(x, y, _image) {
    this.x = x;
    this.y = y;
    this.tint = 255;
    this.on = true;
    this.img = _image;
  }
  show() {
  if(this.on) {
  image(this.img, this.x, this.y);
  if(this.contains())
   this.tint = 255;
  else
   this.tint = 200;
  }
}

showOff() {
  this.on = false;
  this.show();
}

contains() {
     if((this.x<mouseX)&&(this.x + 506 >mouseX)&&(this.y<mouseY)&&(this.y + 83>mouseY))
   return true;
  else
   return false;
}

}
