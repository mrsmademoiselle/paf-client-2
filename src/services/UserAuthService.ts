import {HttpConnector} from "./HttpConnector";
import {TokenManager} from "./TokenManager";

export class UserAuthService {

    static async login(inputs: any) {

        try {
            const response = await HttpConnector.post(inputs, 'user/login')

            if (response.ok) {
                await response.text().then(data => TokenManager.setToken(data));
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

}