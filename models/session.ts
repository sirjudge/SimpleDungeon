import { GameOptions } from "./gameOptions";

export default class Session{
    private gameOptions: GameOptions;
    private userGuid: string;
    private DateTimeStamp: Date;

     public constructor( gameId: number, gameName: string){
        this.gameOptions = new GameOptions(gameId, gameName);
        this.userGuid = this.CreateUserGuid();
        this.DateTimeStamp = new Date();
    }

    public GetDateTimeStamp(){
        return this.DateTimeStamp;
    }
    
    public GetUserGuid(){
        return this.userGuid;
    }

    public GetGameOptions(){
        return this.gameOptions;
    }

    public CreateUserGuid(){
        let id = crypto.randomUUID();
        return id.toString();
    }
}
