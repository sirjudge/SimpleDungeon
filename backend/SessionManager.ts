import Session from "../models/session";

export class SessionManager {
    static CreateNewSession(request: Request) {
        return new Session(request);
    }

    static GetSession(request: Request) {
        const gameId = 1;
        const gameName = "Test Game";
        return new Session(request, gameId, gameName);
    }
}

