import React, { useEffect, useState, useRef } from "react";
import Controls from "./Controls";
import HexagonSet from "./template_tiles/Hexagons";
import Tiling from "./Tiling";
import TilingCanvas from "./TilingCanvas";
import PolygonTile from "./PolygonTile";
import ShapesControls from "./ShapeSelect";
import PolygonTileParameters from "./PolygonTileParameters";
import PolygonTileDisplay from "./PolygonTileDisplay";

interface TessProps {
  width?: number;
  height?: number;
}

const Tess = ({ width, height }: TessProps) => {
  // render tiling
  // TODO divide shape up
  return (
    <div className="flex flex-row items-center bg-gray-100">
      <div className="flex flex-col items-center">
        {/* <div className="flex items-center justify-between p-4">
          <Controls />
        </div> */}

        <div className="flex justify-center">
          <TilingCanvas width={width} height={height} />
        </div>
      </div>
    </div>
  );
};

export default Tess;
