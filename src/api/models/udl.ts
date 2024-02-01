import PL from "./pl";
import * as CONST from "../../../consts";

class UDL extends PL {
    startPos: number
    endPos: number
    magPerPos: number
    label: string;
    type = CONST.UDL
    index: any
    relativeEndPos: number


    constructor({
        magPerPos,
        startPos,
        endPos,
        direction,
        label,
        index,
        relativePos,
        aPos,
        relativeEndPos,
    }:
        any
    ) {
        let distance = endPos - startPos;

        let mag = magPerPos * distance;
        let halfPos = distance / 2;
        let pos = halfPos + startPos;

        super({ mag, pos, direction, label, index, relativePos: pos, aPos: pos });
        this.magPerPos = magPerPos;
        this.startPos = startPos;
        this.endPos = endPos;
        this.relativeEndPos = relativeEndPos;
    }
}

export default UDL;