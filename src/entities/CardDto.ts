import {FlipStatus} from "./FlipStatus";

export class CardDto {

    constructor(public id: string, public pairId: number, public flipStatus: FlipStatus) {
    }
}