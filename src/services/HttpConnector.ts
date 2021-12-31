import {TokenManager} from "./TokenManager";

export class HttpConnector {
    private static PATH = "http://localhost:9090/";

    static async post(inputs: any, url: string): Promise<Response> {
        let response: any;
        if (TokenManager.getToken() === null || TokenManager.getToken() === undefined || TokenManager.getToken().length < 2) {

            console.log("sende Token ohne auth");
            response = await fetch(this.PATH + url, {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
            });

        } else {
            let json = "";
            try {
                json = JSON.parse(TokenManager.getToken()).value;
            } catch (e) {
                console.log("falsches json format in post: ", TokenManager.getToken());
            }
            response = await fetch(this.PATH + url, {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': json
                },
                mode: 'cors',
            });
        }

        /* Nach Einigung an den ResponseStatus anpassen, der bei einem ungültigen Token zurückgegeben wird */
        //if (response.status === 401) TokenManager.removeToken();
        return response;
    }

    static async postImage(input: any, url: string): Promise<Response> {
        console.log("lade bild hoch: ", input);
        let json = "";
        try {
            json = JSON.parse(TokenManager.getToken()).value;
        } catch (e) {
            console.log("falsches json format in post: ", TokenManager.getToken());
        }

        const response = await fetch(this.PATH + url, {
            method: 'POST',
            body: input,
            headers: {'Content-Type': 'application/json', 'Authorization': json},
            mode: 'cors',
        });
        return response;
    }

    static async get(url: string): Promise<Response> {
        let json = "";
        try {
            json = JSON.parse(TokenManager.getToken()).value;
        } catch (e) {
            console.log("falsches json format in post: ", TokenManager.getToken());
        }
        const response = await fetch(this.PATH + url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'authorization': json},
        });

        /* Nach Einigung an den ResponseStatus anpassen, der bei einem ungültigen Token zurückgegeben wird */
        if (response.status === 401) TokenManager.removeToken();
        return response;
    }
}