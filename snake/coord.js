class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coord) {
    return Coord(this.i + coord.i, this.j + coord.j);
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


export default Coord; 
