import PL from "./pl";
import * as CONST from "../../../consts";

class UDL extends PL {
    startPos: number
    endPos: number
    magPerPos: number
    label: string;
    type = CONST.UDL


    constructor(magPerPos: number, startPos: number, endPos: number, direction: string, label: string) {
        let distance = endPos - startPos;
        let mag = magPerPos * distance;
        let halfPos = distance / 2;
        let pos = halfPos + startPos;

        super(mag, pos, direction, label);
        this.magPerPos = magPerPos;
        this.startPos = startPos;
        this.endPos = endPos;
    }
}

export default UDL;