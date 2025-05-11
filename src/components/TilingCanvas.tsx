import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Group } from "react-konva";
import Tiling from "./Tiling";
import PolygonTile from "./PolygonTile";
import ShapesControls from "./ShapeSelect";
import PolygonTileParameters from "./PolygonTileParameters";
import PolygonTileDisplay from "./PolygonTileDisplay";
import { KonvaEventObject, NodeConfig } from "konva/lib/Node";

interface TilingCanvasProps {
  width?: number;
  height?: number;
}

const TilingCanvas = ({ width, height }: TilingCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [origamized, setOrigamized] = useState(false);
  const [currentPolygonTileN, setCurrentPolygonTileN] = useState(0);
  const [w, setW] = useState(0.35);
  const [twistAngle, setTwistAngle] = useState(70);
  const [tiling, setTiling] = useState(new Tiling([]));
  const [bestSnapPoint, setBestSnapPoint] = useState<{
    cx: number;
    cy: number;
  } | null>();

  const sideLength = width ? width / 8 : 0;

  const handleShapeClick = (n: number) => {
    setCurrentPolygonTileN(n);
  };

  const handleCanvasClick = (evt: KonvaEventObject<MouseEvent>) => {
    if (currentPolygonTileN === 0) {
      console.error("No polygon tile selected");
      return;
    }
    const stage = evt.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (!stage || !pointer) {
      console.error("Stage or pointer is undefined");
      return;
    }

    if (tiling.polygonTiles.length === 0) {
      // add where pointer is
      const newTile = new PolygonTile(
        currentPolygonTileN,
        w,
        twistAngle,
        pointer.x,
        pointer.y,
        sideLength,
      );
      setTiling(tiling.addPolygonTile(newTile));
      console.log("added first tile");
      return;
    }

    let curBestSnapPoint = null;
    let curBestEdge = null;
    let curBestTile = null;
    let minDist = Infinity;

    for (const tile of tiling.polygonTiles) {
      for (const edge of tile.edges) {
        const midpoint = {
          x: (edge.start.x + edge.end.x) / 2,
          y: (edge.start.y + edge.end.y) / 2,
        };

        const dx = edge.end.x - edge.start.x;
        const dy = edge.end.y - edge.start.y;

        const dist = Math.hypot(pointer.x - midpoint.x, pointer.y - midpoint.y);
        if (dist < minDist) {
          // find where to snap based on best edge
          minDist = dist;

          const orth = tile.getOutwardOrthogonal(edge);
          const apothem =
            sideLength / (2 * Math.tan(Math.PI / currentPolygonTileN));

          const snapX = midpoint.x + orth.x * apothem;
          const snapY = midpoint.y + orth.y * apothem;

          curBestSnapPoint = { cx: snapX, cy: snapY };
          curBestEdge = edge;
          curBestTile = tile;
        }
      }
    }

    if (!curBestSnapPoint || !curBestEdge || !curBestTile) {
      console.log("No best snap point found");
      return;
    }

    let rotationDeg = 0;

    // calculate angle to rotate new tile based on the tile we are snapping to
    // if (currentPolygonTileN % 2 == 0) {
      const dx = curBestEdge.end.x - curBestEdge.start.x;
      const dy = curBestEdge.end.y - curBestEdge.start.y;
      const edgeAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      // const angleStepDeg = 180 / currentPolygonTileN;
      // rotationDeg = edgeAngle - angleStepDeg;
      const angleOffset = 360 / (currentPolygonTileN / 2);
      rotationDeg = edgeAngle + angleOffset / 2;
    // } else {
    //   const orth = curBestTile.getOutwardOrthogonal(curBestEdge);
    //   rotationDeg = Math.atan2(orth.y, orth.x) * (180 / Math.PI);
    // }
    // const dx = curBestEdge.end.x - curBestEdge.start.x;
    // const dy = curBestEdge.end.y - curBestEdge.start.y;
    // const edgeAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    // const angleOffset = 180 / currentPolygonTileN;
    // const rotationDeg = edgeAngle - angleOffset;

    // const angleStepDeg = 360 / currentPolygonTileN;
    // const rotationDeg = edgeAngle - angleStepDeg / 2;
    console.log("angle to rotate new tile: ", rotationDeg);

    const newTile = new PolygonTile(
      currentPolygonTileN,
      w,
      twistAngle,
      curBestSnapPoint.cx,
      curBestSnapPoint.cy,
      sideLength,
      rotationDeg,
      curBestTile.creaseParity * -1,
    );

    setBestSnapPoint(curBestSnapPoint);
    setTiling(tiling.addPolygonTile(newTile));
  };

  //TODO: triangular lattice
  // shift click to close polygons

  return (
    <div className="flex flex-row">
      <div className="flex flex-col ">
        <div className="flex items-center justify-between p-4">
          <ShapesControls onShapeClick={handleShapeClick} />
        </div>

        <div className="flex justify-center border-2 ">
          <PolygonTileDisplay
            w={width ? width / 3 : 0}
            h={height ? height / 2 : 0}
            n={currentPolygonTileN}
            pleatWidth={w}
            tiltAngle={twistAngle}
          />
        </div>

        <div className="flex border-2">
          <PolygonTileParameters
            w={w}
            twistAngle={twistAngle}
            setW={setW}
            setTwistAngle={setTwistAngle}
          />
        </div>
      </div>
      <div ref={containerRef} className="h-full w-full border-2">
        <Stage width={width} height={height} onDblClick={handleCanvasClick}>
          <Layer>
            {bestSnapPoint && (
              <Circle
                x={bestSnapPoint.cx}
                y={bestSnapPoint.cy}
                radius={5}
                fill="green"
              />
            )}
          </Layer>
          <Layer>
            {tiling.polygonTiles.map((polygonTile, index) => (
              <Group>
                {polygonTile.edges.map((edge, index) => (
                  <Line
                    key={index}
                    points={[
                      edge.start.x,
                      edge.start.y,
                      edge.end.x,
                      edge.end.y,
                    ]}
                    stroke="gray"
                    strokeWidth={0.5}
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
                {polygonTile.pleatEdges.map((edge, index) => (
                  <Line
                    key={index}
                    points={[
                      edge.start.x,
                      edge.start.y,
                      edge.end.x,
                      edge.end.y,
                    ]}
                    stroke={edge.crease == 1 ? "red" : "blue"}
                    dash={edge.crease == -1 ? [5, 5] : []}
                    strokeWidth={1}
                  />
                ))}
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default TilingCanvas;
