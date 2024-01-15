import { SS, CLR } from "../../../consts";
import Canvas from "./Canvas";
import DLine from "./DLine";
import FixedSupport from "./FixedSupport";
import PinSupport from "./PinSupport";
import _UDL from "./UDL";

const Labels = ["A", "B", "C", "D", "E", "F"];

class Beam {

  // width in pixels
  static width = 200;
  static len = 8; // used for calculations readable/ real value
  static height = 20;

  static halfWidth = this.width / 2;
  static halfHeight = this.height / 2;

  static startX;
  static startY;
  static endX;
  static endY;

  static loads = [];
  static s1;
  static s2;
  static type = SS;

  static labels = [];

  static draw() {
    let canvasMidX = Canvas.midX;
    let canvasMidY = Canvas.midY;

    let startX = canvasMidX - this.halfWidth;
    let startY = canvasMidY - this.halfHeight;
    let endX = canvasMidX + this.halfWidth;
    let endY = canvasMidY + this.halfHeight;

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;

    let ctx = Canvas.context;
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "#bbb";
    ctx.fillRect(startX, startY, this.width, this.height);
    ctx.rect(startX, startY, this.width, this.height);
    ctx.stroke();
    ctx.restore();

  }

  // draw beam with pin supports and marks
  static drawMarked(firstpin, lastpin = 8, type = Beam.type) {
    this.loads = [];
    this.labels = [];
    Beam.draw();
    DLine.draw();
    if (type == SS) {
      const s1 = new PinSupport(firstpin);
      const s2 = new PinSupport(lastpin);
      Beam.s1 = s1; Beam.s2 = s2;
      Beam.addLoad(s2, s1);
    } else {
      const s1 = new FixedSupport(Beam.type);
      Beam.addLoad(s1);
    }
  }


  static getLoads() {
    return Beam.loads;
  }

  static setLoads(loads) {
    Beam.loads = loads;
  }

  static setLabels(labels) {
    Beam.labels = labels;
  }

  static addLoad(...load) {
    const loads = Beam.loads;

    loads.push(...load);

    loads.sort((a, b) => a.pos - b.pos);

    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
    Beam.draw();
    DLine.draw();

    Beam.loads.forEach((load) => load.draw());
    Beam.setLoads(loads);

    Beam.labels.forEach((load, i) => {
      const ctx = Canvas.context;
      const startY = Canvas.midY;
      let startX = (Beam.width * load) / Beam.len;
      let labelOffset = +10;
      if (i === 0) {
        labelOffset = -10;
      }

      ctx.fillText(Labels[i], startX + labelOffset + Beam.startX, startY);
      ctx.stroke();
    })

  }

  static addLabel(pos) {
    const labels = Beam.labels;
    if (labels.includes(pos)) {
      return Labels[labels.length - 1];
    }

    labels.push(pos);

    labels.sort((a, b) => a - b);

    return Labels[labels.length - 1];

  }

  static clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
    Beam.len = 8;
    Beam.loads = [];
    Beam.labels = [];
    Beam.draw();
    DLine.draw();
  }


}

export default Beam;
