import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import Controls from './Controls';
import Hexagons from './Hexagons';



const RegularPolygonCanvas = () => {
    const stageRef = useRef(null);
    const [polygonRadius, setPolygonRadius] = useState(75);
    const [polygonRotation, setPolygonRotation] = useState(0);
    
    const handleOrigamize = () => {
      setPolygonRadius(prev => prev * 0.75);
      setPolygonRotation(prev => prev + 30); // 30 degrees in Konva (in degrees, not radians)
    };

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center">
      <div className="flex justify-between items-center p-4">
        <Controls onOrigamize={handleOrigamize}/>
      </div>

      <div className="flex justify-center">
        <Hexagons width={600} height={600} radius={polygonRadius} rotation={polygonRotation}/>
      </div>
    </div>
  );
};

export default RegularPolygonCanvas;
