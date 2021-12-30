import {UserDto} from "./UserDto";
import {BoardDto} from "./BoardDto";
import {UserScoreDto} from "./UserScoreDto";

export class MatchDto {
    constructor(public lobbyCode: string, public currentTurn: UserDto, public gameBoard: BoardDto, public userScores: UserScoreDto[]) {
    }
}