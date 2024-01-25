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
    this.count = null;
    this.isbutton = true;
    this.iswinner = false;
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
    this.color = this.colorList[this.colorIdx];
    console.log('color =', this.colorList[this.colorIdx]);
    console.log('dot =', this.dot);
    this.removeClass();
    this.moveAndroid(this.colorIdx, this.dot, this.color);
    this.addClass();
    if (this.iswinner) {
      alert("게임 종료");
      this.isbutton = false;
    }
  }

  moveAndroid(colorIdx, dot) {
    let iconList = [];
    let getPosition = this.android.getPosition(colorIdx);
    let setPosition = this.android.setPosition(colorIdx, dot);
    if (setPosition == 16) {
      this.iswinner = true;
    }

    if (!getPosition) {
      this.firstmove(colorIdx, dot);
      return;
    } else {
      this.nextMove(colorIdx, dot, getPosition, setPosition)
    }
  }

  firstmove(colorIdx, dot) {
    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == dot) {
        box.innerHTML +=
          `<i class="fa fa-android" data-color="${this.colorList[colorIdx]}"></i>`
        this.android.setPosition(colorIdx, dot)
      }
    })
  }

  nextMove(colorIdx, dot, getPosition, setPosition) {
    let icon = null;
    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == getPosition) {
        icon = box.querySelector(`i[data-color ="${this.color}"]`);
        console.log('icon = ', icon);
        console.log(box);
        let iconArr = [...box.children];
        console.log(iconArr);
        // iconList = box.children;
        // console.log(iconList.getAttribute('data-color'));
      }
    })
    // console.log(iconList);
    // iconIdx = iconList.filter(i=>i.getAttribute('data-color')==color);
    // console.log(iconIdx);

    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == setPosition) {

        console.log(box);
        console.log(box.getAttribute('data-id'));

        box.appendChild(icon);
      }
    })
  }

  removeClass() {
    this.$boxes = [...document.querySelectorAll('.box')];
    for (let i = 0; i < 25; i += 1) {
      let cnt = this.$boxes[i].children.length - 1;
      if (cnt == 1) this.$boxes[i].classList.remove('one');
      else if (cnt == 2) this.$boxes[i].classList.remove('two');
      else if (cnt == 3) this.$boxes[i].classList.remove('three');
      else if (cnt == 4) this.$boxes[i].classList.remove('four');
      else if (cnt == 5) this.$boxes[i].classList.remove('five');
    }
  }

  addClass() {
    this.$boxes = [...document.querySelectorAll('.box')];
    for (let i = 0; i < 25; i += 1) {
      let cnt = this.$boxes[i].children.length - 1;
      if (cnt == 1) this.$boxes[i].classList.add('one');
      else if (cnt == 2) this.$boxes[i].classList.add('two');
      else if (cnt == 3) this.$boxes[i].classList.add('three');
      else if (cnt == 4) this.$boxes[i].classList.add('four');
      else if (cnt == 5) this.$boxes[i].classList.add('five');
    }
  }
}

new main();