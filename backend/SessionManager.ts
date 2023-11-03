import { GameOptions } from "../models/gameOptions";
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
                const createTableString = `create table Sessions ( SessionId integer primary key, UserGuid text not null, GameId integer not null,SessionCreation, DateTimeStamp text not null)`;
                const query = this.database.query(createTableString);
                query.run();
            }
        }
        catch(e){
            console.error(e);
        }
    }

    static CreateNewSession(gameId : number, gameName: string) : Session {
        const gameOptions = new GameOptions(gameId, gameName);
        const session = new Session(gameId, gameName); 
        //TODO: insert session into DB
        return session;
    }

    static GetSession(request: Request) : Session{
        //TODO: get session details from DB here
        const gameId = 1;
        const gameName = "Test Game";
        const session = new Session(gameId, gameName);
        return session;
    }
}

