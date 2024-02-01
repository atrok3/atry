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
    aLoads: Load[] = []

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
        this.aLoads = [...loads];
        const supports = loads.filter((load) => load.type === CONST.PS || load.type === CONST.F);
        supports.sort((a, b) => a.pos - b.pos);
        if (type === CONST.SS) {
            this.A = new PL({
                mag: 0,
                pos: supports[0].relativePos,
                direction: "",
                label: supports[0].label,
                index: supports[0].index,
                relativePos: supports[0].relativePos,
                aPos: supports[0].aPos
            });
            this.B = new PL({
                mag: 0,
                pos: supports[1].relativePos,
                direction: "",
                label: supports[1].label,
                index: supports[1].index,
                relativePos: supports[1].relativePos,
                aPos: supports[1].aPos
            });
        } else if (type === CONST.CLR) {
            this.A = new Moment({
                moment: 0,
                pos: length,
                direction: "",
                label: supports[0].label,
                index: supports[0].index,
                relativePos: length,
            });
            this.B = new PL({
                mag: 0,
                pos: length,
                direction: "",
                label: supports[0].label,
                index: supports[0].index,
                relativePos: length,
            });
        } else {
            this.A = new Moment({
                moment: 0,
                pos: 0,
                direction: "",
                label: supports[0].label,
                index: supports[0].index,
                relativePos: 0,
            });
            this.B = new PL({
                mag: 0,
                pos: 0,
                direction: "",
                label: supports[0].label,
                index: supports[0].index,
                relativePos: 0,
            });
        }
        loads = loads.filter((load) => load.type !== CONST.PS && load.type !== CONST.F);
        this.buildLoads(loads);
    }

    getIsCantilever() {
        return this.type != CONST.SS;
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

    getAbsolutePos(load: ILoad) {
        let relativePos = load.relativePos;
        if (load.index != "beamstart" && load.index != "beamend") relativePos += this.aLoads[load.index].pos;
        return relativePos;
    }


    findSumOfMoments = (): number => {

        let Em = 0;

        let point = this.getAbsolutePos(this.B);

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
        let Em = 0, aLabel, bDistance, sPos1, sPos2, distance, A;

        let cantileverPos = this.type == CONST.CLL ? 0 : this.len;

        Em = this.findSumOfMoments();

        let isCantilever = this.getIsCantilever();

        if (isCantilever) {
            aLabel = this.getALabel(true);
            bDistance = this.getADistance();
        } else {
            A = this.A;
            sPos1 = this.getAbsolutePos(A);
            sPos2 = this.getAbsolutePos(this.B);

            distance = sPos2 - sPos1;
            aLabel = this.getALabel();
            bDistance = this.getBDistance();
        }

        if (isCantilever) this.smeqn.define.right += ` - ${aLabel}`;
        else this.smeqn.define.right += ` + ${aLabel}(${bDistance} - ${sPos1})`

        if (isCantilever) {
            this.smeqn.letXb.right += ` - ${aLabel}`;
            this.smeqn.letXb.title = `Let ${bDistance} = ${cantileverPos}`;
        } else {
            this.smeqn.letXb.right += ` + ${aLabel}(${sPos2} - ${sPos1})`
            this.smeqn.letXb.title = `Let ${bDistance} = ${sPos2}`
        }


        if (isCantilever) this.smeqn.brackets.right += ` - ${aLabel}`;
        else this.smeqn.brackets.right += ` + ${aLabel}(${(sPos2 - sPos1) * 1})`

        //this.meqn.push(`${step3Base} + ${distance}A`)

        let momentOfA1 = Em;



        if (isCantilever) {
            this.A.moment = Em;
            this.A.calcDirection()
            this.A.moment *= -1
        }
        else {
            // calc magnitude of A
            let aMag = (momentOfA1 / distance * -1);

            aMag = parseFloat(aMag.toFixed(2))

            this.A.mag = aMag;
            this.A.calcDirection()
        }



        if (isCantilever) {

            this.smeqn.sumMs.right += `${momentOfA1} - ${aLabel}`;


            this.smeqn.moveA.right += `${momentOfA1}`;
            this.smeqn.moveA.left = `${aLabel}`;

            //this.smeqn.final.title = `Divide both sides by ${distance}`
            this.smeqn.final.right = `${this.A.moment}`;
            this.smeqn.final.left = aLabel;

        } else {
            this.smeqn.sumMs.right += `${momentOfA1} + ${distance}${aLabel}`;


            this.smeqn.moveA.right += `${Math.abs(momentOfA1)}`
            this.smeqn.moveA.left = `${distance}${aLabel}`

            this.smeqn.final.title = `Divide both sides by ${distance}`
            this.smeqn.final.right = `${this.A.mag}`
        }

        this.smeqn.final.left = `${aLabel}`
    }


    sumOfForces = (): number => {
        let Ef = 0;

        this.loads.forEach((load, i) => {
            if (load.type === CONST.M) return;
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
        let Ef = 0, isCantilever = this.getIsCantilever();

        const aLabel = this.getALabel();
        const bLabel = this.getBLabel();

        Ef = this.sumOfForces();

        let s = Ef,
            aMag = isCantilever ? 0 : this.A.mag,
            bMag = 0;

        if (isCantilever) {

            this.sfeqn.define.right += ` - ${bLabel}`;

            this.sfeqn.sumF.right = `${s} - ${bLabel}`;

            this.sfeqn.letA.right = `${s} - ${bLabel}`;
            this.sfeqn.letA.title = ``;

        } else {
            this.sfeqn.define.right += ` + ${aLabel} + ${bLabel}`

            this.sfeqn.sumF.right = `${s} + ${aLabel} + ${bLabel}`

            this.sfeqn.letA.right = `${s} + ${aMag} + ${bLabel}`
            this.sfeqn.letA.title = `Let ${aLabel} = ${aMag}`
        }



        if (isCantilever) {
            bMag = (s + aMag);

            this.B.mag = parseFloat(bMag.toFixed(2)) * -1;
            this.sfeqn.sumA.right = `${bMag} - ${bLabel}`;

        } else {
            bMag = ((s + aMag) * -1);

            bMag = parseFloat(bMag.toFixed(2));
            this.B.mag = bMag;
            this.sfeqn.sumA.right = `${bMag * -1} + ${bLabel}`
        }



        this.sfeqn.final.right = `${bMag}`
        this.sfeqn.final.left = `${bLabel}`

        this.B.calcDirection()

    }


    buildLoads = (loads: ILoad[]) => {
        loads.forEach(load => {
            const {
                mag,
                startPos,
                direction,
                label,
                index,
                aPos,
                relativePos: pos,
                relativeEndPos,
            } = load;
            let _load: ILoad;
            switch (load.type) {
                case CONST.UDL:
                    _load = new UDL({
                        magPerPos: mag,
                        startPos: startPos!,
                        endPos: load.pos,
                        direction,
                        label,
                        index,
                        relativePos: pos,
                        aPos,
                        relativeEndPos,
                    })
                    break;
                case CONST.M:
                    _load = new Moment({
                        moment: mag,
                        pos,
                        direction,
                        label,
                        index,
                        relativePos: pos,
                        aPos,

                    })
                    break;
                default:
                    _load = new PL({
                        mag,
                        pos,
                        direction,
                        label,
                        index,
                        relativePos: pos,
                        aPos,
                    })
                    break;
            }
            this.loads.push(_load);
        });
    }
}

export default Beam;