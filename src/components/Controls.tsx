import React from 'react';

interface ControlsProps {
    onOrigamize: () => void;
}


const Controls = ({ onOrigamize }: { onOrigamize: () => void }) => {
    return (
        <div className="flew flew-row">
            <button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onOrigamize}>
                Origamize
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onOrigamize}>
                Tiling
            </button>
        </div>
    );
}

export default Controls;