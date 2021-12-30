import {UserDto} from "./UserDto";

export class UserScoreDto {

    constructor(public user: UserDto, public moves: number) {
    }

}