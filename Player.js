export default class Player {
  constructor() {
    this.charNum = [];
    this.playerList = [{
        Number: 1,
        coin: 3
      },
      {
        Number: 2,
        coin: 3
      },
      {
        Number: 3,
        coin: 3
      },
      {
        Number: 4,
        coin: 3
      },
    ]
    this.init();
  }
  init() {
    this.charNum = [];
    for (let i = 0; i < 4; i += 1) {
      this.rdNum = parseInt(Math.random() * 8) +1;
      if (this.charNum.length == 0) {
        this.charNum.push(this.rdNum);
      } else if (!this.sameNum(this.rdNum)) {
        this.charNum.push(this.rdNum);
      } else {
        i -= 1;
      }
    }
  }
  sameNum(rdNum) {
    return this.charNum.some(n => n == rdNum);
  }
  calculateCoin(playerIdx, coins) {
    this.playerList.forEach(player => {
      if (player.Number == playerIdx) {
        player.coin += coins * 1;
        if(player.coin < 0) player.coin = 0; 
      }
    })
  }

  getCoin(playerIdx) {
    let coins = null;
    this.playerList.forEach(player => {
      if (player.Number == playerIdx) {
        coins = player.coin;
      }
    })
    return coins;
  }

  getWinner(){
    let winArr = [];
    let winner = null;
    let maxCoin = null;
    this.playerList.forEach(player=>{
      if(player.coin > maxCoin){
        winner = player.Number;
        maxCoin = player.coin;
        winArr=[];
      }
      if(player.coin == maxCoin){
        winArr.push(player.Number);
      }
    })
    return winArr;
  }
}