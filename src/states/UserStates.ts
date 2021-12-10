import {Atom, swap} from "@dbeining/react-atom";

export const authentication = Atom.of({
    isAuthenticated: false
});


export default interface bannerStateInterface {
    variant: string;
    text: string;
    show: boolean;
}

export const bannerState = Atom.of({
    variant : "success",
    text : "test",
    show: true,
});

export function showBanner(variant: string, text: string): void{
    return swap(bannerState, state => ({
	...state,
	variant: variant,
	text: text,
	show: false,
    }));
}

export function closeBanner(): void {
    return swap(bannerState, state => ({
	...state,
	show: true,
    }));
}

