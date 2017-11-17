import Coord from "./coord.js";

class Apple {
  constructor(board) {
    this.board = board;
    this.findSquare();
  }

  findSquare() {
    let x = Math.floor(Math.random() * this.board.dim);
    let y = Math.floor(Math.random() * this.board.dim);
    let segs = this.board.snake.segments
    for(let i = 0; i < segs.length; i++) {
      if(segs[i].i === x && segs[i].j === y) {
        findSquare();
      } else {
        this.position = new Coord(x, y);
      }
    }
  }
}

export default Apple;
