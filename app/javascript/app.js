import React from "react";
import Radiant from "./radiant";

export default function(){
  const [canvas, setCanvas] = React.useState();
  const [context, setContext] = React.useState();
  const canvasRef = React.useRef();
  const contextRef = React.useRef();

  const canvasMidW = () => canvasRef.current.width / 2;

  const canvasMidH = () => canvasRef.current.height / 2;

  React.useEffect(() => { canvasRef.current = canvas }, [canvas]);

  React.useEffect(() => { contextRef.current = context }, [context]);

  React.useEffect(() => { if(canvas) setContext(canvas.getContext("2d")) }, [canvas]);

  React.useEffect(() => {
    const canvasEl = document.getElementById("canvas");
    const margin = 20;
    canvasEl.width = window.innerWidth - margin;
    canvasEl.height = window.innerHeight - 60;
    setCanvas(canvasEl);
  }, []);

  return(
    <>
      <div style={ { backgroundColor: "#fe0000", color: "#fff" } }>
        <div style={ { height: "54px", padding: "0 10px", display: "flex", alignItems: "center" } }>
          <div>
            <img src="/logo.png" width="25" />
          </div>
          <div style={ { flexGrow: 1 } }>
          </div>
          <div>
            <span>menu</span>
          </div>
        </div>
      </div>
      <canvas id="canvas" className="clear-both" style={ { margin: "0 10px" } } />
      <Radiant { ...{ canvas, context, canvasRef, contextRef, canvasMidW, canvasMidH } } />
    </>
  )
}
