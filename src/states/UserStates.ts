import {Atom, swap} from "@dbeining/react-atom";
import {MatchDto} from "../entities/MatchDto";
import {WebsocketConnector} from "../services/WebsocketConnector";

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
    match: {}
});

export function addMatchDto(newMatch: MatchDto): void {
    return swap(matchDtoState, state => ({
        ...state,
        match: newMatch
    }));
}

function createWebsocketConnector(): WebsocketConnector {
    let wsConn: WebsocketConnector = new WebsocketConnector();
    return wsConn;
}

export const websocketState = Atom.of({
    websocketConnector: createWebsocketConnector()
})