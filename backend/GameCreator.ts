import { Database } from "bun:sqlite";

export default class GameMaster{
    private database: Database;
    constructor(){
        this.database = new Database("mydb.sqlite", { create: true });
    }

    public async CreateGame(gameName: string){
        
    }

    public async GetGame(gameId: number){
        const query = this.database.query(`select 1 as gameId`);
        const returnValues = query.values();
        console.log(returnValues);
    }
}


