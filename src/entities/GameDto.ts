import {UserDto} from "./UserDto";
import {BoardDto} from "./BoardDto";
import {UserScoreDto} from "./UserScoreDto";

export class GameDto {
    constructor(public lobbyCode: string, public currentTurn: UserDto, public gameBoard: BoardDto, public userScores: UserScoreDto[]) {
    }

    static isValidMatchDto(json: any): boolean {
        return json.hasOwnProperty("lobbyCode") && json.hasOwnProperty("currentTurn")
            && json.hasOwnProperty("gameBoard") && json.hasOwnProperty("userScores");
    }
}