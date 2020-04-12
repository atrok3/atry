import React from "react";
import { getCoords } from "../shared";
import { initReference, hasCollided } from "./functions";

export default ({ contextRef, reference, canvasMidH, canvasMidW, i, c, clear, canvas, handleActive }) => {
  const [coords, setCoords] = React.useState({ });
  const [rect, setRect] = React.useState({  });
  const rectRef = React.useRef();

  React.useEffect(() => { rectRef.current = rect }, [rect]);

  const onMouseMove = (e) => setCoords(getCoords(e));

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  React.useEffect(() => {
    document.addEventListener("touchmove", onMouseMove);
    return () => document.removeEventListener("touchmove", onMouseMove);
  }, []);

  const calculateMidPoint = () => {
    const midX = (reference.x1 + canvasMidW()) / 2;
    const midY = (reference.y1 + canvasMidH()) / 2;
    return { midX, midY };
  }

  const onClick = (e) => {
    const { x, y } = getCoords(e);
    if(!hasCollided(rectRef.current, x, y)) return;
    handleActive({ ...reference, ...calculateMidPoint() });
  }

  React.useEffect(() => {
    const canvasEl = document.getElementById("canvas");
    canvasEl.addEventListener("click", onClick);
    return () => canvasEl.removeEventListener("click", onClick);
  }, []);

  React.useEffect(() => {
    if(!reference) return;
    setRect(initReference(contextRef.current, reference, coords, canvasMidW(), canvasMidH()));
  }, [c]);

  return null;
}
