import Vertex from "./Vertex";


// hold REFERENCES to vertices
class Edge {
  start: Vertex;
    end: Vertex;
    crease: number;

  constructor(start: Vertex, end: Vertex) {
    this.start = start;
      this.end = end;
      this.crease = 0;
  }

  length(): number {
    return this.start.distanceTo(this.end);
  }

  setCrease(creaseValue: number) {
    this.crease = creaseValue;
  }

}

export default Edge;
