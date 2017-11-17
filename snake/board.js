import Snake from "./snake.js";
import Apple from "./apple.js";

class Board {
  constructor(dimentions) {
    this.dimentions = dimentions;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.makeBoard = this.makeBoard.bind(this);
  }

  makeBoard(dimention) {
    let board = [];
    for(let i = 0; i < dimention; i++) {
      let row = [];
      for(let j = 0; j < dimention; j++) {
        row.push("O");
      }
      board.push(row);
    }
    return board;
  }




  render() {
    let board = this.makeBoard(this.dimentions);
    this.snake.segments.forEach( segment => {
      board[segment.i][segment.j] = "G";
    });
    board[this.apple.position.i][this.apple.position.j] = "A";

  }

}


export default Board;
