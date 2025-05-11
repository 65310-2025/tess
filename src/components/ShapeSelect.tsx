import React from "react";

interface ShapeSelectProps {
  onShapeClick: (n: number) => void;
}

const ShapeSelect = ({ onShapeClick }: ShapeSelectProps) => {
  return (
    <div className="flew flew-row">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => onShapeClick(6)}
      >
        hexagon
      </button>

      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => onShapeClick(4)}
      >
        square
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => onShapeClick(5)}
      >
        pent
      </button>

      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => onShapeClick(3)}
      >
        tri
      </button>
    </div>
  );
};

export default ShapeSelect;
