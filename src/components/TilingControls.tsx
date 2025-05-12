// two places to input value, w, and twist angle 
// default: w = 0.35, twist angle = 75 degrees

import React from "react";

interface TilingControlsProps {
  w: number;
  twistAngle: number;
  setW: (value: number) => void;
  setTwistAngle: (value: number) => void;
  onExportToFOLD: () => void;
}

const TilingControls = ({
  w,
  twistAngle,
  setW,
  setTwistAngle,
  onExportToFOLD,
}: TilingControlsProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-white shadow-sm w-full max-w-xs">
      <div className="flex flex-col">
        <label htmlFor="w" className="text-sm font-medium text-gray-700">
          Pleat width (w)
        </label>
        <input
          id="w"
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={w}
          onChange={(e) => setW(parseFloat(e.target.value))}
          className="mt-1 border px-2 py-1 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="twist" className="text-sm font-medium text-gray-700">
          Twist Angle (°)
        </label>
        <input
          id="twist"
          type="number"
          step="1"
          min="0"
          max="360"
          value={twistAngle}
          onChange={(e) => setTwistAngle(parseFloat(e.target.value))}
          className="mt-1 border px-2 py-1 rounded-md"
        />
      </div>
      {/* <div>
        <button onClick={onExportToFOLD}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Export to FOLD
        </button>
      </div> */}
    </div>
  );
};

export default TilingControls;
