import Snake from "./snake.js";

class Board {
  constructor(dimentions) {
    this.snake = new Snake();
    this.dimentions = dimentions;
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

  }

}


export default Board;
