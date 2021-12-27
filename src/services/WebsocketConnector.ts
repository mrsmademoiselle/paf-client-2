export class WebsocketConnector {

    private ws?: WebSocket;

    connect(): void {
        this.ws = new WebSocket("ws://127.0.0.1:8080");
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }
 
    onOpen(event: any): void {
        console.log("connected");
    }

    onMessage(event: any): void {
        console.log("message received")
    }

    onError(event: any): void {
        console.log("error: {}", JSON.stringify(event.data));
    }

    onClose(event: any): void {
        console.log("closed: {}", JSON.stringify(event.data));
    }
}