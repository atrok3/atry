import * as CONST from "../../../consts";
import ILoad from "./load";

class Moment implements ILoad {
    moment: number;
    pos: number;
    direction: string;
    type = CONST.M;
    startPos?: number;
    label: string;

    constructor(moment: number, pos: number, direction: string, label: string) {
        this.moment = moment;
        this.pos = pos;
        this.direction = direction;
        this.label = label;
    }

    calcMoment(point: number) {

        let moment = this.moment;

        if (this.direction == CONST.ANTICLOCKWISE /*&& pos > point*/) moment *= -1; // clockwise


        return {
            moment,
            t1: `${moment}`,
            t2: `${moment}`,
            t3: `${moment}`,
            neg: moment < 0,
        };
    }

    /**
     * sets direction of load using magnitude sign
     */
    calcDirection(){
        this.direction = this.moment > 0 ? CONST.ANTICLOCKWISE : CONST.CLOCKWISE 
    }

}

export default Moment;