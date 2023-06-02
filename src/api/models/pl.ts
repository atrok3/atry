import * as CONST from "../../../consts";
import ILoad from "./load";

class PL implements ILoad {
    mag: number;
    pos: number;
    direction: string;
    type = CONST.PL;

    constructor(mag: number, pos: number, direction: string) {
        this.mag = mag;
        this.pos = pos;
        this.direction = direction;
    }

    calcMoment(point: number) {
        let mag = this.mag,
            pos = this.pos,
            direction = this.direction,
            moment = 0,
            _mag = mag,
            distance = point - pos;

        // if it's down -
        if (direction == CONST.DOWN /*&& pos > point*/) _mag *= -1; // clockwise

        let _distance = distance //Math.abs(distance);

        moment = _mag * _distance;

        return {
            moment,
            t1: `${mag}(Xb - ${pos})`,
            t2: `${mag}(${point} - ${pos})`,
            t3: `${mag}(${distance})`,
            neg: _mag < 0,
        };
    }

    /**
     * sets direction of load using magnitude sign
     */
    calcDirection(){
        this.direction = this.mag > 0 ? CONST.UP : CONST.DOWN 
    }

}

export default PL;