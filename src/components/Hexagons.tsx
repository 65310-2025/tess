import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import RegularPolygon from './RegularPolygon';

interface HexagonsProps {
    width: number;
    height: number;
    radius?: number;
    rotation?: number;
}


const Hexagons = ({width, height, radius, rotation}: HexagonsProps) => {
    const centerX = width / 2;
    const centerY = height / 2;
    radius = radius || 75; // default radius
    rotation = rotation || Math.PI / 6; // default rotation
  
    const dx = Math.sqrt(3) * 75; // TODO: remove hardcoded value
    const dy = 1.5 * 75; 
  
    const hexCenters = [
      [0, 0], // center
      [dx, 0],
      [-dx, 0],
      [dx / 2, dy],
      [-dx / 2, dy],
      [dx / 2, -dy],
      [-dx / 2, -dy]
    ];
  
    return (
        <div className="border-4 border-black rounded-md">
        <Stage width={width} height={height}>
          <Layer>
            {hexCenters.map(([offsetX, offsetY], idx) => (
              <RegularPolygon
                key={idx}
                sides={6}
                radius={radius}
                x={centerX + offsetX}
                y={centerY + offsetY}
                rotation={rotation}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  };
  
  export default Hexagons;
