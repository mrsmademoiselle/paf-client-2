import {Atom, swap} from "@dbeining/react-atom";
import {GameDto} from "../entities/GameDto";
import {WebsocketConnector} from "../services/WebsocketConnector";
import {UserDto} from "../entities/UserDto";
import {BoardDto} from "../entities/BoardDto";
import {EndScoreDto} from "../entities/EndScoreDto";

export const authentication = Atom.of({
    isAuthenticated: false
});


export default interface bannerStateInterface {
    variant: string;
    text: string;
    show: boolean;
}

export const bannerState = Atom.of({
    variant: "success",
    text: "test",
    show: false,
});

export function showBanner(variant: string, text: string): void {
    return swap(bannerState, state => ({
        ...state,
        variant: variant,
        text: text,
        show: true,
    }));
}

export function closeBanner(): void {
    return swap(bannerState, state => ({
        ...state,
        show: false,
    }));
}

export const matchDtoState = Atom.of({
    match: new GameDto("", new UserDto("", ""), new BoardDto([]), [])
});

export function addMatchDto(newMatch: GameDto): void {
    return swap(matchDtoState, state => ({
        ...state,
        match: newMatch
    }));
}

export const endscoreDtoState = Atom.of({
    endscore: new EndScoreDto(new UserDto("", ""), [])
});

export function addEndscoreDto(newEndscore: EndScoreDto): void {
    return swap(endscoreDtoState, state => ({
        ...state,
        endscore: newEndscore
    }));
}

function createWebsocketConnector(): WebsocketConnector {
    let wsConn: WebsocketConnector = new WebsocketConnector();
    return wsConn;
}

export const websocketState = Atom.of({
    websocketConnector: createWebsocketConnector()
})