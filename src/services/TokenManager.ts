export class TokenManager {

    private static TOKEN_KEY: string = "tolles_jwt_token";

    static setToken(json: any): void {
        const now = new Date();

        const sessionStorageItem = {
            value: json.jwttoken,
            // für 8h nach dem Login erreichbar
            expiry: now.getTime() + 28800000,
        }
        // SessionStorage, weil wir dann 2 Tabs mit 2 Accounts offen haben und so das Spiel testen können
        sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(sessionStorageItem));
    }

    static getOnlyToken(): string {
        try {
            return JSON.parse(this.getEntireTokenObject()).value;
        } catch (e) {
            console.log("error beim parsen von json:", e);
        }
        return "";
    }

    static getEntireTokenObject(): string {
        let token = sessionStorage.getItem(this.TOKEN_KEY);
        if (token == null) return "";

        let json;
        try {
            json = JSON.parse(token);
        } catch (e) {
            console.log("falsches json format in getToken: ", json)
            return "";
        }

        // müssen noch andere Daten des Users geprüft werden?
        if (new Date().getTime() > json.expiry) {
            sessionStorage.removeItem(this.TOKEN_KEY)
            return "";
        } else {
            return token;
        }
    }

    static removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
    }

    static isUserAuthenticated(): boolean {
        const token = this.getEntireTokenObject();

        return token.length > 0;
    }
}