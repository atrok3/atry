import React from "react";

const Canvas = ({ parentStyle, height }) => {
    return (
        <div 
            id="canvasParent" 
            style={{ ...parentStyle }}
        >
            <canvas 
                id="canvas"
                height={height}
            />
        </div>
    )
}

export default Canvas;