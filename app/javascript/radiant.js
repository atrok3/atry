import React from "react";
import Reference from "./reference";
import useTouch from "./use_touch";
import { drawReference, objectValuesToArray, getDrawCoords, drawArrow } from "./shared";
import useTouchCollision from "./use_touch_collision";

export default (props) => {
  const { canvasRef, canvasMidH, canvasMidW, contextRef, context, canvas } = props;
  const [references, setReferences] = React.useState([]);
  const [reference, setReference] = React.useState();
  const referenceRef = React.useRef();
  const [c, setClear] = React.useState(false);
  const clearRef = React.useRef();
  const referencesRef = React.useRef();
  const [setCoords, hasCollided] = useTouchCollision();
  const initialCoordsRef = React.useRef();

  React.useEffect(() => { referencesRef.current = references }, [references]);

  React.useEffect(() => { referenceRef.current = reference }, [reference]);

  React.useEffect(() => { clearRef.current = c }, [c]);

  React.useEffect(() => { initialCoordsRef.current = initialCoords }, [initialCoords]);

  const clear = () => {
    if(!contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawQuadrant();
    drawRadiant();
    setClear(!clearRef.current);
  }

  const onMouseUpCallback = () => {
    clear();
    setReferences([ ...referencesRef.current, referenceRef.current ]);
    setReference({ });
  }

  const [scroll, initialCoords, coords, setEl] = useTouch(null, onMouseUpCallback);

  const drawRadiant = () => {
    if(!contextRef.current) return;
    contextRef.current.save();
    contextRef.current.beginPath();
    contextRef.current.arc(canvasMidW(), canvasMidH(), 10, 0, 2 * Math.PI);
    contextRef.current.globalAlpha = hasCollided(initialCoords.x, initialCoords.y)? 0.6 : 1;
    contextRef.current.fill();
    contextRef.current.restore();
    const length = 60;
    const length2 = length * 2;
    const x = canvasMidW() - length;
    const x1 = canvasMidW() + length;
    const y = canvasMidH() - length;
    const y1 = canvasMidH() + length;
    setCoords({ x, y, x1, y1 });
    contextRef.current.strokeRect(x, y, length2, length2);
  }

  const drawQuadrant = () => {
    if(!contextRef.current) return;
    const h = canvasMidH();
    const w = canvasMidW();
    const length = 200;
    const h1 = h - length;
    const h2 = h + length;
    const w1 = w - length;
    const w2 = w + length;
    contextRef.current.save();
    contextRef.current.beginPath();
    contextRef.current.moveTo(w, h1);
    contextRef.current.lineTo(w, h2);
    contextRef.current.fillText("x", w, h1 - 10);
    contextRef.current.moveTo(w1, h);
    contextRef.current.lineTo(w2, h);
    contextRef.current.fillText("y", w2 + 10, h);
    contextRef.current.strokeStyle = "blue";
    contextRef.current.stroke();
    contextRef.current.restore();
  }

  React.useEffect(() => {
    if(!contextRef.current) return;
    clear();
    const { x, y } = coords;
    contextRef.current.fillText(`(${x}, ${y})`, 10, 20);
  }, [coords]);

  React.useEffect(() => {
    if(!contextRef.current) return;
    if(!scroll) return;
    const { x, y } = initialCoords;
    if(!hasCollided(x, y)) return;
    const drawCoords = getDrawCoords(x, y, coords.x, coords.y);
    clear();
    drawReference(contextRef.current, canvasMidW(), canvasMidH(), coords.x, coords.y);
    setReference({ ...drawCoords });
  }, [coords]);

  React.useEffect(() => {
    if(!contextRef.current) return;
    drawRadiant();
    setEl(canvas);
  }, [contextRef.current]);

  return (
    <>
      {
        references.map((r, i) => <Reference key={ i } reference={ r } { ...props } { ...{ c, clear } } />)
      }
    </>
  );
}
