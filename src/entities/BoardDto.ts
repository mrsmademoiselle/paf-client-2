import {CardDto} from "./CardDto";

export class BoardDto {

    // evtl später auf Server anpassen, wenn Server nicht angepasst werden soll
    constructor(public cardSet: CardDto[]) {
    }

}