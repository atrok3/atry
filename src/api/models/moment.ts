import * as CONST from "../../../consts";
import ILoad from "./load";

class Moment implements ILoad {
    moment: number;
    pos: number;
    direction: string;
    type = CONST.M;

    constructor(moment: number, pos: number, direction: string) {
        this.moment = moment;
        this.pos = pos;
        this.direction = direction;
    }

    calcMoment(point: number) {

        const moment = this.moment;

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