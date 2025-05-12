import React from "react";
import { Stage, Layer } from "react-konva";

interface ShapeButtonProps {
  selected: boolean;
  n: number;
  onClick: () => void;
}

const size = 50; // size of the button
const ShapeButton: React.FC<ShapeButtonProps> = ({ selected, n, onClick }) => {
    const radius = size / 2 - 4;
    const cx = size / 2;
    const cy = size / 2;
  
    const angleStep = (2 * Math.PI) / n;
    const baseRotation = Math.PI / 2 + Math.PI / n;
    const rotationRad = baseRotation + (Math.PI / 180); // rotation in radians
    const points = Array.from({ length: n }, (_, i) => {
      const angle = i * angleStep + rotationRad;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  
    const fillColor = selected ? "blue" : "gray"; // darker vs. blue
  
    return (
      <button
        onClick={onClick}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <svg width={size} height={size}>
          <polygon points={points} fill={fillColor} stroke="none" />
        </svg>
      </button>
    );
  };
  
  export default ShapeButton;
