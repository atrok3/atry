import Canvas from "./Canvas";
import Mark from "./Mark";
import { PL } from "../../../consts";
import Arrow from "./Arrow";
import Beam from "./Beam";
import Load from "./Load";

class PointLoad extends Load {

	mag;
	pos;
	direction;
	type = PL;
	label;
	index;
	name = "Point Load";
	relativePos;
	aPos;

	constructor({ mag, pos, direction, index }) {
		super();
		let _pos = Beam.getAbsolutePosition({ pos, index })
		this.direction = direction;
		this.mag = mag;
		this.pos = _pos;
		this.label = Beam.addLabel(this.pos);
		this.index = index;
		this.relativePos = pos;
		this.aPos = _pos;
	}

	draw() {
		const ctx = Canvas.context;
		const arrow = new Arrow(this.mag, this.pos, this.direction);
		var x = arrow.x, y = arrow.y, x1 = arrow.x1, y1 = arrow.y1, offset = arrow.offset;
		this.x = x;
		this.y = y;
		this.offset = offset;
		var magnitudeTextY = arrow.isUp() ? y + 15 : y - 5;
		ctx.fillText(`${this.mag}`, x, magnitudeTextY);
		//new Mark(offset - Beam.startX, this.pos);
	}

}

export default PointLoad;
