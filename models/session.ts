import { GameOptions } from "./gameOptions";

export default class Session{
    private request: Request;
    private gameOptions: GameOptions;

    public constructor(request: Request, gameId: number = 0, gameName: string = ""){
        this.request = request;
        this.gameOptions = new GameOptions(gameId, gameName);
    }

    public GetGame(){
        return this.gameOptions;
    }

    public GetRequest(){
        return this.request;
    }
        
}
