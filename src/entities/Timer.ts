/**
 * Timer-Klasse, die es uns vereinfacht, Cooldowntimer für das Kartenziehen zu erstellen und verwalten
 */
export class Timer {
    private startDate: Date | undefined = undefined;
    private isRunning: boolean = false;
    private timeout: any = null;
    private remainingTimeInMs: any = null;
    private callback: any = null;

    constructor(public timeInMs: any) {
        this.remainingTimeInMs = timeInMs;
    }

    /**
     * Startet den Timer durch Initialisieren der Felder
     */
    start = (callback?: any) => {
        // wenn er schon läuft, beende
        if (this.isRunning) this.reset();

        if (callback !== undefined) this.callback = callback;
        this.isRunning = true;
        // Startdate ist jetzt
        this.startDate = new Date();
        // Speichern des Timeout-Objekts, damit wir den Timeout später anhalten können
        this.timeout = setTimeout(this.reset, this.remainingTimeInMs);
        console.log("timer started");
    }

    /**
     * Returned die Zeit, die vom Timer noch übrig ist. Leerer String, wenn der Timer gerade nicht läuft
     */
    getTimeLeft = () => {
        if (this.remainingTimeInMs < 0) this.reset();

        if (this.startDate && this.isRunning) {
            // Zeiten neu berechnen
            this.remainingTimeInMs -= new Date().valueOf() - this.startDate.valueOf();
            this.startDate = new Date();

            return this.convertToString(this.remainingTimeInMs);
        } else {
            this.reset();
            return "";
        }
    }

    setCallback = (callback: any) => {
        if (this.callback === null) this.callback = callback;
    }

    /**
     * Konvertiert eine Zeit (Einheit: Millisekunden) in einen lesbaren String (Einheit: Sekunden) mit einer Nachkommastelle
     */
    convertToString = (timeInMs: any) => {
        return String(Math.round((timeInMs / 1000) * 10) / 10) + "s"
    }

    /**
     * Setzt alle Felder zurück auf den Ursprungszustand und ruft die Callback-Funktion auf
     */
    reset = () => {
        this.isRunning = false;
        this.remainingTimeInMs = this.timeInMs;
        this.startDate = undefined;
        clearTimeout(this.timeout);
        this.timeout = null;

        console.log("stopped timer")
        if (this.callback !== null && this.callback !== undefined) this.callback();
    }

    isCurrentlyRunning = () => {
        return this.isRunning;
    }

}