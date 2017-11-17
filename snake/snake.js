
import Coord from "./coord.js";

class Snake {
  constructor(board) {

    this.direction = "S";
    this.segments = [new Coord(0,0 )];
    this.directions = {
                      "N": new Coord(0, -1),
                      "S": new Coord(0, 1),
                      "E": new Coord(-1, 0),
                      "W": new Coord(1, 0)
                      };
    this.board = board;
    this.growAmount = 0;
  }

  head() {
    return this.segments[this.segments.length - 1];
  }
  move() {

      this.segments.push(this.head().plus(this.directions[this.direction]));
      this.eatsApple();
      if(this.growAmount > 0) {
        this.growAmount--;
      } else {
          this.segments.shift();
      }
  }

  eatsApple(){
    if(this.head().equals(this.board.apple.position)) {
      this.growAmount = 5;
      this.board.apple.findSquare();
    }
  }

  turn(direc) {
    if(this.directions[direc].isOpposite(this.directions[this.direction])) {
      return;
    } else {
        this.direction = direc;
    }
  }

  validMove() {
    if(this.head().j === 0 && this.direction === "N") return false;
    if(this.head().j === 24 && this.direction === "S") return false;
    if(this.head().i === 0 && this.direction === "E") return false;
    if(this.head().i === 24 && this.direction === "W") return false;
    return true;
  }

  hitSelf() {
    if(this.segments.length === 0) return false;
    let nextHead = this.head().plus(this.directions[this.direction]);
    for(let i = 0; i < this.segments.length - 1; i++){
      if(nextHead.equals(this.segments[i])) {
        return true;
      }
    }
    return false;
  }


}

export default Snake;
