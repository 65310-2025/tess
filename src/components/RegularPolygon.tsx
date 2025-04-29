import React from 'react';
import { Stage, Layer, Line } from 'react-konva';

interface RegularPolygonProps {
    sides: number;
    radius: number;
    x: number;
    y: number;
    rotation?: number; // Rotation in radians
}

const RegularPolygon = ({ sides, radius, x, y, rotation }: RegularPolygonProps) => {
    const points = [];
    const angle = (2 * Math.PI) / sides;
    const rotationAngle = rotation ? rotation : 0;

    for (let i = 0; i < sides; i++) {
        const xOffset = radius * Math.cos(i * angle + rotationAngle);
        const yOffset = radius * Math.sin(i * angle + rotationAngle);
        points.push(x + xOffset, y + yOffset);
    }

    return (
        <Line
            points={points}
            closed={true}
            stroke="black"
            strokeWidth={1}
            fill="transparent"
          />
    );
}

export default RegularPolygon;