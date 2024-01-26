import Dice from './Dice.js';
import Android from './android.js';
import Player from './Player.js';

class main {
  constructor() {
    this.$btn = document.querySelector('button');
    this.canvas = document.querySelector('#canvas');
    this.$player = [...document.querySelectorAll('.player')];
    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = new Dice();
    this.android = new Android();
    this.player = new Player();
    this.color = null;
    this.dot = null;
    this.count = null;
    this.isbutton = true;
    this.iswinner = false;
    this.turn = this.$player[0];
    this.items = this.turn.querySelector('.items');
    this.cardDrag();
    this.$btn.addEventListener('click', () => {
      if (this.isbutton) {
        this.diceOn();
      }
    })
    console.log('turn = ',this.turn);
  }
  // init(){}
  
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
    this.changeTurn();
    if (this.iswinner) {
      this.isbutton = false;
      setTimeout(() => {
        alert("게임 종료");
      }, 1000);
    }
  }
  
  moveAndroid(colorIdx, dot) {
    let getPosition = this.android.getPosition(colorIdx);
    let setPosition = this.android.setPosition(colorIdx, dot);
    if (setPosition == 16) {
      this.iswinner = true;
    }
    
    if (!getPosition) {
      this.firstmove(colorIdx, dot);
      return;
    } else {
      this.nextMove(getPosition, setPosition)
      return;
    }
  }
  
  firstmove(colorIdx, dot) {
    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == dot) {
        box.innerHTML +=
        `<i class="fa fa-android" data-color="${this.colorList[colorIdx]}"></i>`
      }
    })
  }
  
  nextMove(getPosition, setPosition) {
    let icon = null;
    let iconIdx = null;
    let iconArr = [];
    
    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == getPosition) {
        icon = box.querySelector(`i[data-color ="${this.color}"]`);
        iconArr = [...box.querySelectorAll('i')];
        iconIdx = iconArr.findIndex(i => i == icon);
      }
    })
    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == setPosition) {
        this.moveChild(box, iconIdx, iconArr, setPosition)
      }
    })
  }
  
  moveChild(box, iconIdx, iconArr, setPosition) {
    for (let i = iconIdx; i < iconArr.length; i += 1) {
      let icon = iconArr[i];
      let color = icon.getAttribute('data-color');
      let colorIdx = this.colorList.findIndex(idx => idx == color);
      this.android.colorArr[colorIdx].position = setPosition;
      box.appendChild(icon);
    }
  }
  
  changeTurn() {
    // let pList = ['p1', 'p2', 'p3', 'p4'];
    let idx = this.$player.findIndex(p => p.classList.contains('on'));
    this.$player[idx++].classList.remove('on');
    if (idx == 4) idx = 0;
    this.turn = this.$player[idx];
    this.$player[idx].classList.add('on');
    this.items = this.turn.querySelector('.items');
  }
  
  cardDrag() {
    let color = null;
    let cards = document.querySelector('.cards');
    cards.addEventListener('dragstart', e => {
      e.target.classList.add('drag');
      let cd = card.find(cd=> cd.classList.contains("drag"));
      // color = e.target.getAttribute('data-color');
      color = cd.getAttribute('data-color');
      console.log(color);
    });
    cards.addEventListener('dragend', e => {
      e.target.classList.remove('drag');
    }); 
    console.log(color);
    this.items.addEventListener('dragover', e => e.preventDefault())
    let card = [...cards.querySelectorAll('.card')];
    this.items.addEventListener('drop', e => {
      console.log(color);
      let cd = card.find(cd=> cd.classList.contains("drag"));
      const copyCard = cd.cloneNode(true);
      e.target.before(copyCard);
      cd.innerHTML = `<i class="fa fa-android" data-color="${color}"></i><p>3</p>`;
      // e.target.appendChild(cd);
      this.changeTurn();
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