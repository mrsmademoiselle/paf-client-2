

Refactor:

- Dinge verdeutschifizieren
- Neue States fuer das herausziehen des Inputs aus den Childcomps TextFieldInput
  - Das Problem ist, dass wir sonst nicht an den Input dort rankommen, es sei denn wir uebergeben eine Referenz auf eine funktion die den Input aus dem Childcomps in einen state des parentcomps setzt
  - Das Geschieht nun, und wird beim aufrufen des submitbuttons in den input state geschrieben
    - vllt kann man das noch mal optimieren
- entfernen der multiregexcheck logik und ersetzen mit abgesprochener
  - der server verwirrft die eingaben nun nicht mehr



Sockets:

- Erstmal vanilla gebaut
- schmeisst eine exception auf dem Testsocketserver, baut aber eine verbindung auf

View GameLoad:

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
- aufspalten der Styling in eigene Datei zur besseren separieriung
  -boilerplate fuer weitere container ohne inhalt nur damit die navigation schonmal besser funktioniert

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

