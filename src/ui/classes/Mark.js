import Canvas from "./Canvas";
import Beam from "./Beam";
import DLine from "./DLine";

class Mark {
  static marks = [];

  constructor(markOffset, text){
    let marks = Mark.marks;
    let ctx = Canvas.context;
    const markTextOffset = Canvas.midY + DLine.offsetY + 10;
    const markStartX = Beam.startX + markOffset;
    const markStartY = Beam.startY + DLine.offsetY - 5;
    const markEndY = markStartY + 10;
    ctx.moveTo(markStartX, markStartY);
    ctx.lineTo(markStartX, markEndY);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillText(text || markOffset, markStartX, markTextOffset);
    ctx.stroke();
    marks.push(markOffset);
  }
}

export default Mark;
