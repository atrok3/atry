import { CLR, DOWN, SS } from '../../consts';
import Beam from './models/beam';
import PL from './models/pl';

function handler(req, res) {
    const beam = new Beam(req.body);
    if (beam.type == SS) {
        
        beam.findA();
        beam.findB();
    } else if(beam.type === CLR) {
        let moment = beam.findSumOfMoments();

        moment = parseFloat(moment.toFixed(2));

        beam.smeqn.define.right += ` - Mb`

        beam.smeqn.letXb.right += ` - Mb`
        beam.smeqn.letXb.title = `Let Xb = ${beam.len}`

        beam.smeqn.brackets.right += ` - Mb`
        beam.B.moment = moment;

        let momentOfA1 = moment;

        // calc magnitude of A
        //this.A.mag = (momentOfA1 / distance * -1);
        //this.A.calcDirection()

        beam.smeqn.sumMs.right += `${momentOfA1} - Mb`;


        beam.smeqn.moveA.right += `${momentOfA1}`;
        beam.smeqn.moveA.left = `Mb`;

        //this.smeqn.final.title = `Divide both sides by ${distance}`
        beam.smeqn.final.right = `${beam.B.moment}`
        beam.smeqn.final.left = "Mb";

        beam.B.calcDirection();

        let Ef = 0;

        beam.loads.forEach((load, i) => {
            let _mag = load.mag;
            if (load.direction == DOWN) _mag *= -1;
            Ef += _mag * 1;
            if (i == 0) beam.sfeqn.define.right += `${_mag}`
            else beam.sfeqn.define.right += ` ${_mag < 0 ? '-' : '+'} ${Math.abs(_mag)}`
        });

        let s = Ef,
            aMag = 0;
            //bMag = 0;

        beam.sfeqn.define.right += ` - A`;

        beam.sfeqn.sumF.right = `${s} - A`;

        beam.sfeqn.letA.right = `${s} - A`;
        beam.sfeqn.letA.title = ``;



        aMag = (s + aMag);

        parseFloat(aMag.toFixed(2))

        beam.A.mag = aMag * -1;

        beam.sfeqn.sumA.right = `${aMag} - A`;

        beam.sfeqn.final.right = `${aMag}`
        beam.sfeqn.final.left = `A`

        beam.A.calcDirection()

    } else {
        let moment = beam.findSumOfMoments();

        moment = parseFloat(moment.toFixed(2))

        const aLabel = beam.getALabel(true);
        const bDistance = beam.getADistance();

        beam.smeqn.define.right += ` - ${aLabel}`;

        beam.smeqn.letXb.right += ` - ${aLabel}`;
        beam.smeqn.letXb.title = `Let ${bDistance} = ${beam.A.pos}`;

        beam.smeqn.brackets.right += ` - ${aLabel}`;
        beam.A.moment = moment;

        let momentOfA1 = moment;

        // calc magnitude of A
        //this.A.mag = (momentOfA1 / distance * -1);
        //this.A.calcDirection()

        beam.smeqn.sumMs.right += `${momentOfA1} - ${aLabel}`;


        beam.smeqn.moveA.right += `${momentOfA1}`;
        beam.smeqn.moveA.left = `${aLabel}`;

        //this.smeqn.final.title = `Divide both sides by ${distance}`
        beam.smeqn.final.right = `${beam.A.moment}`;
        beam.smeqn.final.left = aLabel;

        beam.A.calcDirection();

        let Ef = 0;

        beam.loads.forEach((load, i) => {
            let _mag = load.mag;
            if (load.direction == DOWN) _mag *= -1;
            Ef += _mag * 1;
            if (i == 0) beam.sfeqn.define.right += `${_mag}`
            else beam.sfeqn.define.right += ` ${_mag < 0 ? '-' : '+'} ${Math.abs(_mag)}`
        });

        let s = Ef,
            aMag = 0,
            bMag = 0;

        const bLabel = beam.getBLabel();

        beam.sfeqn.define.right += ` - ${bLabel}`;

        beam.sfeqn.sumF.right = `${s} - ${bLabel}`;

        beam.sfeqn.letA.right = `${s} - ${bLabel}`;
        beam.sfeqn.letA.title = ``;


        bMag = (s + aMag);

        beam.B.mag = parseFloat(bMag.toFixed(2)) * -1;

        beam.sfeqn.sumA.right = `${bMag} - ${bLabel}`;

        beam.sfeqn.final.right = `${bMag}`
        beam.sfeqn.final.left = `${bLabel}`

        beam.B.calcDirection()
    }

    res.send({
        loads: [
            ...beam.loads,
            beam.A,
            beam.B,
        ],
        smeqn: beam.smeqn,
        sfeqn: beam.sfeqn,
    });
}

export default handler;