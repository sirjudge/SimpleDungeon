export default class Session{
    private request: Request;
    private gameId: number;
    private gameName: string;
    public constructor(request: Request, gameId: number = 0, gameName: string = ""){
        this.request = request;
        this.gameId = gameId;
        this.gameName = gameName;
    }

    public GetGameId(){
        return this.gameId;
    }
    public GetGameName(){
        return this.gameName;
    }
}
