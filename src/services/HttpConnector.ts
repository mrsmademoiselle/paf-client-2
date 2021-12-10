import {TokenManager} from "./TokenManager";

export class HttpConnector {
    private static PATH = "http://localhost:9090/";

    static async post(inputs: any, url: string): Promise<Response> {
        const response = await fetch(this.PATH + url, {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        });

        /* Nach Einigung an den ResponseStatus anpassen, der bei einem ungültigen Token zurückgegeben wird */
        if (response.status === 401) TokenManager.removeToken();
        return response;
    }

    static async get(url: string): Promise<Response> {
	console.log(JSON.parse(TokenManager.getToken()).value);
        const response = await fetch(this.PATH + url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(TokenManager.getToken()).value},
        });

        /* Nach Einigung an den ResponseStatus anpassen, der bei einem ungültigen Token zurückgegeben wird */
        if (response.status === 401) TokenManager.removeToken();
        return response;
    }
}
