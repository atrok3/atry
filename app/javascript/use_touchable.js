import React from "react";
import { getCoords } from "./shared";

export default (initEl, onMouseUpCallback = () => { }) => {

  const handleMouseUpCallback = () => {
    onMouseUpCallback
  }

  const [scroll, initialCoords, coords, setEl] = useTouch(null, onMouseUpCallback);

  React.useEffect(() => {
    if(!scroll) return;

  }, [initialCoords]);

  return [scroll, initialCoords, coords, setEl];
}
