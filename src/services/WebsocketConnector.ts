import {TokenManager} from "./TokenManager";

export class WebsocketConnector {

    public ws?: WebSocket;

    connect = () => {
        this.ws = new WebSocket("ws://127.0.0.1:8888");
        this.ws.onopen = this.onOpen;
        this.ws.onerror = this.onError;
        this.ws.onclose = this.onClose;
    }

    /**
     * Sendet jede Sekunde einen Heartbeat an den Server, der bei einem Verbindungsabbruch die Verbindung des Nutzers neu setzt.
     */
    heartbeat = () => {
        this.sendData(JSON.stringify({"HEARTBEAT": null, "JWT": TokenManager.getOnlyToken()}));
        console.log("sent heartbeat")
        setTimeout(this.heartbeat, 1000);
    }

    setOnMessage = (callback: any) => {
        if (this.ws !== undefined) {
            this.ws.onmessage = null;
            this.ws.onmessage = function (str) {
                callback(str);
            }
        }
    }

    onOpen = (event: any) => {
        console.log("websocket opened");
        this.heartbeat();
    }

    onError = (event: any) => {
        console.log("error: ", JSON.stringify(event.data));
    }

    onClose = (event: any) => {
        this.ws = undefined;
        console.log("websocket closed");
        setTimeout(this.connect, 5000)
    }

    sendData = (message: string) => {
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
    waitForOpenSocketConnection = (callback: any) => {
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