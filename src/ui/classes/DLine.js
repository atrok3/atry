import Beam from "./Beam";
import Canvas from "./Canvas";

class DLine {

  static offsetY = 80;

  static draw() {
    let ctx = Canvas.context;
    const dLineStartX = Beam.startX;
    const dLineStartY = Beam.startY + this.offsetY;
    const dLineEndX = Beam.endX;

    ctx.beginPath();
    ctx.moveTo(dLineStartX, dLineStartY);
    ctx.lineTo(dLineEndX, dLineStartY);
    ctx.stroke();
  }

}

export default DLine;
