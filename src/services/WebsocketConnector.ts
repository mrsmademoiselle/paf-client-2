import {TokenManager} from "./TokenManager";

export class WebsocketConnector {

    public ws?: WebSocket;

    connect(): void {
        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
        this.heartbeat();
    }

    // test
    heartbeat(): void {
        if (this.ws === undefined) return;
        if (this.ws.readyState !== 1) return;
        this.ws.send(JSON.stringify({"HEARTBEAT": TokenManager.getOnlyToken()}));
        setTimeout(this.heartbeat, 500);
    }

    setOnMessage(callback: any): void {
        if (this.ws !== undefined) {
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
        this.ws = undefined;
        console.log("websocket closed");
        setTimeout(this.connect, 5000)
    }

    /**
     * Achtung: Diese Funktion gibt nur zurück, ob eine Websocketverbindung offen ist, nicht, ob eine gerade aufgebaut wird.
     */
    isOpen(): boolean {
        console.log("websocket offen? ", this.ws?.readyState === WebSocket.OPEN, "status", this.ws?.readyState)

        return this.ws?.readyState === WebSocket.OPEN;
    }

    sendData(message: string) {
        this.waitForOpenSocketConnection(() => {
            this.ws?.send(message);
            console.log(new Date().getTime(), " nachricht gesendet: ", message)
        });
    }

    /**
     * Rekursive Warte-Funktion, bis die Verbindung da ist.
     * Problem: Beim Wegnavigieren auf eine andere Seite wird die Verbindung zur Websocket abgebrochen (siehe App.tsx-Check).
     * Wenn wir danach auf Game navigieren und die Verbindung aufbauen wollen, um Daten zu senden, fährt die Websocketverbindung
     * zu langsam hoch und ist noch nicht bereit die Daten zu senden, wenn sendData() ausgeführt werden soll.
     *
     * Die Lösung ist diese rekursive Wartefunktion. Da wir uns in React ohnehin keine Sorgen wegen einfrieren/Threads machen müssen,
     * ist das eine gute Alternativez.
     */
    waitForOpenSocketConnection(callback: any): void {
        setTimeout(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                console.log("WS-Verbindung ist offen")
                if (callback != null) callback();
            } else if (this.ws?.readyState === WebSocket.CLOSED) {
                console.log("reconnecting to websocket to send data...")
                this.connect();
                this.waitForOpenSocketConnection(callback);
            } else { // CONNECTING, CLOSING
                console.log("auf Verbindungsaufbau warten...")
                this.waitForOpenSocketConnection(callback);
            }
        }, 5);
    }
}