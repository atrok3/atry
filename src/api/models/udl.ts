import PL from "./pl";

class UDL extends PL {
    startPos: number
    endPos: number
    magPerPos: number

    constructor(magPerPos: number, startPos: number, endPos: number, direction: string) {
        let distance = endPos - startPos;
        let mag = magPerPos * distance;
        let halfPos = distance / 2;
        let pos = halfPos + startPos;

        super(mag, pos, direction);
        this.magPerPos = magPerPos;
        this.startPos = startPos;
        this.endPos = endPos;
    }
}

export default UDL;