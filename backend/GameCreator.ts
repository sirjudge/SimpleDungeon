import { Database } from "bun:sqlite";
import { GameOptions } from "../models/gameOptions";

export default class GameMaster{
    private database: Database;
    constructor(){
        this.database = new Database("mydb.sqlite", { create: true });
        this.InitDatabase();
    }

    public async CreateGame(gameName) : Promise<GameOptions>{
        var queryText = `insert into games (gameName) values ('${gameName}') RETURNING gameId`;
        console.log("QueryText:" + queryText);
        const query = this.database.query(queryText);
        try{
            query.run();
            var returnValues = query.values();
            if (returnValues.length > 0)
                return new GameOptions( returnValues[0][0] as number, gameName);
            
            else {
                console.log("Error creating the game, no return values");
            }
        }
        catch(e){
            console.log("error creating game: " + e);
        }
        return new GameOptions(0, "");
    }

    public async GetAllGames() : Promise<GameOptions[]>{
        const query = this.database.query(`select * from games`);
        const returnValues = query.values();
        
        let gameOptionsArray = [];
        for (let i = 0; i < returnValues.length; i++){
            const gameOptions = new GameOptions(returnValues[i][0], returnValues[i][1]);
            gameOptionsArray.push(gameOptions);
        }
        return gameOptionsArray;
    }

    public async GetGame(gameId: number) : Promise<GameOptions>{
        const query = this.database.query(`selectgameId, gameName from games where gameId = ${gameId}`);
        const returnValues = query.values()[0];
        if (returnValues.length > 0){
            const gameOptions = new GameOptions(returnValues[0], returnValues[1]);
            return gameOptions;
        }
        else {
            return new GameOptions(0, "");
        }
    }
    
    private InitDatabase() : void{
        const checkIfTableExistsQuery = `select name from sqlite_master where type='table' and name='games'`;
        const tableQuery = this.database.query(checkIfTableExistsQuery);
        tableQuery.run();
        if (tableQuery.values().length > 0 && tableQuery.values()[0][0] == "games"){
            console.log("table already exists and no creation needed");
        }
        else {
            const createTableString = `create table games ( gameId integer primary key, gameName text not null )`;
            const query = this.database.query(createTableString);
            query.run();
        }
    }
}


