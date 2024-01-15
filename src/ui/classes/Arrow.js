import { UP } from "../../../consts";
import ArrowHead from "./ArrowHead";
import Beam from "./Beam";
import Canvas from "./Canvas";

class Arrow extends ArrowHead {

    x;
    y;
    y1;
    x1;
    direction;
    offset;

    isUp() {
        return this.direction == UP
    }

    constructor(mag, pos, direction) {
        super();
        const ctx = Canvas.context;
        const beamStartX = Beam.startX;
        const beamStartY = Beam.startY;
        const beamEndY = Beam.endY;
        const beamHeight = Beam.height;
        this.direction = direction;

        let offset = pos * 1;

        // offset in pixels
        offset = (Beam.width * offset) / Beam.len;

        mag *= 1;

        var x = beamStartX + offset;
        var y = this.isUp() ? beamEndY + beamHeight : beamStartY - beamHeight;
        var x1 = x;
        var y1 = this.isUp() ? beamEndY : beamStartY;

        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.offset = offset;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        this.drawArrow(ctx, x, y, x1, y1);
    }
}

export default Arrow;