## Sprint 5

Autor: Franzi

- Timer-Klasse für Cooldown-Handling nach Kartenzügen
    - eigener globaler State dafür, in dem die Dauer definiert wird
- Cooldown wird in MatchInfo angezeigt

## Sprint blarg

Historie:
Einfaches UI Daten werden vom Server abgeholt und in das ui eingebunden

Matchinfo:
Herausziehen der Bilder aus den JSON aus den Props Abfragen ueber Ternary ob Bild da, wenn ja, setzten der Data-URL,
wenn nicht setzen des Default Bildes

## Sprint 3

Autor: Franzi

- Flag-Übermittlung an den Server eingebaut:
- LOGIN bei LobbyAufruf
- FLIPPED beim Kartenflippen
- Einbauen von FlipStatus Enum wie auf dem Server für reibungsloses Parsen
- Server-Response-Parsing eingebaut
- GameDto
- EndscoreDto -> Weiterleitung auf Endscreen-Seite
- Bugfixing
    - Lobby isLoading-State rausgeworfen, weil dieser in keinem Fall ordentlich geschlossen werden konnte
        - Das hat dazu geführt, dass der zwar die Weiterleitung funktioniert hat, aber zB der
          WebsocketConnector.setOnMessage()
          nicht überschrieben werden konnte*.
    - WebsocketConnector-Funktionen als Arrow-Functions eingebaut (sie sind nun properties von der Klasse).
        - Vorher hatten wir das Problem, dass der Context der Klasse in den Funktionen nicht beibehalten wurde, und
          obwohl der Compiler problemlos durchläuft, gab es Errors wie "onOpen: this.heartbeat() is not a function"
          oder "this.sendData() is not a function". Das liegt daran, dass JavaScript behindert ist und ursprünglich
          nicht für Klassen ausgelegt war. Um das zu umgehen, könnte man auf die Funktionen im Prototype zugreifen, aber
          ich fand es schöner, die Methoden durch Arrowfunctions in Properties zu konvertieren.
            - https://stackoverflow.com/questions/40965400/typeerror-is-not-a-function-typescript-class

<small>
*Fehlermeldung:

```
Warning: Cannot update a component(`BrowserRouter`)while rendering a differentcomponent(`Lobby`).
To locate the bad setState() call inside`Lobby`, follow the stacktrace as described in 
https://reactjs.org/link/setstate-in-render
Lobby
@http://localhost:3000/static/js/main.chunk.js:2358:86
Outlet
@http://localhost:3000/static/js/vendors~main.chunk.js:53804:10
RequireAuth
@http://localhost:3000/static/js/main.chunk.js:271:84
Outlet
@http://localhost:3000/static/js/vendors~main.chunk.js:53804:10
CheckWebsocketSubscription
@http://localhost:3000/static/js/main.chunk.js:310:84
Routes
@http://localhost:3000/static/js/vendors~main.chunk.js:53898:7
Router
@http://localhost:3000/static/js/vendors~main.chunk.js:53835:7
BrowserRouter
@http://localhost:3000/static/js/vendors~main.chunk.js:53347:7
App
```

</small>

## Sprint 2

Autor: Franzi

### Ingame-View

- Ingame-View umgesetzt.
- Bestehend aus Überkomponente "Game.tsx" mit den Unterkomponenten "Board.tsx (Card.tsx)" und "MatchInfo.tsx".
- Einbauen von erstmaliger Websocketlogik für Datenübertragung vom Server.
- Die Bilder für die Karten werden über das src-Attribut vom Server geholt.
- Das Kartenlayout ist mit Grid im .css umgesetzt.

### WebsocketConnector

- Hinzufügen einer WebsocketConnector-Klasse für Websocketverbindungen.
- Diese Klasse wird zu Beginn einmal als State (
  UserStates.ts) festgehalten und dann für jede Websocketverbindung immer wieder als "State" verwendet.
- Somit ist die Instanz nicht neu setzbar und indirekt ein Singleton.

- `waitForOpenSocketConnection()` existiert, damit die Websocketverbindung beim Senden von Messages an den Server auf
  jeden Fall offen ist.
- Da wir die Websocketconnection beim Wegnavigieren schließen und dann beim Navigieren auf /game wieder öffnen, kann es
  sein, dass sie zum Zeitpunkt der Datensendung an den Server noch nicht offen ist. Dann kommt die
  Fehlermeldung `DOMException: An attempt was made to use an object that is not, or is no longer, usable`. Um das zu
  umgehen, wurde in `waitForOpenSocketConnection()` ein rekursiver Methodenaufruf hinzugefügt, der so lange mit dem
  Senden wartet, bis die Websocketconnection offen ist.

### Lobby.tsx

- Umbenennung von Lobby.tsx zu Lobby.tsx für Vereinheitlichung mit JavaFX Client.
- Abändern der WebsocketKommunikation in der Lobby durch Verwendung des neuen WebsocketConnectors.

### App.tsx

- Hinzufügen von Websocket-Check bei Navigieren von Seiten, damit die Websocketverbindung beim Wegnavigieren von /game
  geschlossen wird.

<hr> 

## Sprint 1

Autor: Alex

Refactor:

- Dinge verdeutschifizieren
- Neue States fuer das herausziehen des Inputs aus den Childcomps TextFieldInput
- Das Problem ist, dass wir sonst nicht an den Input dort rankommen, es sei denn wir uebergeben eine Referenz auf eine
  funktion die den Input aus dem Childcomps in einen state des parentcomps setzt
- Das Geschieht nun, und wird beim aufrufen des submitbuttons in den input state geschrieben
- vllt kann man das noch mal optimieren
- entfernen der multiregexcheck logik und ersetzen mit abgesprochener
- der server verwirrft die eingaben nun nicht mehr

Sockets:

- Erstmal vanilla gebaut
- schmeisst eine exception auf dem Testsocketserver, baut aber eine verbindung auf

View Lobby:

- inline Style fuer einzelne elemente wie das margin top im text
- bauen einer komponente fuer ladeanimation mit css
- Die Komponente arbeitet mit useeffect und settimeout
- der useeffect ruft beim aufrufen der komp den settimeout auf
- der settimeout laeuft solange wie die socketverbindung offen ist
- sobald sie zu ist laeuft der timetout aus und der state wird gesetzt
- animation wird beendet und user wird in den gamescreen geschickt
- alternative uber ein weiteres npm packet
- steuerung ueber den state statt ueber useffect und settimteouts
- vorteil: der state kann einfach manipuliert werden und dadurch ein rerender getriggert werden
- paket wurde installiert, das andere wurde aber drin gelassen, darf gern getestet werden!
- einfach statt den is loading ternary die loading component einbauen

Erweitern der TopNavbar

- Statt buttons wurde wie beim logout ein svg bild hinterlegt
- dadurch sieht es einheitlicher aus
- auslagern in eigener Component
- dadurch kann der ternary in der navbar bleiben
- und wir steuern alle elemente die NUR ein eingeloggter user sehen kann einheitlich
- aufspalten der Styling in eigene Datei zur besseren separieriung -boilerplate fuer weitere container ohne inhalt nur
  damit die navigation schonmal besser funktioniert

Userprofil:

- Lobbycodegeneration
- Lobby Clientseitig
- Sidenav
- Einfache View fuer Lobbybeitreten wo man den Lobbycode eingeben kann
- Inputfeld
-

- bauen des Testendpunkts
- flask Gegenstelle
- returned fuer Test nur EINEN FIXEN USERNAME
- Erstmal alles rauskopiert aus register, es ist aber viel refactoring potential da