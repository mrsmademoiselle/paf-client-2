import {UserDto} from "./UserDto";
import {UserScoreDto} from "./UserScoreDto";

export class EndScoreDto {
    constructor(public winner: UserDto, public scoreListe: UserScoreDto[]) {
    }

    static isValidMatchDto(json: any): boolean {
        try {
            json = JSON.parse(json);
            return json.hasOwnProperty("winner") && json.hasOwnProperty("scoreListe");
        } catch (e) {
            return false;
        }
    }
}