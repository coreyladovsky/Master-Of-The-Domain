
import Coord from "./coord.js";

class Snake {
  constructor() {

    this.direction = "S";
    this.segments = [new Coord(0,0 )];
    this.directions = {
                      "N": new Coord(0, -1),
                      "S": new Coord(0, 1),
                      "E": new Coord(-1, 0),
                      "W": new Coord(1, 0)
                      };
  }

  head() {
    return this.segments[this.segments.length - 1];
  }
  move() {

      this.segments.push(this.head().plus(this.directions[this.direction]));
      this.segments.shift();

  }

  turn(direc) {
    if(this.directions[direc].isOpposite(this.directions[this.direction])) {
      return;
    } else {
        this.direction = direc;
    }
  }

  validMove(coord) {
    let nextHead = this.head().plus(coord);
    if(nextHead.j < 0 || nextHead.j > this.dimentions) {
      return false;
    }
    if(this.head().i % 25 && this.direction === "E") {
      return false;
    }
    if(this.head().i === 24 && this.direction === "W"){
      return false;
    }
    return true;
  }

}

export default Snake;
