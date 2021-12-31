export class WebsocketConnector {

    public ws?: WebSocket;

    connect(): void {
        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
        console.log("on msg: ", this.ws.onmessage);
    }

    setOnMessage(callback: any): void {
        if (!this.isOpen()) {
            console.log("reconnecting in setOnMessage...")
            this.connect();
        }

        if (this.ws !== undefined) {
            console.log("setting new onMessage", callback)
            this.ws.onmessage = callback;
        }
    }

    onOpen(event: any): void {
        console.log("websocket opened");
    }

    onError(event: any): void {
        console.log("error: ", JSON.stringify(event.data));
    }

    onClose(event: any): void {
        console.log("websocket closed");
    }

    sendData(data: any): void {
        if (!this.isOpen()) {
            console.log("reconnecting in sendData...")
            this.connect();
        }
        try {
            this.ws?.send(data);
            console.log("Daten gesendet: ", data)
        } catch (error) {
            console.log("Fehler beim Senden der Nachricht: ", error);
        }
    }

    isOpen(): boolean {
        console.log("websocket offen? ", this.ws?.readyState === WebSocket.OPEN)

        return this.ws?.readyState === WebSocket.OPEN;
    }
}