import React from "react";
import { Stage, Layer, Line } from "react-konva";
import Vertex from "../Vertex";
import Edge from "../Edge";

class Polygon {
  sides: number;
  vertices: Vertex[];
  edges: Edge[];

  constructor(sides: number, vertices: Vertex[], edges: Edge[]) {
    this.sides = sides;
    this.vertices = vertices;
    this.edges = edges;
  }

  // functions to find center of rotation, get edges, etc
  getPoints() {
    return this.vertices;
  }

  getEdges() {
    return this.edges;
  }

  // returns a deep copy
  copy(): Polygon {
    const newVertices = this.vertices.map(
      (vertex) => new Vertex(vertex.x, vertex.y),
    );
    const newEdges = this.edges.map((edge) => new Edge(edge.start, edge.end));
    return new Polygon(this.sides, newVertices, newEdges);
  }

  getCenter() {
    // center of gravity of polygon
    let x = 0;
    let y = 0;
    this.vertices.forEach((vertex) => {
      x += vertex.x;
      y += vertex.y;
    });
    return new Vertex(x / this.vertices.length, y / this.vertices.length);
  }
}

export default Polygon;
