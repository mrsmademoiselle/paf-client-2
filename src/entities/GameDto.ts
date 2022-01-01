import {UserDto} from "./UserDto";
import {BoardDto} from "./BoardDto";
import {UserScoreDto} from "./UserScoreDto";

export class GameDto {
    constructor(public lobbyCode: string, public currentTurn: UserDto, public board: BoardDto, public userScores: UserScoreDto[]) {
    }

    static isValidMatchDto(json: any): boolean {
        try {
            json = JSON.parse(json);
            return json.hasOwnProperty("lobbyCode") && json.hasOwnProperty("currentTurn")
                && json.hasOwnProperty("board") && json.hasOwnProperty("userScores");
        } catch (e) {
            return false;
        }
    }
}