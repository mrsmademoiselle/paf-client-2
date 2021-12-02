export class HttpConnector {
    private static PATH = "http://localhost:9090/";

    static async post(inputs: any, url: string): Promise<Response> {
        return await fetch(this.PATH + url, {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        });
    }

    static async get(url: string): Promise<Response> {
        return await fetch(this.PATH + url, {
            method: 'GET',
            // ...? tbd wenn gebraucht
        });
    }
}