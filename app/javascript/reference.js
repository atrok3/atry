import React from "react";
import { drawReference } from "./shared";
import useTouchCollision from "./use_touch_collision";
import useTouch from "./use_touch";
import { getCoords } from "./shared";

export default ({ contextRef, reference, canvasMidH, canvasMidW, i, c, clear, canvas }) => {
  const [coords, setCoords] = React.useState({ });

  const onMouseMove = (e) => setCoords(getCoords(e));

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  React.useEffect(() => {
    document.addEventListener("touchmove", onMouseMove);
    return () => document.removeEventListener("touchmove", onMouseMove);
  }, []);

  const hasCollided = (c, x, y) => (x >= c.x && x <= c.x1 && y >= c.y && y <= c.y1);

  const isPostiveX = (x) => (x - canvasMidW()) >= 0;
  const isPostiveY = (x) => (y - canvasMidH()) >= 0;

  const getQuadrant = (x, y) => {
    if(isPostiveX(x) && !isPostiveY(y)) return 0;
    else if(!isPostiveX(x) && !isPostiveY(y)) return 1;
    else if(isPostiveX(x) && isPostiveY(y)) return 2;
    else if(isPostiveX(x) && isPostiveY(y)) return 3;
  }

  const findMidPoint = (x1, y1) => {
    const length = 60;
    const length2 = 2 * length;
    const x = x1 - length;
    const y = y1 - length;
    x1 = x + length2;
    y1 = y + length2;
    const rect = { x, y, x1, y1 };
    contextRef.current.save();
    if(hasCollided(rect, coords.x, coords.y)) contextRef.current.fillRect(x, y, length2, length2)
    else contextRef.current.strokeRect(x, y, length2, length2);
    contextRef.current.restore();
    return rect;
  }

  React.useEffect(() => {
    if(!reference) return;
    var opacity = 0.5;
    const { x, y, x1, y1 } = reference;
    const midPoint = findMidPoint(x1, y1);
    if(hasCollided(midPoint, coords.x, coords.y)) opacity = 1;
    drawReference(contextRef.current, canvasMidW(), canvasMidH(), reference.x1, reference.y1, opacity);
    contextRef.current.fillText(`(${x1}, ${y1})`, x1 + 10, y1 + 10);
  }, [c]);

  return null;
}
