import Beam from "../classes/Beam";

export async function solve() {
    let host = "http://localhost:3000";
    try {
        const res = await fetch(`${host}/api`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                type: Beam.type,
                length: Beam.len,
                loads: Beam.loads
            })
        });
        if (res.ok) {
            const body = await res.json();
            return [
                body.loads,
                body.sfeqn,
                body.smeqn,
            ]
        }
    } catch (e) {
        console.log(e);
    }
}