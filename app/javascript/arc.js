import React from "react";

export default ({ c, arc, contextRef, canvasMidW, canvasMidH }) => {

  const drawArc = () => {
    const { radius, startAngle, endAngle, antiClockwise, mid, text } = arc;
    contextRef.current.save();
    contextRef.current.beginPath();
    contextRef.current.arc(canvasMidW(), canvasMidH(), radius, startAngle, endAngle, antiClockwise);
    contextRef.current.globalAlpha = 0.6;
    contextRef.current.stroke();
    contextRef.current.restore();
    contextRef.current.fillText(text, mid.midX, mid.midY);
  }

  React.useEffect(() => drawArc(), [c]);

  return null;
}
