import Canvas from "./Canvas";
import Mark from "./Mark";
import { UDL as TYPE } from "../../../consts";
import Arrow from "./Arrow";
import Beam from "./Beam";

class UDL {

    mag;
    pos;
    direction;
    type = TYPE;
    endLabel;
    label;

    constructor(magnitude, startPos, pos, direction) {
        this.direction = direction;
        this.mag = magnitude;
        this.pos = pos;
        this.startPos = startPos;
        this.label = Beam.addLabel(this.startPos);
        this.endLabel = Beam.addLabel(this.pos);
    }

    draw() {
        const ctx = Canvas.context;
        const {
            mag: magnitude,
            startPos,
            direction,
            pos
        } = this;

        const f = new Arrow(magnitude, startPos, direction);
        const s = new Arrow(magnitude, startPos + ((pos - startPos) / 2), direction);
        const t = new Arrow(magnitude, pos, direction);

        var x = f.x,
            y = f.y,
            offset = f.offset;
        this.x = x;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(t.x, y);
        var magnitudeTextY = f.isUp() ? y + 15 : y - 5;
        ctx.fillText(`${magnitude}`, s.x, magnitudeTextY);
        new Mark(offset, startPos);
        new Mark(t.offset, pos);
        // lines can't be drawn after mark
    }

}

export default UDL;
