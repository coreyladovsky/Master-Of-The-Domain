import Coord from "./coord.js";

class Apple {
  constructor(board) {
    this.board = board;
    this.findSquare();
  }

  findSquare() {
    let x = Math.floor(Math.random() * this.board.dimentions);
    let y = Math.floor(Math.random() * this.board.dimentions);
    let segs = this.board.snake.segments;
    for(let i = 0; i < segs.length; i++) {
      if(segs[i].i === x && segs[i].j === y) {
        this.findSquare();
      } else {
        this.position = new Coord(x, y);
      }
    }
    // debugger
  }
}

export default Apple;
