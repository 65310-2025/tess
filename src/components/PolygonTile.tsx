import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import ResizeObserver from "resize-observer-polyfill"; // optional polyfill
import Edge from "./Edge";
import Vertex from "./Vertex";

class PolygonTile {
  readonly n: number;
  readonly pleatWidth: number;
  readonly tiltAngle: number;
  readonly vertices: Array<Vertex>; //
  readonly edges: Array<Edge>;
  readonly center: Vertex;
  // readonly radius: number;
  readonly sideLength: number;
  readonly pleatVertices: Array<Vertex>; // vertices where pleats start
  readonly pleatEdges: Array<Edge>; // edges where pleats start
  readonly rotationDeg: number;
  readonly creaseParity: number; // 1 (M) or -1 (V)

  rotateVector(
    x: number,
    y: number,
    angleDeg: number, // IN DEGREES
  ): { x: number; y: number } {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: x * Math.cos(angleRad) - y * Math.sin(angleRad),
      y: x * Math.sin(angleRad) + y * Math.cos(angleRad),
    };
  }

  // null if parallel
  intersectRays(r1: Edge, r2: Edge): Vertex | null {
    const x1 = r1.start.x,
      y1 = r1.start.y;
    const x2 = r1.end.x,
      y2 = r1.end.y;
    const x3 = r2.start.x,
      y3 = r2.start.y;
    const x4 = r2.end.x,
      y4 = r2.end.y;

    const dx1 = x2 - x1;
    const dy1 = y2 - y1;
    const dx2 = x4 - x3;
    const dy2 = y4 - y3;

    const det = dx1 * dy2 - dy1 * dx2;

    if (Math.abs(det) < 1e-10) return null;

    const t = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / det;
    const u = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / det;

    if (t < 0 || u < 0) return null;

    const ix = x1 + t * dx1;
    const iy = y1 + t * dy1;
    return new Vertex(ix, iy);
  }

  constructor(
    n: number,
    pleatWidth: number,
    tiltAngle: number, // IN DEGREES
    cx: number,
    cy: number,
    // radius: number,
    sideLength: number,
    rotationDeg = 0,
    creaseParity = 1,
  ) {
    this.n = n;
    this.pleatWidth = pleatWidth;
    this.tiltAngle = tiltAngle;
    this.center = new Vertex(cx, cy);
    this.sideLength = sideLength;
    this.rotationDeg = rotationDeg;
    this.creaseParity = creaseParity;

    // const angleStepRad = (2 * Math.PI) / n;
    // const rotationRad = (rotationDeg * Math.PI) / 180;
    const radius = sideLength / (2 * Math.sin(Math.PI / n)); // assume regular polygon

    const angleStep = (2 * Math.PI) / n;
    const baseRotation = Math.PI / 2 + Math.PI / n;
    const rotationRad = baseRotation + (rotationDeg * Math.PI) / 180;

    // outer polygon vertices
    this.vertices = Array.from({ length: n }, (_, i) => {
      const angle = i * angleStep + rotationRad;
      return new Vertex(
        cx + radius * Math.cos(angle),
        cy + radius * Math.sin(angle),
      );
    });

    // outer polygon edges
    this.edges = this.vertices.map((v, i) => {
      const start = v;
      const end = this.vertices[(i + 1) % this.vertices.length];
      return new Edge(start, end);
    });

    this.pleatVertices = Array<Vertex>();
    this.pleatEdges = Array<Edge>();

    const tempPleatEdges = Array<Edge>();
    const centralPolygonVertices = Array<Vertex>();
    // divide each edge into three parts
    // making the central portion a fraction w of the edge
    for (const edge of this.edges) {
      const pleatGap = ((1 - pleatWidth) / 2) * edge.length();
      const unitVec = edge.getUnitVector();
      const babyVertex1 = new Vertex(
        edge.start.x + unitVec.x * pleatGap,
        edge.start.y + unitVec.y * pleatGap,
      );
      const babyVertex2 = new Vertex(
        edge.end.x - unitVec.x * pleatGap,
        edge.end.y - unitVec.y * pleatGap,
      );
      this.pleatVertices.push(babyVertex1, babyVertex2);

      const pleatLength = radius; // length of pleat
      const rotatedVec1 = this.rotateVector(unitVec.x, unitVec.y, 90 - tiltAngle);
      const pleatEnd1 = new Vertex(
        babyVertex1.x + rotatedVec1.x * pleatLength,
        babyVertex1.y + rotatedVec1.y * pleatLength,
      );

      const rotatedVec2 = this.rotateVector(unitVec.x, unitVec.y, 90 -tiltAngle); // reverse direction
      const pleatEnd2 = new Vertex(
        babyVertex2.x + rotatedVec2.x * pleatLength,
        babyVertex2.y + rotatedVec2.y * pleatLength,
      );

      // create temporary edges for the pleats
      tempPleatEdges.push(new Edge(babyVertex1, pleatEnd1));
      tempPleatEdges.push(new Edge(babyVertex2, pleatEnd2));
    }
    // construct lines emanating from those points, each making an angle tau with the edge from which it comes
    // finalize pleat edges by connecting the ends of the pleats
    for (let i = 1; i < tempPleatEdges.length - 1; i += 2) {
      const pleatVertex = this.intersectRays(
        tempPleatEdges[i],
        tempPleatEdges[i + 1],
      );
      if (pleatVertex === null) {
        continue;
      }
      this.pleatEdges.push(
        new Edge(tempPleatEdges[i].start,
          pleatVertex,
          -1 * this.creaseParity
        ),
      );
      this.pleatEdges.push(
        new Edge(
          tempPleatEdges[i + 1].start,
          pleatVertex,
          1 * this.creaseParity,
        ),
      );
      centralPolygonVertices.push(pleatVertex);
    }

    // take care of the the connection between the last and first pleat edges
    if (tempPleatEdges.length > 2) {
      const pleatVertex1 = this.intersectRays(
        tempPleatEdges[tempPleatEdges.length - 1],
        tempPleatEdges[0],
      );
      if (pleatVertex1 !== null) {
        this.pleatEdges.push(
          new Edge(
            tempPleatEdges[tempPleatEdges.length - 1].start,
            pleatVertex1,
            -1 * this.creaseParity,
          ),
        );
        this.pleatEdges.push(
          new Edge(
            tempPleatEdges[0].start,
            pleatVertex1,
            1 * this.creaseParity,
          ),
        );
        centralPolygonVertices.push(pleatVertex1);
      }
    }

    // finally, construct the interior polygon inbetween pleat vertices
    for (let i = 0; i < centralPolygonVertices.length; i++) {
      const start = centralPolygonVertices[i];
      const end =
        centralPolygonVertices[(i + 1) % centralPolygonVertices.length];
      this.pleatEdges.push(new Edge(start, end, 1 * this.creaseParity));
      this.pleatVertices.push(start);
    }
  }
  copy(): PolygonTile {
    return new PolygonTile(
      this.n,
      this.pleatWidth,
      this.tiltAngle,
      this.center.x,
      this.center.y,
      this.sideLength,
      this.rotationDeg,
      this.creaseParity,
    );
  }

  // returns new polygon tile with inverted crease parity
  invertCreaseParity(): PolygonTile { 
    return new PolygonTile(
      this.n,
      this.pleatWidth,
      this.tiltAngle,
      this.center.x,
      this.center.y,
      this.sideLength,
      this.rotationDeg,
      -this.creaseParity,
    );
  }


  // TODO: change crease pattern
  // options: mm, mv, MM,
  // rotate the polygon tile, outputs new PolygonTile Object
  rotateTile(deg: number): PolygonTile {
    return new PolygonTile(
      this.n,
      this.pleatWidth,
      this.tiltAngle,
      this.center.x,
      this.center.y,
      this.sideLength,
      deg,
      this.creaseParity,
    );
  }

  // get the outward orthogonal vector of the edge (perpendicular to the edge)
  // returns a unit vector (i think) (or at least a vector in the right direction)
  getOutwardOrthogonal(edge: Edge): { x: number; y: number } {
    const dx = edge.end.x - edge.start.x;
    const dy = edge.end.y - edge.start.y;
    const length = Math.hypot(dx, dy);
    const unitEdge = { x: dx / length, y: dy / length };

    let orthogonal = { x: -unitEdge.y, y: unitEdge.x };

    const midpoint = {
      x: (edge.start.x + edge.end.x) / 2,
      y: (edge.start.y + edge.end.y) / 2,
    };
    const centerToMid = {
      x: midpoint.x - this.center.x,
      y: midpoint.y - this.center.y,
    };

    const dot = centerToMid.x * orthogonal.x + centerToMid.y * orthogonal.y;
    if (dot < 0) {
      orthogonal = { x: -orthogonal.x, y: -orthogonal.y };
    }

    return orthogonal;
  }

  // rotateToEdge(edge: Edge): PolygonTile {

  // }

  // scale the polygon tile, outputs new PolygonTile Object
}

export default PolygonTile;
