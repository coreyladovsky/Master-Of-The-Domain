const Snake = require("./snake.js");

class Board {
  constructor(dimentions) {
    this.snake = new Snake();
    this.dimentions = dimentions;
  }

  makeBoard(dimention) {
    let board = [];
    for(let i = 0; i < dimention; i++) {
      let row = [];
      for(let j = 0; j < dimention; j++) {
        row.push(" "); 
      }
      board.push(row);
    }
    return board;
  }

}


export default Board;
