import {useAtom} from "@dbeining/react-atom";
import {endscoreDtoState} from "../states/UserStates";
import MainLoggedInLayout from "../layouts/MainLoggedInLayout";

export default function Endscreen() {

    let {endscore} = useAtom(endscoreDtoState);
    let headline: string = endscore.winner == null ? "Es ist untentschieden!" : endscore.winner.username + " hat gewonnen!";

    return (
        <MainLoggedInLayout>
            <div>
                <h2>{headline}</h2>
            </div>
        </MainLoggedInLayout>
    );
}