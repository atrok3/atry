import * as CONST from "../../../consts";
import ILoad from "./load";
import Load from "./load";
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
    A: PL
    B: PL

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
        const {
            loads,
            supportPos1,
            supportPos2,
            length,
        } = body;
        this.len = length;
        this.A = new PL(0, supportPos1, "");
        this.B = new PL(0, supportPos2, "");
        this.buildLoads(loads);
    }

    /** attach sign based on element position  */
    joinSign(i: number, neg: boolean) {
        if (i == 0) return `${neg ? '-' : ''}` // first element
        return ` ${neg ? '-' : '+'} `
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
            } = load.calcMoment(point);
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

        this.smeqn.define.right += ` + A(Xb - ${sPos1})`

        this.smeqn.letXb.right += ` + A(${sPos2} - ${sPos1})`
        this.smeqn.letXb.title = `Let Xb = ${sPos2}`

        this.smeqn.brackets.right += ` + A(${(sPos2 - sPos1) * 1})`

        //this.meqn.push(`${step3Base} + ${distance}A`)

        let momentOfA1 = Em;

        // calc magnitude of A
        this.A.mag = (momentOfA1 / distance * -1);
        this.A.calcDirection()

        this.smeqn.sumMs.right += `${momentOfA1} + ${distance}A`;


        this.smeqn.moveA.right += `${Math.abs(momentOfA1)}`
        this.smeqn.moveA.left = `${distance}A`

        this.smeqn.final.title = `Divide both sides by ${distance}`
        this.smeqn.final.right = `${this.A.mag}`
        this.smeqn.final.left = "A"
    }


    sumOfForces = (): number => {
        let Ef = 0;

        this.loads.forEach((load, i) => {
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

        Ef = this.sumOfForces();

        let s = Ef,
            aMag = this.A.mag,
            bMag = 0;

        this.sfeqn.define.right += ` + A + B`

        this.sfeqn.sumF.right = `${s} + A + B`

        this.sfeqn.letA.right = `${s} + ${aMag} + B`
        this.sfeqn.letA.title = `Let A = ${aMag}`



        this.B.mag = ((s + aMag) * -1);
        bMag = this.B.mag;

        this.sfeqn.sumA.right = `${bMag * -1} + B`

        this.sfeqn.final.right = `${bMag}`
        this.sfeqn.final.left = `B`

        this.B.calcDirection()

    }


    buildLoads = (loads: ILoad[]) => {
        loads.forEach(load => {
            const {
                mag,
                startPos,
                pos,
                direction
            } = load;
            let _load: ILoad;
            switch (load.type) {
                case CONST.UDL:
                    _load = new UDL(mag, startPos!, pos, direction)
                    break;
                default:
                    _load = new PL(mag, pos, direction)
                    break;
            }
            this.loads.push(_load);
        });
    }
}

export default Beam;