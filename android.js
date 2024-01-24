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
  }

  getPosition(colorIdx) {
    return this.colorArr[colorIdx].position;
  }
  setPosition(colorIdx, pos) {
    this.colorArr[colorIdx].position += pos;
    console.log('setPosition =', this.colorArr[colorIdx].position);
  }
}