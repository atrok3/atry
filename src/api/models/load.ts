import Beam from "./beam"

interface ILoad {
    mag?: number
    pos: number
    direction: string
    startPos?: number
    type?: string
    label: string
    moment?: number

    /**
     * returns moment and equations terms
     * @param point point to find moment about
     * @returns {number} moment - moment about point
     * @returns {number} t1 - equation term without x of point
     * @returns {number} t2 - equation term with x of point defined
     * @returns {number} t3 - equation term with distance from point solved
     * @returns {boolean} neg - sign of load magnitude. Magnitude defined in equation terms are absolute
     */
    calcMoment: (point: number, beam: Beam) => {
        moment: number
        t1: string
        t2: string
        t3: string
        neg: boolean
    }

    calcDirection: () => void
}

export default ILoad;