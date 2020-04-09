import React from "react";
import { getCoords } from "./shared";


export default (initEl, onMouseUpCallback = () => { }) => {
  const [scroll, setScroll] = React.useState();
  const [initialCoords, setInitialCoords] = React.useState({ });
  const [coords, setCoords] = React.useState({ });
  const [el, setEl] = React.useState(initEl);

  const onMouseUp = () => {
    setInitialCoords({  });
    setScroll();
    onMouseUpCallback();
  };

  const onMouseMove = (e) => setCoords(getCoords(e));

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  React.useEffect(() => {
    document.addEventListener("touchmove", onMouseMove);
    return () => document.removeEventListener("touchmove", onMouseMove);
  }, []);

  React.useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, []);

  React.useEffect(() => {
    document.addEventListener("touchend", onMouseUp);
    return () => document.removeEventListener("touchend", onMouseUp);
  }, []);

  React.useEffect(() => {
    if(!el) return;
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("touchstart", onMouseDown);
  }, [el]);

  const onMouseDown = (e) => {
    setInitialCoords(getCoords(e));
    setScroll(e.currentTarget);
  };

  return [scroll, initialCoords, coords, setEl];
}
