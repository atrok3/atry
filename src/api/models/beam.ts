import * as CONST from "../../../consts";
import ILoad from "./load";
import Load from "./load";
import Moment from "./moment";
import PL from "./pl";
import UDL from "./udl";

function makeTerm(left = "0", right) {
    return {
        left,
        right,
        title: "",
    }
}

/** 
 * Class for the beam
 * @property len, length of beam
 * @property loads, loads acting on beam
 * @property A, reaction from the left side of the beam
 * @property B, reaction from the right side of the beam
*/

class Beam {
    len: number
    loads: Load[] = []
    A: ILoad
    B: ILoad
    type: string

    smeqn = {
        define: makeTerm("0", ""),
        letXb: makeTerm("0", ""),
        brackets: makeTerm("0", ""),
        sumMs: makeTerm("0", ""),
        moveA: makeTerm("0", ""),
        final: makeTerm("0", ""),
    }

    sfeqn = {
        define: makeTerm("0", ""),
        sumF: makeTerm("0", ""),
        letA: makeTerm("0", ""),
        sumA: makeTerm("0", ""),
        final: makeTerm("B", ""),
    }

    constructor(body) {
        let {
            loads,
            length,
            type,
        } = body;
        this.len = length;
        this.type = type;
        const supports = loads.filter((load) => load.type === CONST.PS || load.type === CONST.F);
        supports.sort((a, b) => a.pos - b.pos);
        if (type === CONST.SS) {
            this.A = new PL(0, supports[0].pos, "", supports[0].label);
            this.B = new PL(0, supports[1].pos, "", supports[1].label);
        } else if (type === CONST.CLR) {
            this.A = new Moment(0, length, "", supports[0].label);
            this.B = new PL(0, length, "", supports[0].label);
        } else {
            this.A = new Moment(0, 0, "", supports[0].label);
            this.B = new PL(0, 0, "", supports[0].label);
        }
        loads = loads.filter((load) => load.type !== CONST.PS && load.type !== CONST.F);
        this.buildLoads(loads);
    }

    /** attach sign based on element position  */
    joinSign(i: number, neg: boolean) {
        if (i == 0) return `${neg ? '-' : ''}` // first element
        return ` ${neg ? '-' : '+'} `
    }

    getALabel(isMoment = false) {
        return `${isMoment ? 'M' : 'P'}<sub>${this.A.label}</sub>`;
    }

    getBLabel(isMoment = false) {
        return `${isMoment ? 'M' : 'P'}<sub>${this.B.label}</sub>`;
    }

    getADistance() {
        return `X<sub>${this.A.label}</sub>`;
    }

    getBDistance() {
        return `X<sub>${this.B.label}</sub>`;
    }


    findSumOfMoments = (): number => {

        let Em = 0;

        let point = this.B.pos;

        this.loads.forEach((load, i) => {
            let {
                moment,
                t1,
                t2,
                t3,
                neg,
            } = load.calcMoment(point, this);
            Em += moment;
            this.smeqn.define.right += `${this.joinSign(i, neg)}${t1}`
            this.smeqn.letXb.right += `${this.joinSign(i, neg)}${t2}`
            this.smeqn.brackets.right += `${this.joinSign(i, neg)}${t3}`
        });

        return Em;
    }

    /**
    * find A using B pos as moment ref
    */
    findA() {
        let Em = 0;

        Em = this.findSumOfMoments();

        let A = this.A;
        let sPos1 = A.pos;
        let sPos2 = this.B.pos;
        let distance = sPos2 - sPos1;
        const aLabel = this.getALabel();
        const bDistance = this.getBDistance();

        this.smeqn.define.right += ` + ${aLabel}(${bDistance} - ${sPos1})`

        this.smeqn.letXb.right += ` + ${aLabel}(${sPos2} - ${sPos1})`
        this.smeqn.letXb.title = `Let ${bDistance} = ${sPos2}`

        this.smeqn.brackets.right += ` + ${aLabel}(${(sPos2 - sPos1) * 1})`

        //this.meqn.push(`${step3Base} + ${distance}A`)

        let momentOfA1 = Em;

        

        // calc magnitude of A
        let aMag = (momentOfA1 / distance * -1);

        aMag = parseFloat(aMag.toFixed(2))

        this.A.mag = aMag;
        this.A.calcDirection()

        this.smeqn.sumMs.right += `${momentOfA1} + ${distance}${aLabel}`;


        this.smeqn.moveA.right += `${Math.abs(momentOfA1)}`
        this.smeqn.moveA.left = `${distance}${aLabel}`

        this.smeqn.final.title = `Divide both sides by ${distance}`
        this.smeqn.final.right = `${this.A.mag}`
        this.smeqn.final.left = `${aLabel}`
    }


    sumOfForces = (): number => {
        let Ef = 0;

        this.loads.forEach((load, i) => {
            if(load.type === CONST.M) return;
            let _mag = load.mag;
            if (load.direction == CONST.DOWN) _mag *= -1;
            Ef += _mag * 1;
            if (i == 0) this.sfeqn.define.right += `${_mag}`
            else this.sfeqn.define.right += ` ${_mag < 0 ? '-' : '+'} ${Math.abs(_mag)}`
        });

        return Ef;
    }

    /**
    * find B by summing forces 
    */
    findB() {
        let Ef = 0;
        const aLabel = this.getALabel();
        const bLabel = this.getBLabel();

        Ef = this.sumOfForces();

        let s = Ef,
            aMag = this.A.mag,
            bMag = 0;

        this.sfeqn.define.right += ` + ${aLabel} + ${bLabel}`

        this.sfeqn.sumF.right = `${s} + ${aLabel} + ${bLabel}`

        this.sfeqn.letA.right = `${s} + ${aMag} + ${bLabel}`
        this.sfeqn.letA.title = `Let ${aLabel} = ${aMag}`



        bMag = ((s + aMag) * -1);

        bMag = parseFloat(bMag.toFixed(2));

        this.B.mag = bMag;

        this.sfeqn.sumA.right = `${bMag * -1} + ${bLabel}`

        this.sfeqn.final.right = `${bMag}`
        this.sfeqn.final.left = `${bLabel}`

        this.B.calcDirection()

    }


    buildLoads = (loads: ILoad[]) => {
        loads.forEach(load => {
            const {
                mag,
                startPos,
                pos,
                direction,
                label,
            } = load;
            let _load: ILoad;
            switch (load.type) {
                case CONST.UDL:
                    _load = new UDL(mag, startPos!, pos, direction, label)
                    break;
                case CONST.M:
                    _load = new Moment(mag, pos, direction, label)
                    break;
                default:
                    _load = new PL(mag, pos, direction, label)
                    break;
            }
            this.loads.push(_load);
        });
    }
}

export default Beam;