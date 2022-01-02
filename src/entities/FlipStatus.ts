export enum FlipStatus {
    FLIPPED = "FLIPPED",
    // Es wird darauf gewartet, dass eine zweite Karte sich in diesem Status befindet,
    // dann wird geschaut ob sie matchen, und dann werden sie entweder geflippt oder nicht
    WAITING_TO_FLIP = "WAITING_TO_FLIP",
    NOT_FLIPPED = "NOT_FLIPPED"
}