export default class Android {
  constructor() {
    this.colorArr = [{
        color: 'blue',
        position: 0,
        point: 5
      },
      {
        color: 'green',
        position: 0,
        point: 5
      },
      {
        color: 'red',
        position: 0,
        point: 5
      },
      {
        color: 'yellow',
        position: 0,
        point: 5
      },
      {
        color: 'white',
        position: 0,
        point: 5
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

  setPoint(colors) {
    const point = this.colorArr.find(Arr => {
      if (Arr.color == colors) {
        if (Arr.point == 5) Arr.point = 3;
        else if (Arr.point == 3) Arr.point = 2;
        else if (Arr.point == 2) Arr.point = 0;
        else if (Arr.point == 0) Arr.point = -1;
        return Arr;
      }
    })
    return point.point;
  }

  clearPoint() {
    this.colorArr.forEach(e => e.point = 5);
  }
}