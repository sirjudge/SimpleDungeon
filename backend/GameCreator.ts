import { Database } from "bun:sqlite";
import { GameOptions } from "../models/gameOptions";

export default class GameMaster{
    private database: Database;
    constructor(){
        this.database = new Database("mydb.sqlite", { create: true });
        this.InitDatabase();
    }

    public async CreateGame(gameOptions : GameOptions){
        if (gameOptions.GetGameId() == 0){ gameOptions.SetGameId(1); }
        const query = this.database.query(`insert into games (gameId, gameName) values (?, ?)`, gameOptions.GetGameId(), gameOptions.GetGameName());
        query.run();
    }

    public async GetGame(gameId: number){
        const query = this.database.query(`select 1 as gameId`);
        const returnValues = query.values()[0];
        console.log(returnValues);
    }
    
    private InitDatabase(){
        const checkIfTableExistsQuery = `select name from sqlite_master where type='table' and name='games'`;
        const tableQuery = this.database.query(checkIfTableExistsQuery);
        tableQuery.run();
        if (tableQuery.values().length > 0 && tableQuery.values()[0][0] == "games"){
            console.log("table already exists");
        }
        else {
            const createTableString = `create table games ( gameId integer primary key, gameName text not null )`;
            const query = this.database.query(createTableString);
            query.run();
        }
    }
}


