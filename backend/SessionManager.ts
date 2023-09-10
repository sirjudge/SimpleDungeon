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

class Session{
    private request: Request;
    private gameId: number;
    private gameName: string;
    public constructor(request: Request, gameId: number = 0, gameName: string = ""){
        this.request = request;
        this.gameId = gameId;
        this.gameName = gameName;
    }
}
