import Canvas from "./Canvas";
import PointLoad from "./PointLoad";
import DLine from "./DLine";
import PinSupport from "./PinSupport";
import Mark from "./Mark";
import { ANTICLOCKWISE, CLR, CLOCKWISE, DOWN, M, PL, SS, UDL } from "../../../consts";
import _UDL from "./UDL";
import Moment from "./Moment";

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

  static addLoad(load, type) {
    let l;
    const {
      mag,
      pos,
      direction
    } = load;
    if (type == PL) {
      l = new PointLoad(mag * 1, pos * 1, direction);
    } else if (type == UDL) {
      l = new _UDL(mag * 1, load.startPos * 1, pos * 1, direction);
    } else if (type == M) {
      l = new Moment(mag * 1, pos, direction);
    }
    this.loads.push(l);
  }

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
  static drawMarked(firstpin, lastpin = 8, type) {
    Beam.draw();
    DLine.draw();
    new Mark(0);
    new Mark(Beam.width, Beam.len);
    if (Beam.type == SS) {
      Beam.s1 = new PinSupport(firstpin);
      Beam.s2 = new PinSupport(lastpin);
      Beam.s1.draw();
      Beam.s2.draw();
    }else {
      Beam.updateType(type);
    }
  }

  static updateType(type) {
    Beam.beam_type = type;
    let startX = Beam.beam_type == CLR ? Beam.endX : Beam.startX - 10;
    let startY = Beam.startY - 30;
    let endX = 10;
    let endY = 80;

    let ctx = Canvas.context;
    ctx.beginPath();
    ctx.save();
    ctx.rect(startX, startY, endX, endY);
    ctx.stroke();
    ctx.restore();
  }

}

export default Beam;
