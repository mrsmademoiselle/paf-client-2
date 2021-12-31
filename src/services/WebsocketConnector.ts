export class WebsocketConnector {

    public ws?: WebSocket;

    connect(): void {
        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    setOnMessage(callback: any): void {
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
        this.ws = undefined;
        console.log("websocket closed");
    }

    /**
     * Achtung: Diese Funktion gibt nur zurück, ob eine Websocketverbindung offen ist, nicht, ob eine gerade aufgebaut wird.
     */
    isOpen(): boolean {
        console.log("websocket offen? ", this.ws?.readyState === WebSocket.OPEN, this.ws?.readyState)

        return this.ws?.readyState === WebSocket.OPEN;
    }

    sendData(message: string) {
        this.waitForOpenSocketConnection(() => {
            this.ws?.send(message);
            console.log("nachricht gesendet: ", message)
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
            if (this.ws?.readyState === 1) {
                console.log("Verbindung wurde aufgebaut")
                if (callback != null) callback();
            } else {
                console.log("auf Verbindungsaufbau warten...")
                this.waitForOpenSocketConnection(callback);
            }
        }, 5);
    }
}