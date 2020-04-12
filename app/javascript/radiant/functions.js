import { drawReference, getDrawCoords, drawArrow } from "../shared";

const drawRadiant = (context, x, y, x1, y1, hasCollided) => {
  context.save();
  context.beginPath();
  context.arc(x, y, 10, 0, 2 * Math.PI);
  context.globalAlpha = hasCollided(x1, y1)? 0.6 : 1;
  context.fill();
  context.restore();
  const length = 60;
  const length2 = length * 2;
  x1 = x - length;
  y1 = y - length;
  const y2 = y + length;
  const x2 = x + length;
  //context.strokeRect(x1, y1, length2, length2);
  return { x: x1, y: y1, x1: x2, y1: y2 };
}


const drawQuadrant = (context, midX, midY) => {
  const length = 100;
  const negYEnd = midY - length;
  const posYEnd = midY + length;
  const negXEnd = midX - length;
  const posXEnd = midX + length;
  const textOffSet = 20;
  context.fillText("y", midX, negYEnd - textOffSet);
  context.fillText("x", posXEnd + textOffSet, midY);
  return [
    { x: midX, y: midY, x1: midX, y1: negYEnd },
    { x: midX, y: midY, x1: midX, y1: posYEnd },
    { x: midX, y: midY, x1: negXEnd, y1: midY },
    { x: midX, y: midY, x1: posXEnd, y1: midY }
  ];
}

const drawTouchReference = (context, midX, midY, x, y, x1, y1, clear, hasCollided) => {
  if(!hasCollided(x, y)) return;
  clear();
  const drawCoords = getDrawCoords(x, y, x1, y1);
  drawReference(context, midX, midY, x1, y1);
  return drawCoords;
}


export { drawTouchReference, drawQuadrant, drawRadiant };
