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

    static getToken(): string {
        let token = sessionStorage.getItem(this.TOKEN_KEY);
        if (token == null) return "";
        let json = JSON.parse(token);
 
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
        const token = this.getToken();

        return token.length > 0;
    }
}