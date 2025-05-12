import React from "react";
import { useState } from "react";
import ShapeButton from "./ShapeButton";

interface ShapeSelectProps {
  onShapeClick: (n: number) => void;
  currentShape: number;
}

const ShapeSelect = ({ onShapeClick, currentShape }: ShapeSelectProps) => {
  const [customN, setCustomN] = useState("");
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const parsed = parseInt(customN, 10);
      if (!isNaN(parsed) && parsed > 9) {
        onShapeClick(parsed);
        setCustomN("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {[3, 4, 5, 6, 7, 8].map((n) => (
        <ShapeButton
          key={n}
          n={n}
          selected={currentShape === n}
          onClick={() => onShapeClick(n)}
        />
      ))}

      <input
        type="number"
        min={10}
        placeholder="9"
        className={`w-20 rounded border px-2 py-1 text-center ${
          currentShape >= 9 ? "border-4 border-blue-500" : "border-gray-300"
        }`}
        value={customN}
        onChange={(e) => setCustomN(e.target.value)}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export default ShapeSelect;
