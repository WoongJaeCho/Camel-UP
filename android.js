export default class Android {
  constructor() {
    this.colorArr = [{
        color: 'blue',
        position: 0
      },
      {
        color: 'green',
        position: 0
      },
      {
        color: 'red',
        position: 0
      },
      {
        color: 'yellow',
        position: 0
      },
      {
        color: 'white',
        position: 0
      }
    ]
  }

  getPosition(colorIdx) {
    return this.colorArr[colorIdx].position;
  }
  setPosition(colorIdx, pos) {
    let position = this.colorArr[colorIdx].position += pos;
    if (position >= 16) position = 16;
    console.log('setposition =', position);
    return position;
  }
}