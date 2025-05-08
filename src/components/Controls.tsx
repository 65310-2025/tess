import React from 'react';

interface ControlsProps {
    onOrigamize: () => void;
    onShowCreasePattern: () => void;
}


const Controls = ({ onOrigamize, onShowCreasePattern }: ControlsProps) => {
    return (
        <div className="flew flew-row">
            <button className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onOrigamize}>
                Origamize
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onShowCreasePattern}>
                Export Crease Pattern
            </button>
        </div>
    );
}

export default Controls;