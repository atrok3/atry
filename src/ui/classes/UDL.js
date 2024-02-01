import Canvas from "./Canvas";
import Mark from "./Mark";
import { UDL as TYPE } from "../../../consts";
import Arrow from "./Arrow";
import Beam from "./Beam";
import DLine from "./DLine";
import ArrowHead from "./ArrowHead";
import Load from "./Load";

class UDL extends Load {

    mag;
    pos;
    direction;
    type = TYPE;
    endLabel;
    label;
    index;
    relativePos;
    aPos;

    name = "Uniformly Distributed Load"

    constructor({ mag, startPos, pos, direction, index }) {
        super();
        let _startPos = Beam.getAbsolutePosition({ pos: startPos, index })
        let _pos = _startPos + pos;
        this.direction = direction;
        this.mag = mag;
        this.pos = _pos;
        this.startPos = _startPos;
        this.label = Beam.addLabel(this.startPos);
        this.endLabel = Beam.addLabel(this.pos);
        this.index = index;
        this.relativePos = startPos;
        this.relativeEndPos = pos;
        this.aPos = _startPos;
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
        this.offset = offset;
        this.endOffset = t.offset;
        ctx.stroke()
        let fromPos = f.offset;
        let toPos = t.offset;
        ctx.moveTo(toPos, DLine.dLineStartY);
        let arrowhead = new ArrowHead()
        arrowhead
            .drawArrow(ctx,
                fromPos,
                DLine.dLineStartY,
                toPos,
                DLine.dLineStartY
            )

        ctx.moveTo(fromPos, DLine.dLineStartY);
        let arrowhead2 = new ArrowHead()
        arrowhead2
            .drawArrow(ctx,
                toPos,
                DLine.dLineStartY,
                fromPos,
                DLine.dLineStartY
            )
        new Mark(((toPos + fromPos) / 2), (pos - startPos))


        //new Mark(offset - Beam.startX, startPos);
        //new Mark(t.offset - Beam.startX, pos);
        // lines can't be drawn after mark
    }

}

export default UDL;
