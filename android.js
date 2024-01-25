export default class Android {
  constructor() {
    this.colorArr = [{
        color: 'blue',
        position: 1
      },
      {
        color: 'green',
        position: 3
      },
      {
        color: 'red',
        position: 2
      },
      {
        color: 'yellow',
        position: 2
      },
      {
        color: 'white',
        position: 1
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