import React from "react";

export default () => {
  const [coords, setCoords] = React.useState({  });

  const hasCollided = (x, y) => {
    if(x >= coords.x && x <= coords.x1 && y >= coords.y && y <= coords.y1) return true;
    return false;
  }

  return [setCoords, hasCollided];

}
