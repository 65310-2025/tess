// import Edge from './Edge';


// MUTABLE (because baby polygons are mutable)
class Vertex {
  x: number;
  y: number;


  constructor(x: number, y: number, edges?: Edge[]) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other: Vertex): number {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }
}

export default Vertex;