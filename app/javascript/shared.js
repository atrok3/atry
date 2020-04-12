const drawArrow = (context, fromx, fromy, tox, toy) => {
  const headlen = 10; // length of head in pixels
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

const drawReference = (context, x, y, x1, y1, opacity = 1, arrow = false) => {
  if(!context) return;
  context.save();
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  drawArrow(context, x, y, x1, y1);
  context.globalAlpha = opacity;
  context.stroke();
  context.restore();
}

const getClientX = (e) => e.clientX? e.clientX : e.touches? e.touches[0].clientX : null;
const getClientY = (e) => e.clientY? e.clientY : e.touches? e.touches[0].clientY : null;

const getCoords = (e) => ({ x: getClientX(e), y: getClientY(e) });

const getDrawCoords = (x, y, x1, y1) => ({ x, y, x1, y1 });

const objectValuesToArray = (obj) => Object.values(obj);

export { drawArrow, drawReference, getCoords , getDrawCoords, objectValuesToArray };
