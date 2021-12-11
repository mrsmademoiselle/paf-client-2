import {HttpConnector} from "./HttpConnector";
import {TokenManager} from "./TokenManager";
import {showBanner} from '../states/UserStates';

export class UserAuthService {

    private static URL_PREFIX = "user/";

    static async login(inputs: any) {

        try {
            const response = await HttpConnector.post(inputs, this.URL_PREFIX + "login")

            if (response.ok) {
                await response.json().then(data => TokenManager.setToken(data));
                return true;
            } else {
		showBanner("danger", "Der Login konnte nicht verarbeitet werden. Response Status " + response.status);
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
	    if(serverResponse.ok){
		await serverResponse.json().then(data => TokenManager.setToken(data));
		return true;
	    } else {
		showBanner("danger", "could not create user");
		return false;
	    }

        } catch (exception) {
            console.log(exception);
	    showBanner("danger", "could not create user");
            return false;
        }
    }

    private static onLoad(reader:any) {
	return new Promise(resolve =>{
	    reader.onload = function () {resolve(reader.result)}
	})
    }

    static async uploadImg(img: any): Promise<any>{
	try {
	    const reader = new FileReader();
	    reader.readAsDataURL(img)
	    let res = await this.onLoad(reader);
	    const serverResponse = HttpConnector.postImage(res, this.URL_PREFIX + "image/upload");
	    return false;
	} catch (e) {
	    return false;
	}
    }

    static async check(): Promise<boolean>{
	try {
	    const serverResponse = await HttpConnector.get(this.URL_PREFIX + "check");
	    serverResponse.json();
	    if (serverResponse.ok) {
		console.log("check ok");
		return true;
	    } else {
		console.log("check not ok");
		return false;
	    }
	} catch (exception) {
	    console.log(exception);
	    return false;
	}
    }

}
