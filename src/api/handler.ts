import { CLR, DOWN, SS } from '../../consts';
import Beam from './models/beam';
import PL from './models/pl';

function handler(req, res) {
    const beam = new Beam(req.body);

    beam.findA()
    beam.findB()

    let loads = [
        beam.A,
        ...beam.loads,
        beam.B,
    ];

    loads.sort((a, b) => a.aPos - b.aPos);

    res.send({
        loads,
        smeqn: beam.smeqn,
        sfeqn: beam.sfeqn,
    });
}

export default handler;