import { GameOptions } from "../models/gameOptions";
import Session from "../models/session";
import Database from "bun:sqlite";

export class SessionManager {
    private database: Database;

    constructor() {
        try{
            console.log("Initializing session manager");
            this.database = new Database("sessionManager.sqlite", { create: true });
            const checkIfTableExistsQuery = `select name from sqlite_master where type='table' and name='Sessions'`;
            const tableQuery = this.database.query(checkIfTableExistsQuery);
            tableQuery.run();
            console.log("tableQuery.values()", tableQuery.values());
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

  
    public CreateNewSessionFromGameOption(gameOptions : GameOptions) : Session { 
        return this.CreateNewSession( gameOptions.GetGameId(), gameOptions.GetGameName()); 
    }

    // TODO: Probably need to add duplication check here before it goes to validate itself
    public CreateNewSession(gameId : number, gameName: string) : Session {
        console.log("CreateNewSession() method called, gameId:", gameId, "gameName:", gameName);
        const gameOptions = new GameOptions(gameId, gameName);
        const session = new Session(gameOptions); 

        //TODO: insert session into DB
        const insertSessionQuery = 
            `insert into Sessions (UserGuid, GameId, SessionCreation, DateTimeStamp)` + 
            `values ('${session.UserGuid}', ${session.GameId}, '${session.SessionCreation}', '${session.DateTimeStamp}')`;
        const query = this.database.query(insertSessionQuery);
        query.run();
        return session;
    }

    public GetSession(gameId: number) : Session{
        console.log("GetSession() method called, gameId: ", gameId);
        const query = this.database.query(`select * from Sessions where GameId = ${gameId}`);
        query.run();
        const result = query.values();
        if (result.length == 0){
            console.log("No session found for gameId: ", gameId);
            return new Session(new GameOptions( 0, "" + gameId));
        } 

        //TODO: Change this from hard coded to extract whatever is in the db
        console.log("result", result);
        var gameOptions = new GameOptions(1,"hardcodedGameName");
        return new Session(gameOptions);
        // const session = new Session(result[0].GameId, result[0].GameName);
    }
}

