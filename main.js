import Dice from './Dice.js';
import Camel from './Camel.js';
import Player from './Player.js';

class main {
  constructor() {
    this.$btn = document.querySelector('button');
    this.canvas = document.querySelector('#canvas');
    this.$player = [...document.querySelectorAll('.player')];
    this.colorList = ['blue', 'green', 'red', 'yellow', 'white'];
    this.dice = new Dice();
    this.camel = new Camel();
    this.player = new Player();
    this.color = null;
    this.dot = null;
    this.count = null;
    this.isbutton = true;
    this.iswinner = false;
    this.turn = this.$player[0];
    this.idx = 0;
    this.items = [...this.turn.querySelectorAll('.items')];
    this.randomChar();
    this.cardDrag();
    this.$btn.addEventListener('click', () => {
      if (this.isbutton) {
        this.diceOn();
      }
      // 주사위 5번 던지면 3s 이후 라운드 계산 및 초기화
      if (this.dice.idx == 0 && !this.iswinner) {
        this.$btn.classList.add('off');
        setTimeout(() => {
          this.setround();
          this.$btn.classList.remove('off');
        }, 3000);
      }
    })
    console.log('turn = ', this.turn);
    this.calCoin();
  }
  // init(){}
  randomChar(){
    let charArr = this.player.charNum; 
    let face = [...document.querySelectorAll('.face')];
    let idx = 0;
    face.forEach(char=>{
      char.innerHTML=`<img src="./IMG/palyer${charArr[idx]}.jpg" alt="player${charArr[idx++]}">`
    })
    
  }
  diceOn() {
    this.isbutton = false;
    // 주사위 버튼 누르면 2.5초 이후 클릭 가능
    setTimeout(() => {
      this.isbutton = true;
      // }, 20);
    }, 2000);
    this.dice.throwDice();
    
    this.colorIdx = this.dice.rdColor;
    this.dot = this.dice.rdDot;
    this.color = this.colorList[this.colorIdx];
    console.log('color =', this.colorList[this.colorIdx]);
    console.log('dot =', this.dot);
    this.diceCoin();
    setTimeout(() => {
      this.removeClass();
      this.movecamel(this.colorIdx, this.dot, this.color);
      this.addClass();
      this.changeTurn();
      if (this.iswinner) {
        setTimeout(() => {
          this.finishGame();
        }, 1600);
      }
    }, 1000);
    
  }
  finishGame(){
    this.setround();
    this.finishTurn();
    alert("게임 종료");
    this.isbutton = false;
    this.$btn.classList.add('off');
    this.showWinner();
  }
  diceCoin() {
    let items = this.turn.querySelector('.items');
    items.innerHTML +=
      `<div class="card" data-color="coin"><img src="./IMG/coin.png" alt="coin"><p>1</p></div>`
  }
  movecamel(colorIdx, dot) {
    let getPosition = this.camel.getPosition(colorIdx);
    let setPosition = this.camel.setPosition(colorIdx, dot);
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
        `<img src="./IMG/${this.colorList[colorIdx]}.png" alt="${this.colorList[colorIdx]}" data-color="${this.colorList[colorIdx]}">`
          // `<i class="fa fa-camel" data-color="${this.colorList[colorIdx]}"></i>`
      }
    })
  }

  nextMove(getPosition, setPosition) {
    let icon = null;
    let iconIdx = null;
    let iconArr = [];

    this.$boxes.filter(box => {
      if (box.getAttribute('data-id') == getPosition) {
        icon = box.querySelector(`img[data-color ="${this.color}"]`);
        iconArr = [...box.querySelectorAll('img')];
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
      this.camel.colorArr[colorIdx].position = setPosition;
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
  finishTurn(){
    this.idx = this.$player.findIndex(p => p.classList.contains('on'));
    this.$player[this.idx].classList.remove('on');
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
      item.addEventListener('drop', e => {
        if (item.parentNode.classList.contains('on')) {
          let card = [...cards.querySelectorAll('.card')];
          let cd = card.find(cd => cd.classList.contains("drag"));
          let color = cd && cd.getAttribute('data-color');
          let pTag = cd.querySelector('p');

          const copyCard = cd.cloneNode(true);
          copyCard.classList.remove('drag');
          copyCard.setAttribute('draggable', 'false');
          e.currentTarget.appendChild(copyCard);
          let point = this.camel.setPoint(color);
          if (point > 0) {
            pTag.textContent = point;
          } else {
            pTag.textContent = '';
            pTag.parentNode.setAttribute('draggable', 'false');
          }
          this.changeTurn();
        }
      })
    })


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
    this.camel.clearPoint();
    this.items = [...document.querySelectorAll('.items')];
    let pTag = [...document.querySelectorAll('p')];
    this.endRound();
    this.calCoin();
    this.setCard(pTag);
  }

  setCard(pTag) {
    this.items.forEach(e => e.innerHTML = '');
    pTag.forEach(e => {
      e.innerHTML = '5'
      e.parentNode.setAttribute('draggable', 'true');
    });
  }

  endRound() {
    let firstBox = this.camel.getFirst();
    let box = this.$boxes.find(box => box.getAttribute('data-id') == firstBox);
    // box는 1등 말이 있는 position의 박스 2등 3등... 있을 수 있다.
    let firstColor = box.lastChild.getAttribute('data-color');
    let firstBoxSize = [...box.children].length;
    //firstColor는 1등 말의 색깔
    let idx = 0;
    this.items.forEach(item => {
      let playerIdx = item.parentNode.getAttribute('data-name');

      let itemList = [...item.children];
      let minusPoint = itemList.length;
      this.player.calculateCoin(playerIdx, minusPoint * -1);

      itemList.forEach(card => {
        // 각각의 플레이어 .items에서 자식 요소의 data-color 가 firstColor와 일치하는 카드
        if (card.getAttribute('data-color') == firstColor) {
          let pTag = card.querySelector('p');
          // 카드의 PTag의 값을 coin+1을 코인에 더한다.
          let point = pTag.innerHTML * 1 + 1;
          this.player.calculateCoin(playerIdx, point);
        }
        console.log(firstBoxSize);
        if (firstBoxSize > 2) {
          let second = [...box.childNodes];
          let secondColor = second[firstBoxSize - 2].getAttribute('data-color');
          if (card.getAttribute('data-color') == secondColor) {
            this.player.calculateCoin(playerIdx, 2);
          }
        } else {
          let secondBox = this.camel.secondcamel(firstBox);
          console.log('1', secondBox);
          let box = this.$boxes.find(box => box.getAttribute('data-id') == secondBox);
          console.log('2', box);
          let secondColor = box.lastChild.getAttribute('data-color');
          console.log('3', secondBox);
          if (card.getAttribute('data-color') == secondColor) {
            this.player.calculateCoin(playerIdx, 2);
          }
        }
        if (card.getAttribute('data-color') == 'coin') {
          this.player.calculateCoin(playerIdx, 2);
        }
      })
    })
  }

  calCoin() {
    this.$player.forEach(player => {
      let playerIdx = player.getAttribute('data-name');
      let coin = this.player.getCoin(playerIdx);
      let span = player.querySelector('span');
      span.innerHTML = coin;
    })
  }

  showWinner(){
    let winArr = [...this.player.getWinner()];
    console.log('0',winArr);
    winArr.forEach(winNum=>{
      console.log('1',winNum);
    this.$player.forEach(player => {
        if(player.getAttribute('data-name') == winNum){
          console.log('2',player);
          let items = player.querySelector('.items');
          console.log('3',items);
          items.innerHTML+=`<img id="trophy" src="./IMG/trophy.gif" alt="trophy">`;
        }
      })
    })
  }
}

new main();