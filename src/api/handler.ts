import Beam from './models/beam';

function handler(req, res) {
    const beam = new Beam(req.body);
    try {
        beam.findA();
        beam.findB();
    } catch (e) {
        console.log(e);
    }
    res.send({
        A: beam.A,
        B: beam.B,
        smeqn: beam.smeqn,
        sfeqn: beam.sfeqn,
    });
}

export default handler;