import React from "react";
import Radiant from "./radiant";
import "./style.css";

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
    canvasEl.width = window.innerWidth - 20;
    canvasEl.height = window.innerHeight - 20;
    setCanvas(canvasEl);
  }, []);

  return(
    <>
      <canvas id="canvas" style={ { margin: "0 10px", marginTop: "10px" } } />
      <Radiant { ...{ canvas, context, canvasRef, contextRef, canvasMidW, canvasMidH } } />
    </>
  )
}
