/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coord) {
    return new Coord(this.i + coord.i, this.j + coord.j);
  }

  equals(coord) {
    if(this.i === coord.i && this.j === coord.j) {
      return true;
    } else {
      return false;
    }
  }

  isOpposite(coord){
    if(this.i === -1 * coord.i && this.j === -1 * coord.j) {
      return true;
    } else
    return false;
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Coord);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_view_js__ = __webpack_require__(2);



$l(() => {
  // $l("#gameover-page").hide();
  // html.getElementById("gameover").style.display = "none";
  let play = $l(".snake-attack");
    new __WEBPACK_IMPORTED_MODULE_0__snake_view_js__["a" /* default */](play);
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(3);





class View {
  constructor($lel) {
    this.$lel = $lel;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](25);
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


/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apple_js__ = __webpack_require__(5);



class Board {
  constructor(dimentions) {
    this.dimentions = dimentions;
    this.snake = new __WEBPACK_IMPORTED_MODULE_0__snake_js__["a" /* default */](this);
    this.apple = new __WEBPACK_IMPORTED_MODULE_1__apple_js__["a" /* default */](this);
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


/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord_js__ = __webpack_require__(0);



class Snake {
  constructor(board) {

    this.direction = "S";
    this.segments = [new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](0,0 )];
    this.directions = {
                      "N": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](0, -1),
                      "S": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](0, 1),
                      "E": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](-1, 0),
                      "W": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](1, 0)
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

/* harmony default export */ __webpack_exports__["a"] = (Snake);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord_js__ = __webpack_require__(0);


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
        break;
      } else {
        this.position = new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](x, y);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Apple);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map