import { CLR, DOWN, SS } from '../../consts';
import Beam from './models/beam';
import PL from './models/pl';

function handler(req, res) {
    const beam = new Beam(req.body);
    if (beam.type == SS) {
        beam.findA();
        beam.findB();
        res.send({
            A: beam.A,
            B: beam.B,
            smeqn: beam.smeqn,
            sfeqn: beam.sfeqn,
        });
    } else if(beam.type === CLR) {
        const moment = beam.findSumOfMoments();
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

        beam.A.mag = aMag * -1;

        beam.sfeqn.sumA.right = `${aMag} - A`;

        beam.sfeqn.final.right = `${aMag}`
        beam.sfeqn.final.left = `A`

        beam.A.calcDirection()

        res.send({
            A: beam.A,
            B: beam.B,
            smeqn: beam.smeqn,
            sfeqn: beam.sfeqn,
        });
    } else {
        const moment = beam.findSumOfMoments();
        beam.smeqn.define.right += ` - Ma`;

        beam.smeqn.letXb.right += ` - Ma`;
        beam.smeqn.letXb.title = `Let Xb = ${beam.B.pos}`;

        beam.smeqn.brackets.right += ` - Ma`;
        beam.B.moment = moment;

        let momentOfA1 = moment;

        // calc magnitude of A
        //this.A.mag = (momentOfA1 / distance * -1);
        //this.A.calcDirection()

        beam.smeqn.sumMs.right += `${momentOfA1} - Ma`;


        beam.smeqn.moveA.right += `${momentOfA1}`;
        beam.smeqn.moveA.left = `Ma`;

        //this.smeqn.final.title = `Divide both sides by ${distance}`
        beam.smeqn.final.right = `${beam.B.moment}`;
        beam.smeqn.final.left = "Ma";

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

        beam.A.mag = aMag * -1;

        beam.sfeqn.sumA.right = `${aMag} - A`;

        beam.sfeqn.final.right = `${aMag}`
        beam.sfeqn.final.left = `A`

        beam.A.calcDirection()

        res.send({
            A: beam.A,
            B: beam.B,
            smeqn: beam.smeqn,
            sfeqn: beam.sfeqn,
        });
    }
}

export default handler;