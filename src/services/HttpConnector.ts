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
        if (response.status == 401) TokenManager.removeToken();

        return response;
    }

    static async get(url: string): Promise<Response> {
        const response = await fetch(this.PATH + url, {
            method: 'GET',
            // ...? tbd wenn gebraucht
        });

        /* Nach Einigung an den ResponseStatus anpassen, der bei einem ungültigen Token zurückgegeben wird */
        if (response.status == 401) TokenManager.removeToken();

        return response;
    }
}