export class GameOptions {
    private gameName: string;
    private gameId: number;

    constructor() {
        this.gameName = "";
        this.gameId = 0;
    }
   
    public SetGameId(gameId: number) {
        this.gameId = gameId;
    }
    
    public SetGameName(gameName: string) {
        this.gameName = gameName;
    }
    
    public GetGameId() : number{
        return this.gameId;
    }
    
    public GetGameName() : string{
        return this.gameName;
    }    
}
