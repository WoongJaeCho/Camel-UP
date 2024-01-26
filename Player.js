export default class Player {
  constructor() {
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
  }

  calculateCoin(playerIdx, coins) {
    this.playerList.forEach(player => {
      if (player.Number == playerIdx) {
        player.coin += coins * 1;
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
}