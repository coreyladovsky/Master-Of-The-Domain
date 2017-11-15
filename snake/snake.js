const Coord = require("./coord.js");

class Snake {
  constructor() {

    this.direction = "S";
    this.segments = [new Coord(0,0)];
    this.directions = {
                      "N": new Coord(0, 1),
                      "S": new Coord(0, -1),
                      "E": new Coord(-1, 0),
                      "W": new Coord(1, 0)
                      };
  }


  move() {
    this.segmetns.forEach( segment => {
      segment.plus(this.directions[this.direction]);
    });
  }

  turn(direc) {
    if(direc.isOpposite(this.directions)) {
      return;
    } else {
        this.direction = direc;
    }
  }

}

export default Snake; 
