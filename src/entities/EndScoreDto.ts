import {UserDto} from "./UserDto";
import {UserScoreDto} from "./UserScoreDto";

export class EndScoreDto {
    constructor(public winner: UserDto, public scoreListe: UserScoreDto[]) {
    }

    static isValidMatchDto(json: any): boolean {
        return json.hasOwnProperty("winner") && json.hasOwnProperty("scoreListe");
    }
}