import React from "react";
import Reference from "../reference";
import useTouch from "../use_touch";
import useTouchCollision from "../use_touch_collision";
import "./style.css";
import { drawRadiant, drawQuadrant, drawTouchReference } from "./functions";
import Arc from "../arc";

export default (props) => {
  const { canvasRef, canvasMidH, canvasMidW, contextRef, context, canvas } = props;
  const [references, setReferences] = React.useState([ ]);
  const [reference, setReference] = React.useState();
  const referenceRef = React.useRef();
  const [c, setClear] = React.useState(false);
  const clearRef = React.useRef();
  const referencesRef = React.useRef();
  const [setCoords, hasCollided] = useTouchCollision();
  const initialCoordsRef = React.useRef();
  const [active, setActive] = React.useState([]);
  const activeRef = React.useRef();
  const magRef = React.useRef();
  const antiClockwiseRef = React.useRef(false);
  const [arcs, setArcs] = React.useState([]);
  const arcsRef = React.useRef();

  React.useEffect(() => { arcsRef.current = arcs }, [arcs]);

  React.useEffect(() => { referencesRef.current = references }, [references]);

  React.useEffect(() => { referenceRef.current = reference }, [reference]);

  React.useEffect(() => { clearRef.current = c }, [c]);

  React.useEffect(() => { initialCoordsRef.current = initialCoords }, [initialCoords]);

  React.useEffect(() => { activeRef.current = active }, [active]);

  const clear = () => {
    if(!contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onDrawQuadrant();
    onDrawRadiant();
    setClear(!clearRef.current);
  }

  const handleActive = (r) => { activeRef.current.length !== 2? setActive([ ...activeRef.current, r ]) : null };

  const closeActive = () => { setActive([]) };

  const onMouseUpCallback = () => {
    clear();
    setReferences([ ...referencesRef.current, referenceRef.current ]);
    setReference({ });
  }

  const [scroll, initialCoords, coords, setEl] = useTouch(null, onMouseUpCallback);

  const onDrawRadiant = () => {
    if(!contextRef.current) return;
    const newCoords = drawRadiant(contextRef.current, canvasMidW(), canvasMidH(), initialCoords.x, initialCoords.y, hasCollided);
    setCoords({ ...newCoords });
  }

  const onDrawQuadrant = () => {
    if(!contextRef.current) return;
    //drawQuadrant(contextRef.current, canvasMidW(), canvasMidH());
  }

  React.useEffect(() => {
    if(!contextRef.current) return;
    clear();
    contextRef.current.fillText(`(${coords.x}, ${coords.y})`, 10, 20);
  }, [coords]);

  React.useEffect(() => {
    if(!contextRef.current) return;
    if(!scroll) return;
    const drawCoords = drawTouchReference(contextRef.current, canvasMidW(), canvasMidH(), initialCoords.x, initialCoords.y, coords.x, coords.y, clear, hasCollided);
    setReference({ ...drawCoords });
  }, [coords]);

  React.useEffect(() => {
    if(!contextRef.current) return;
    onDrawRadiant();
    setEl(canvas);
    setReferences(drawQuadrant(contextRef.current, canvasMidW(), canvasMidH()));
  }, [contextRef.current]);

  const handleSetAngle = (e) => {
    e.preventDefault();
    const text = magRef.current.value;
    const antiClockwise  = antiClockwiseRef.current.checked;
    // the angle is drawn in clockWise;
    var p1 = active[0];
    var p3 = active[1];
    const center = { x: canvasMidW(), y: canvasMidH() };
    const det = (p1.x1 - center.x) * (p3.y1 - center.y) - (p3.x1 - center.x) * (p1.y1 - center.y);
    if(det < 0) [p3, p1] = [p1, p3];
    const diffX = p1.midX - center.x;
    const diffY = p1.midY - center.y;
    const diffX2 = p3.midX - center.x;
    const diffY2 = p3.midY - center.y;
    const midX = (p1.midX + p3.midX) / 2;
    const midY = (p1.midY + p3.midY) / 2;
    const startAngle = Math.atan2(diffY, diffX);
    const endAngle = Math.atan2(diffY2, diffX2);
    const radius = Math.abs(Math.sqrt(diffX*diffX + diffY*diffY));
    setArcs([ ...arcsRef.current, { radius, startAngle, endAngle, antiClockwise, text, mid: { midX, midY } } ]);
    closeActive();
  }

  return (
    <>
      {
        active.length === 2?
          <div className={`dialog`}>
            <div className="dialog-outer">
              <div className="dialog-inner">
                <div className="dialog-box">
                  <button className="float-right" onClick={ closeActive }>close</button>
                  <form className="clear-both" onSubmit={ handleSetAngle }>
                    <div>
                      <input ref={ magRef } placeholder="Magnitude of angle" />
                    </div>
                    <div>
                      <input ref={ antiClockwiseRef } type="checkbox" />
                    </div>
                    <div className="float-right">
                      <input type="submit" value="Ok" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        : null
      }
      {
        references.map((r, i) => <Reference key={ i } reference={ r } { ...props } { ...{ c, clear, handleActive } } />)
      }
      {
        arcs.map((a, i) => <Arc key={ i } arc={ a } { ...props } { ...{ c, clear, handleActive } } />)
      }
    </>
  );
}
