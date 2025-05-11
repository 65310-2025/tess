import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import Tiling from "./Tiling";
import ResizeObserver from "resize-observer-polyfill"; // optional polyfill
import PolygonTile from "./PolygonTile";

interface PolygonTileDisplayProps {
  w?: number;
  h?: number;
  n: number;
  //   tiling: Tiling;
  pleatWidth?: number;
  tiltAngle?: number;
}

const PolygonTileDisplay = ({
  w,
  h,
  n,
  pleatWidth = 0.35,
  tiltAngle = 75,
}: PolygonTileDisplayProps) => {
  //TODO: triangular lattice
  // shift click to close polygons
  const stageRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = w || 200;
  const height = h || 200;

  const cx = width / 2;
  const cy = height / 2;

  const polygonTile = new PolygonTile(
    n,
    pleatWidth,
    tiltAngle,
    cx,
    cy,
    width / 3,
  );

  return (
    <div ref={containerRef} className="h-full w-full">
      <Stage width={width} height={height}>
        <Layer>
          {polygonTile.edges.map((edge, index) => (
            <Line
              key={index}
              points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]}
              stroke="black"
              strokeWidth={2}
            />
          ))}
          {polygonTile.vertices.map((vertex, index) => (
            <Circle
              key={index}
              x={vertex.x}
              y={vertex.y}
              radius={1}
              fill="red"
            />
          ))}
          {polygonTile.pleatVertices.map((vertex, index) => (
            <Circle
              key={index}
              x={vertex.x}
              y={vertex.y}
              radius={2.5}
              fill="red"
            />
          ))}
            {polygonTile.pleatEdges.map((edge, index) => (
                <Line
                key={index}
                points={[edge.start.x, edge.start.y, edge.end.x, edge.end.y]}
                stroke="blue"
                strokeWidth={2}
                />
            ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default PolygonTileDisplay;
