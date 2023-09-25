import Session from "../models/session";
import Database from "bun:sqlite";

export class SessionManager {

    private database: Database;

    constructor() {
        this.InitDatabase();
        this.database = new Database("sessionManager.sqlite", { create: true });
    }

    private InitDatabase() : void{
        try{
            const checkIfTableExistsQuery = `select name from sqlite_master where type='table' and name='Sessions'`;
            const tableQuery = this.database.query(checkIfTableExistsQuery);
            tableQuery.run();
            if (tableQuery.values().length == 0){
                const createTableString = `create table Sessions ( SessionId integer primary key, UserGuid text not null, GameId integer not null)`;
                const query = this.database.query(createTableString);
                query.run();
            }
        }
        catch(e){
            console.error(e);
        }
    }

    static CreateNewSession(gameId : Number, gameName: string) : Session {
    //public constructor(request: Request, gameId: number = 0, gameName: string = ""){
        const session = new Session(gameId, gameName); 
    }

    static GetSession(request: Request) : Session{
        const gameId = 1;
        const gameName = "Test Game";
        return new Session(request, gameId, gameName);
    }
}

