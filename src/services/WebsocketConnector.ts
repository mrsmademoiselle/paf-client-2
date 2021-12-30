export class WebsocketConnector {

    public ws?: WebSocket;

    connect(): void {

        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    onMessage(event: any): void {
        console.log("Nachricht empfangen ", JSON.stringify(event.data));
    }

    onError(event: any): void {
        console.log("error: {}", JSON.stringify(event.data));

        console.error("Socket Error: ", event.message, "Socket wird geschlossen");
        this.ws?.close();
    }

    onClose(event: any): void {
        console.log("closed: ", JSON.stringify(event));
    }

    sendData(data: any): void {
        try {
            this.ws?.send(data);
            console.log("Daten gesendet: ", data)
        } catch (error) {
            console.log("Fehler beim Senden der Nachricht: ", error);
        }
    }
}