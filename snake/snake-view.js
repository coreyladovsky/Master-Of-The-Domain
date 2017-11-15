const Board = require("./board.js");

class View {
  constructor($lel) {
    this.$lel = $lel;
    this.board = new Board(50);
    this.viewBoard();

    this.stopInterval = window.setInterval(this.step.bind(this), 500);

    $l(document).on("keydown", handleKeyEvent.bind(this));

  }

  viewBoard() {
    html = ""
    for(let i = 0; i < this.board.dimentions; i++) {
      html += "<ul>"
      for(let j = 0; j < this.board.dimentions; j++) {
        html += "<li></li>"
      }
      html += "</ul>"
    }

    this.$lel.html(html);
  }

  step() {
    this.board.snake.move();
    this.render();
  }

  render() {
    $l("li").removeClass("green")
    this.board.snake.segments.forEach( segment => {
      $l(segment).addClass("green"); 

    });
  }


  handleKeyEvent(event) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        this.board.snake.turn("N");
        break;
      case "ArrowDown":
      case "s":
        this.board.snake.turn("S");
        break;
      case "ArrowRight":
      case "d":
        this.board.snake.turn("W");
        break;
      case "ArrowLeft":
      case "a":
        this.board.snake.turn("E");
        break;
      default:
      console.log("Please keep your eyes and attention on the game!");
      console.log("https://github.com/coreyladovsky");

    }
  }

export default View;



}