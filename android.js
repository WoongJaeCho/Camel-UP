export default class Android {
  constructor() {
    this.colorArr = [{
        color: 'blue',
        position: 1
      },
      {
        color: 'green',
        position: 1
      },
      {
        color: 'red',
        position: 2
      },
      {
        color: 'yellow',
        position: 1
      },
      {
        color: 'white',
        position: 2
      }
    ]

    // this.blue = {
    //     position: 1,
    //   },
    //   this.green = {
    //     position: 1,
    //   },
    //   this.red = {
    //     position: 2,
    //   },
    //   this.yellow = {
    //     position: 1,
    //   },
    //   this.white = {
    //     position: 2,
    //   }
  }
  getPosition(colorNum) {
    return this.colorArr[colorNum].position;
  }
}