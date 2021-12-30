export class WebsocketConnector {

    public ws?: WebSocket;

    connect(callbackOnOpen: any, callbackOnMessage: any): void {
        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onopen = callbackOnOpen;
        this.ws.onmessage = callbackOnMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    onError(event: any): void {
        console.log("error: ", JSON.stringify(event.data));
    }

    onClose(event: any): void {
        console.log("websocket closed");
    }

    sendData(data: any): void {
        try {
            this.ws?.send(data);
            console.log("Daten gesendet: ", data)
        } catch (error) {
            console.log("Fehler beim Senden der Nachricht: ", error);
        }
    }

    isOpen(): boolean {
        console.log("websocket ist offen? ", this.ws?.readyState === WebSocket.OPEN)

        return this.ws?.readyState === WebSocket.OPEN;
    }
}