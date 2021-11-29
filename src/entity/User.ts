import {UserProfile} from "./UserProfile";

export class User {
    constructor(public username: string, public jwtToken: string, public id?: string, public userProfile?: UserProfile) {
    }

    // unschön, aber wir können in ts keine zwei Konstruktoren haben...
    static of(json: any): User {
        let userProfile: UserProfile = UserProfile.of(json.userProfile);
        return new User(json.id, json.username, json.jwtToken, userProfile);
    }
}