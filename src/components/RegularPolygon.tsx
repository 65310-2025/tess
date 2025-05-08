import React from 'react';
import Vertex from './Vertex';
import Edge from './Edge';
import Polygon from './Polygon';

class RegularPolygon extends Polygon {
    radius: number;
    x: number;
    y: number;
    rotation: number;

    constructor(sides: number, radius: number, x: number, y: number, rotation: number) {
        // set up vertices and edges before calling super
        const vertices: Vertex[] = [];
        const angle = (2 * Math.PI) / sides;

        for (let i = 0; i < sides; i++) {
            const xOffset = radius * Math.cos(i * angle + rotation);
            const yOffset = radius * Math.sin(i * angle + rotation);
            vertices.push(new Vertex(x + xOffset, y + yOffset));
        }

        const edges: Edge[] = [];
        for (let i = 0; i < vertices.length; i++) {
            const start = vertices[i];
            const end = vertices[(i + 1) % vertices.length];
            edges.push(new Edge(start, end));
        }

        // call the parent constructor
        super(sides, vertices, edges);
        
        // now assign extra properties
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
}

export default RegularPolygon;