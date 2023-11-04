import { GameOptions } from "./gameOptions";

export default class Session{
    private GameOptions: GameOptions;
    private userGuid: string;
    private DateTimeStamp: Date;


    public constructor(gameOptions: GameOptions){
    
        this.GameOptions = gameOptions;
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
        return this.GameOptions;
    }

    public CreateUserGuid(){
        let id = crypto.randomUUID();
        return id.toString();
    }
}
