import Dice from './Dice.js';
import Android from './android.js';
import Player from './Player.js';

class main {
  constructor() {
    this.$boxes = document.querySelectorAll('.box');
    this.$btn = document.querySelector('button');
    this.canvas = document.querySelector('#canvas');
    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = new Dice();
    this.android = new Android();
    this.player = new Player();
    this.color = null;
    this.dot = null;
    this.count = null;
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

    this.colorIdx = this.dice.rdColor;
    this.dot = this.dice.rdDot;
    console.log('color =', this.colorList[this.colorIdx]);
    console.log('dot =', this.dot);
    this.moveAndroid(this.color, this.dot);
    this.boxCalc();
  }

  moveAndroid(color, dot) {
    let boxNum = this.android.getPosition(this.colorIdx);
    console.log('getPosition = ', boxNum);


    // console.log(this.android.getColor());
    this.android.setPosition(this.colorIdx, this.dot);
  }
  boxCalc() {
    // for (let i = 0; i < 25; i += 1) {
    //   console.log(i);
    //   console.log(this.$boxes[i].innerHTML);
    //   // let str = this.$boxes[i].innerHTML;
    //   // if (str.contain("android")) {
    //   //   this.count++;
    //   // }
    //   // this.count = 0;
    // }

    this.$boxes.forEach(box => {
      console.log(box);
      if (box.classList.contains('fa')) {
        this.count++;
      }
      console.log(this.count);
    });

  }
}


new main();