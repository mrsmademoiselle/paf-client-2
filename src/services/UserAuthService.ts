import {HttpConnector} from "./HttpConnector";

export class UserAuthService {

    static async login(inputs: any) {

        try {
            const response = await HttpConnector.post(inputs, 'user/login')

            if (response.ok) {
                response.text().then(data => this.setJwtToken(data));
                return true;
            } else {
                console.log("Der Login konnte nicht verarbeitet werden.");
                return false;
            }
            // TODO User vor Redirect global speichern?
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    static async register(inputs: any) {
        try {
            const serverResponse = await HttpConnector.post(inputs, "user/register");
            return serverResponse.ok ? true : false;
        } catch (exception) {
            return false;
        }
    }

    /**
     * Testmethode zum Setzen von Token und testen von Routing
     */
    private static setJwtToken(json: any) {

        const now = new Date();
        const sessionStorageItem = {
            value: JSON.stringify(json),
            // für 8h nach dem Login erreichbar
            expiry: now.getTime() + 28800000,
        }
        // SessionStorage, weil wir dann 2 Tabs mit 2 Accounts offen haben und so das Spiel testen können
        sessionStorage.setItem("tolles_jwt_token", JSON.stringify(sessionStorageItem));
    }
}