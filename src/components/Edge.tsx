import Vertex from "./Vertex";


// hold REFERENCES to vertices
class Edge {
  start: Vertex;
    end: Vertex;
    crease: number; // 0 = no crease, 1 = mountain, -1 = valley

  constructor(start: Vertex, end: Vertex, crease = 0) {
    this.start = start;
      this.end = end;
      this.crease = crease;
  }

  length(): number {
    return this.start.distanceTo(this.end);
  }

  setCrease(creaseValue: number) {
    this.crease = creaseValue;
  }

  getUnitVector(): { x: number; y: number } { 
    const length = this.length();
    return {
      x: (this.end.x - this.start.x) / length,
      y: (this.end.y - this.start.y) / length,
    };
  }

}

export default Edge;
