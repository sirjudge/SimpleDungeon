import { Database } from "bun:sqlite";
import { GameOptions } from "../models/gameOptions";

export default class GameMaster{
    private database: Database;
    constructor(){
        this.database = new Database("mydb.sqlite", { create: true });
    }

    public async CreateGame(gameOptions : GameOptions){
        const query = this.database.query(`insert into games (gameId, gameName) values (?, ?)`, gameOptions.GetGameId(), gameOptions.GetGameName());
        const returnValues = query.values();
        console.log(returnValues);
    }

    public async GetGame(gameId: number){
        const query = this.database.query(`select 1 as gameId`);
        const returnValues = query.values();
        console.log(returnValues);
    }
}


