import Beam from "../classes/Beam";

export async function solve() {
    const supportPos1 = Beam.s1.textOffset;
    const supportPos2 = Beam.s2.textOffset;
    let host = ""
    try {
        const res = await fetch(`${host}/api`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                type: 0,
                length: Beam.len,
                loads: Beam.loads,
                supportPos1,
                supportPos2,
            })
        });
        if (res.ok) {
            const body = await res.json();
            return [
                body.A,
                body.B,
                body.sfeqn,
                body.smeqn,
            ]
        }
    } catch (e) {
        console.log(e);
    }
}