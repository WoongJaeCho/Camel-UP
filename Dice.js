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
    this.cnt = 0;
    this.diceNum = [];
    this.throwDice();
  }

  throwDice() {
    this.rdDot = parseInt(Math.random() * 3) + 1;
    // console.log(this.diceNum);
    // for (let i = 0; i < this.cnt; i += 1) {
    //   if (diceNum[i] !== this.rdColor) {
    //     this.diceNum.push(this.rdColor);
    //     this.cnt++;
    //   }
    // }
    this.rdColor = parseInt(Math.random() * 5);
    this.draw(this.rdColor);
    this.drawDot(this.rdDot);
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
let dice = new Dice();