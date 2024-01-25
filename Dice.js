export default class Dice {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');

    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = {
      x: this.canvas.width / 2 - 50,
      y: this.canvas.height / 2 - 50,
      size: 100,
      cornerRadius: 30
    }
    this.dot = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
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
  sameNum(rdNum) {
    return this.diceNum.some(n => n == rdNum);
  }

  throwDice() {
    console.log(this.diceNum);
    this.rdDot = parseInt(Math.random() * 3) + 1;
    // this.rdDot = parseInt(Math.random()) + 1;
    this.rdColor = this.diceNum[this.idx];
    this.draw(this.rdColor);
    this.drawDot(this.rdDot);
    this.idx += 1;
    if (this.idx == 5) {
      this.init();
      this.idx = 0;
    }
  }


  draw(idx) {
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = this.dice.cornerRadius;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.colorList[idx];
    this.ctx.fillStyle = this.colorList[idx];
    this.ctx.strokeRect(this.dice.x + (this.dice.cornerRadius / 2), this.dice.y + (this.dice.cornerRadius / 2), this.dice.size - this.dice.cornerRadius, this.dice.size - this.dice.cornerRadius)
    this.ctx.fillRect(this.dice.x + (this.dice.cornerRadius / 2), this.dice.y + (this.dice.cornerRadius / 2), this.dice.size - this.dice.cornerRadius, this.dice.size - this.dice.cornerRadius)
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawDot(size) {
    this.ctx.beginPath();
    if (size == 1) {
      this.ctx.arc(this.dot.x, this.dot.y, this.dot.size, 0, 2 * Math.PI);
    } else if (size == 2) {
      this.ctx.arc(this.dot.x - 25, this.dot.y + 25, this.dot.size, 0, 2 * Math.PI);
      this.ctx.arc(this.dot.x + 25, this.dot.y - 25, this.dot.size, 0, 2 * Math.PI);
    } else if (size == 3) {
      this.ctx.arc(this.dot.x - 25, this.dot.y + 25, this.dot.size, 0, 2 * Math.PI);
      this.ctx.arc(this.dot.x, this.dot.y, this.dot.size, 0, 2 * Math.PI);
      this.ctx.arc(this.dot.x + 25, this.dot.y - 25, this.dot.size, 0, 2 * Math.PI);
    }
    this.ctx.fillStyle = this.dot.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}