import Dice from './Dice.js';
import Android from './android.js';
import Player from './Player.js';

class main {
  constructor() {
    this.$btn = document.querySelector('button');
    this.canvas = document.querySelector('#canvas');
    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = new Dice();
    this.android = new Android();
    this.player = new Player();
    this.color = null;
    this.dot = null;
    this.isbutton = true;

    this.$btn.addEventListener('click', () => {
      if (this.isbutton) {
        this.diceOn();
      }
    })
  }

  diceOn() {
    this.isbutton = false;
    this.canvas.classList.remove('on');
    setTimeout(() => {
      this.canvas.classList.add('on');
      this.isbutton = true;
    }, 2000);
    this.dice.throwDice();

    this.color = this.colorList[this.dice.rdColor];
    this.dot = this.dice.rdDot;
    console.log('colorNum =', this.color);
    console.log('dot =', this.dot);
    this.moveAndroid(this.color, this.dot);
    this.boxCalc();
  }

  moveAndroid(color, dot) {
    let boxNum = this.android.getPosition(this.dice.rdColor);
    console.log('position = ', boxNum);
    // console.log(this.android.getColor());
  }
  boxCalc() {

  }
}

new main();