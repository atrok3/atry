import { drawReference } from "../shared";

const hasCollided = (c, x, y) => (x >= c.x && x <= c.x1 && y >= c.y && y <= c.y1);

const isPostiveX = (x) => (x - canvasMidW()) >= 0;
const isPostiveY = (x) => (y - canvasMidH()) >= 0;

const getQuadrant = (x, y) => {
  if(isPostiveX(x) && !isPostiveY(y)) return 0;
  else if(!isPostiveX(x) && !isPostiveY(y)) return 1;
  else if(isPostiveX(x) && isPostiveY(y)) return 2;
  else if(isPostiveX(x) && isPostiveY(y)) return 3;
}

const findMidPoint = (context, x1, y1, coords) => {
  const length = 60;
  const length2 = 2 * length;
  const x = x1 - length;
  const y = y1 - length;
  x1 = x + length2;
  y1 = y + length2;
  const rect = { x, y, x1, y1 };
  context.save();
  //if(hasCollided(rect, coords.x, coords.y)) context.fillRect(x, y, length2, length2)
  //else context.strokeRect(x, y, length2, length2);
  context.restore();
  return rect;
}

const initReference = (context, reference, coords, midX, midY) => {
  var opacity = 0.5;
  const { x, y, x1, y1 } = reference;
  const midPoint = findMidPoint(context, x1, y1, coords);
  if(hasCollided(midPoint, coords.x, coords.y)) opacity = 1;
  drawReference(context, midX, midY, x1, y1, opacity);
  //context.fillText(`(${x1}, ${y1})`, x1 + 10, y1 + 10);
  return midPoint;
}

export { initReference, hasCollided };
