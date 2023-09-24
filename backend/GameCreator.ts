import { Database } from "bun:sqlite";
import { GameOptions } from "../models/gameOptions";

export default class GameMaster{
    private database: Database;
    constructor(){
        this.database = new Database("mydb.sqlite", { create: true });
        this.InitDatabase();
    }

    public async DeleteGame(gameId: number) : Promise<boolean>{
        console.log("clearing game:" + gameId);
        try{
            const query = this.database.query(`delete from games where gameId = ${gameId}`);
            query.run();
            return true;
        }
        catch(exception){
            console.error(exception);
            return false;
        }
    }

    public async CreateGame(gameName: string) : Promise<GameOptions>{
        var queryText = `insert into games (gameName) values ('${gameName}') RETURNING gameId`;
        const query = this.database.query(queryText);
        try{
            query.run();
            var returnValues = query.values();
            if (returnValues.length > 0)
                return new GameOptions( returnValues[0][0] as number, gameName);
            else 
                console.error("Error creating the game, no return values");
        }
        catch(e){
            console.error(e);
        }
        return new GameOptions(0, "");
    }

    public async GetAllGames() : Promise<GameOptions[]>{
        const query = this.database.query(`select * from games`);
        const returnValues = query.values();
        
        let gameOptionsArray = [];
        for (let i = 0; i < returnValues.length; i++){
            gameOptionsArray.push(
                new GameOptions(returnValues[i][0] as number, returnValues[i][1] as string)
            );
        }
        return gameOptionsArray;
    }

    public async GetGame(gameId: number) : Promise<GameOptions>{
        console.log("gameId: " + gameId);
        const query = this.database.query(`select gameId, gameName from games where gameId = ${gameId}`);
        const returnValues = query.values()[0];
        if (returnValues != null && returnValues.length > 0)
            return new GameOptions(returnValues[0] as number, returnValues[1] as string);
        else 
            return new GameOptions(0, "");
    }
   

    private InitDatabase() : void{
        try{
            const checkIfTableExistsQuery = `select name from sqlite_master where type='table' and name='games'`;
            const tableQuery = this.database.query(checkIfTableExistsQuery);
            tableQuery.run();
            if (tableQuery.values().length == 0){
                const createTableString = `create table games ( gameId integer primary key, gameName text not null)`;
                const query = this.database.query(createTableString);
                query.run();
            }
        }
        catch(e){
            console.error(e);
        }
    }
}


