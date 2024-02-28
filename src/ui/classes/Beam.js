import CONST, { SS, CLR, DOWN } from "../../../consts";
import ArrowHead from "./ArrowHead";
import Canvas from "./Canvas";
import DLine from "./DLine";
import FixedSupport from "./FixedSupport";
import Mark from "./Mark";
import Moment from "./Moment";
import PinSupport from "./PinSupport";
import PointLoad from "./PointLoad";
import UDL from "./UDL";
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

    // draw beam and marks
    static drawMarked(firstpin = 0, lastpin = 2, type = Beam.type) {
        this.setLoads([]);
        this.setLabels([]);
        Beam.draw();
        DLine.draw();
        this.drawRef()
        if (type == SS) {

        } else {
            const s1 = new FixedSupport({ type: Beam.type });
            Beam.addLoad(s1);
        }
    }


    static drawArrow(fromPos, toPos, text = null) {

        let context = Canvas.context;

        // left arrow
        context.moveTo(fromPos, DLine.dLineStartY);
        let _arrowhead = new ArrowHead()
        _arrowhead
            .drawArrow(context,
                toPos,
                DLine.dLineStartY,
                fromPos,
                DLine.dLineStartY
            )
        context.moveTo(toPos, DLine.dLineStartY);
        let arrowhead = new ArrowHead()
        arrowhead
            .drawArrow(context,
                fromPos,
                DLine.dLineStartY,
                toPos,
                DLine.dLineStartY
            )
        new Mark(((toPos + fromPos) / 2), text)
    }

    static drawRef() {
        let fromPos = Beam.startX;
        let toPos = Beam.endX;


        this.drawArrow(fromPos, toPos, Beam.len);

    }

    static getBeamOptions(includeStart = true) {
        let loads = [];
        if (includeStart) loads.push({ name: "Beam start", value: "beamstart" });
        loads = loads.concat(...Beam.loads.map((load, i) => ({ name: load.getName(), value: i })))
        return loads;
    }

    static getRatioPosition(pos) {
        pos *= 1;
        // offset in pixels
        let offset = (Beam.width * pos) / Beam.len;
        return offset + this.startX;
    }

    static getAbsolutePosition({ index, pos }) {
        if (index !== "beamstart" && index !== "beamend") {
            pos += Beam.getLoadByIndex(index).pos;
        }
        return pos;
    }

    static getLoadByIndex(index) {
        return Beam.getLoads()[index];
    }

    static getLoads() {
        return Beam.loads;
    }

    static setLoads(loads) {
        Beam.loads = loads;
    }

    static getLabels() {
        return Beam.labels;
    }

    static setLabels(labels) {
        Beam.labels = labels;
    }

    static addLoad(...load) {
        let context = Canvas.context;
        const loads = Beam.getLoads();

        loads.push(...load);

        loads.sort((a, b) => a.pos - b.pos);

        Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
        Beam.draw();
        DLine.draw();
        this.drawRef()

        Beam.loads.forEach(load => load.draw());
        Beam.setLoads(loads);



        loads.forEach((load) => {

            let loadIndex;

            if (load.index === "beamstart") {

                loadIndex = {
                    offset: Beam.startX,
                    pos: 0,
                }
            }else if (load.index === "beamend"){
                loadIndex = {
                    offset: Beam.endX,
                    pos: Beam.len,
                }
            }

            else loadIndex = this.getLoadByIndex(load.index);
            
            let fromPos = loadIndex.offset;
            let toPos = load.offset;
            if (toPos - fromPos <= 0) return;
            if (load.type == CONST.UDL) {
                this.drawArrow(fromPos, toPos, (load.startPos - loadIndex.pos));

            } else if (loadIndex.type == CONST.UDL) {
                fromPos = loadIndex.endOffset;
                if (toPos - fromPos <= 0) return;

                this.drawArrow(fromPos, toPos, Math.abs((load.pos - loadIndex.pos)));


            } else {


                this.drawArrow(fromPos, toPos, Math.abs((load.pos - loadIndex.pos)));

            }

        });

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
        const labels = Beam.getLabels();
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
        Beam.setLoads([]);
        Beam.setLabels([]);
        Beam.draw();
        DLine.draw();
    }


}

export default Beam;
