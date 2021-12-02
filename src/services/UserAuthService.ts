import {HttpConnector} from "./HttpConnector";
import {TokenManager} from "./TokenManager";

export class UserAuthService {

    private static URL_PREFIX = "user/";

    static async login(inputs: any) {

        try {
            const response = await HttpConnector.post(inputs, this.URL_PREFIX + "login")

            if (response.ok) {
                await response.json().then(data => TokenManager.setToken(data));
                return true;
            } else {
                console.log("Der Login konnte nicht verarbeitet werden. Response Status " + response.status);
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
            const serverResponse = await HttpConnector.post(inputs, this.URL_PREFIX + "register");
            return serverResponse.ok;
        } catch (exception) {
            console.log(exception);
            return false;
        }
    }

}