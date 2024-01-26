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
    this.idx = 0;
    this.items = [...this.turn.querySelectorAll('.items')];
    this.cardDrag();
    this.$btn.addEventListener('click', () => {
      if (this.isbutton) {
        this.diceOn();
      }
      if (this.dice.idx == 0) {
        setTimeout(() => {
          this.setround();
        }, 2000);
      }
    })
    console.log('turn = ', this.turn);
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
    this.idx = this.$player.findIndex(p => p.classList.contains('on'));
    this.$player[this.idx++].classList.remove('on');
    if (this.idx == 4) this.idx = 0;
    this.turn = this.$player[this.idx];
    this.$player[this.idx].classList.add('on');
    this.items = [...this.turn.querySelectorAll('.items')];
  }

  cardDrag() {
    let cards = document.querySelector('.cards');
    this.items = [...document.querySelectorAll('.items')];
    cards.addEventListener('dragstart', e => {
      if (e.target.getAttribute('draggable'))
        e.target.classList.add('drag')
      // this.dragOn(cards);
    });
    cards.addEventListener('dragend', e => {
      e.target.classList.remove('drag')
    });

    this.items.forEach(item => item.addEventListener('dragover', e => e.preventDefault()))

    this.items.forEach(item => {
      // if (item.parentNode.classList.contains('on')) {
      item.addEventListener('drop', e => {
        let card = [...cards.querySelectorAll('.card')];
        let cd = card.find(cd => cd.classList.contains("drag"));
        let color = cd && cd.getAttribute('data-color');
        let pTag = cd.querySelector('p');

        const copyCard = cd.cloneNode(true);
        copyCard.classList.remove('drag');
        e.currentTarget.appendChild(copyCard);
        let point = this.android.setPoint(color);
        if (point > 0) {
          pTag.textContent = point;
        } else {
          pTag.textContent = '';
          pTag.parentNode.setAttribute('draggable', 'false');
        }
        this.changeTurn();
      })
    })
    // })


  }
  // dragOn(cards) {}
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
  setround() {
    this.android.clearPoint();
    this.items = [...document.querySelectorAll('.items')];
    let pTag = [...document.querySelectorAll('p')];
    this.items.forEach(e => e.innerHTML = '');
    pTag.forEach(e => {
      e.innerHTML = '5'
      e.parentNode.setAttribute('draggable', 'true');
    });
  }

}

new main();