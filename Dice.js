export default class Dice {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = {
      x: this.canvas.width / 2 - 50,
      y: this.canvas.height / 2 + 50,
      size: 100,
      cornerRadius: 30
    }
    this.dot = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2 + 50 + 50,
      size: 10,
      color: 'black'
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.diceNum = [];
    this.init();
    this.idx = 0;

  }
  init() {
    this.diceNum = [];
    for (let i = 0; i < 5; i += 1) {
      this.rdNum = parseInt(Math.random() * 5);
      // console.log(this.rdNum);
      if (this.diceNum.length == 0) {
        this.diceNum.push(this.rdNum);
      } else if (!this.sameNum(this.rdNum)) {
        this.diceNum.push(this.rdNum);
      } else {
        i -= 1;
      }
      // console.log(this.diceNum);
    }
  }
  getIdx() {
    return this.idx;
  }
  sameNum(rdNum) {
    return this.diceNum.some(n => n == rdNum);
  }
  
  throwDice() {
    // console.log(this.diceNum);
    this.rdDot = parseInt(Math.random() * 3) + 1;
    // this.rdDot = parseInt(Math.random()) + 1;
    this.rdColor = this.diceNum[this.idx];
    this.draw(this.dice, this.rdColor);
    this.drawDot(this.dot, this.rdDot);
    this.idx += 1;
    if(this.idx!=5){

    }
    setTimeout(() => {
      this.drawsmallDice(this.rdColor,this.rdDot)
      this.ctx.clearRect(0,this.canvas.height/2,this.canvas.width,this.canvas.height);
    }, 1000);
    
    if (this.idx == 5) {
      this.init();
      this.idx = 0;
      setTimeout(() => {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      }, 2000);
    }
  }
  
  drawsmallDice(rdColor,rdDot){
    switch (rdColor) {
      case 0 : this.smallblue(rdDot); break;
      case 1 : this.smallgreen(rdDot); break;
      case 2 : this.smallred(rdDot); break;
      case 3 : this.smallyellow(rdDot); break;
      case 4 : this.smallwhite(rdDot); break;
      default: break;
      }
    }


  smallblue(size){
    let blue = {
      x: this.canvas.width / 2 - 220,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let blueDot= {
      x: this.canvas.width / 2 - 220 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(blue,0);
    this.smallDrawDot(blueDot,size);
  }
  smallgreen(size){
    let green = {
      x: this.canvas.width / 2 - 130,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let greenDot= {
      x: this.canvas.width / 2 - 130 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(green,1);
    this.smallDrawDot(greenDot,size);
  }
  smallred(size){
    let red = {
      x: this.canvas.width / 2 - 40,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let redDot= {
      x: this.canvas.width / 2 - 40 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(red,2);
    this.smallDrawDot(redDot,size);
  }
  smallyellow(size){
    let yellow = {
      x: this.canvas.width / 2 + 50,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let yellowDot= {
      x: this.canvas.width / 2 + 50 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(yellow,3);
    this.smallDrawDot(yellowDot,size);
  }
  smallyellow(size){
    let yellow = {
      x: this.canvas.width / 2 + 50,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let yellowDot= {
      x: this.canvas.width / 2 + 50 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(yellow,3);
    this.smallDrawDot(yellowDot,size);
  }
  smallwhite(size){
    let white = {
      x: this.canvas.width / 2 + 140,
      y: this.canvas.height / 2 - 80,
      size: 70,
      cornerRadius: 20
    }
    let whiteDot= {
      x: this.canvas.width / 2 + 140 +35 ,
      y: this.canvas.height / 2 - 80 +35 ,
      size: 7,
      color: 'black'
    }
    this.draw(white,4);
    this.smallDrawDot(whiteDot,size);
  }

  draw(obj, idx) {
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = obj.cornerRadius;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.colorList[idx];
    this.ctx.fillStyle = this.colorList[idx];
    this.ctx.strokeRect(obj.x + (obj.cornerRadius / 2), obj.y + (obj.cornerRadius / 2), obj.size - obj.cornerRadius, obj.size - obj.cornerRadius)
    this.ctx.fillRect(obj.x + (obj.cornerRadius / 2), obj.y + (obj.cornerRadius / 2), obj.size - obj.cornerRadius, obj.size - obj.cornerRadius)
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawDot(obj, size) {
    this.ctx.beginPath();
    if (size == 1) {
      this.ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI);
    } else if (size == 2) {
      this.ctx.arc(obj.x - 25, obj.y + 25, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x + 25, obj.y - 25, obj.size, 0, 2 * Math.PI);
    } else if (size == 3) {
      this.ctx.arc(obj.x - 25, obj.y + 25, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x + 25, obj.y - 25, obj.size, 0, 2 * Math.PI);
    }
    this.ctx.fillStyle = obj.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  smallDrawDot(obj, size) {
    this.ctx.beginPath();
    if (size == 1) {
      this.ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI);
    } else if (size == 2) {
      this.ctx.arc(obj.x - 15, obj.y + 15, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x + 15, obj.y - 15, obj.size, 0, 2 * Math.PI);
    } else if (size == 3) {
      this.ctx.arc(obj.x - 15, obj.y + 15, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI);
      this.ctx.arc(obj.x + 15, obj.y - 15, obj.size, 0, 2 * Math.PI);
    }
    this.ctx.fillStyle = obj.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}