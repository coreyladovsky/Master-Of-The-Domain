
import Board from "./board.js";



class View {
  constructor($lel) {
    this.$lel = $lel;
    this.board = new Board(25);
    this.viewBoard();
    this.handleKeyEvent = this.handleKeyEvent.bind(this);

    this.stopInterval = window.setInterval(this.step.bind(this), 100);
    $l("html").on("keydown", (e) => this.handleKeyEvent(e));
    // this.pending = false;
  }


  handleKeyEvent(event) {
    console.log(event.key);
    // let past = Date.now();
    // if(Date.now() > past + 1) {
    // if(this.pending) return;
    // this.pending = true;
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
        case " ":
          window.location.reload();
        break;
        default:
          console.log("Please keep your eyes and attention on the game!");
          console.log("https://www.github.com/coreyladovsky");
      }
      // this.pending = false;
  }

  viewBoard() {
    let html = "";
    for(let i = 0; i < this.board.dimentions; i++) {
      html += "<ul>";
      for(let j = 0; j < this.board.dimentions; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$lel.html(html);
  }

  step() {
    if (this.board.snake.validMove() && !this.board.snake.hitSelf()) {
      this.board.snake.move();
      this.render();
      // this.pending = false;
    } else {
      clearInterval(this.stopInterval);
      $l(".loser").append("You Lose! <br> Press SpaceBar to play again.")
      $l("html").on("keydown", (e) => this.handleKeyEvent(e));
      // $l("#gameover-page").show();
    }
  }

  render() {
    $l("li").removeClass("green");
    this.board.snake.segments.forEach( segment => {
      let idx = (segment.j * this.board.dimentions) + segment.i;
      $l($l("li").htmlElements[idx]).addClass("green");
    });
    $l("li").removeClass("red");
    let app = this.board.apple.position;
    let jdx = (app.j * this.board.dimentions) + app.i;
    $l($l("li").htmlElements[jdx]).addClass("red");
  }

}


export default View;
