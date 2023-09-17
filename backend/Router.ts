import { GameOptions } from "../models/gameOptions";
import GameMaster from "./GameCreator";
import { serialize } from "bun:jsc";

export default class Router{

    public async Route(request: Request): Promise<Response>{
        this.LogRequest(request);
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        if (request.method == "GET"){
            let games = [];
            switch (url.pathname){
                case "/": 
                    return new Response(Bun.file(import.meta.dir + "/../frontend/pages/home.html"));
                case "/launchGame":
                    return new Response(Bun.file(import.meta.dir + "/../frontend/pages/launchGame.html"));
                case "/connectToGame":
                    return new Response(Bun.file(import.meta.dir + "/../frontend/pages/connectToGame.html"));
                case "/about":
                    return new Response(Bun.file(import.meta.dir + "/../frontend/pages/about.html"));
/*               
                // TODO: /GetGame might not be in use anymore
                case "/GetGame":
                    const gameId = url.searchParams.get("gameId");
                    const gameOptions = await gameMaster.GetGame(Number(gameId));
                    const generatedHtml = '<ul><li id="' + gameOptions.GetGameId() + '">GameName:' + gameOptions.GetGameName() + "</li></ul>";
                    const serializedGameOptions = serialize(gameOptions);
                    return new Response(serializedGameOptions, {status: 200});
*/
                case "/GetGamesHtml":
                    games = await gameMaster.GetAllGames();
                    var returnHtml = await this.BuildGameList(games);
                    return new Response(returnHtml+"</ul>", {status: 200});
                case "/GetGames":
                    games = await gameMaster.GetAllGames();
                    return new Response(JSON.stringify(games), {status: 200});
                default:
                    return new Response("404 Not Found", { status: 404 });
            }
        }
        else if (request.method == "POST"){
            switch(url.pathname){
                case "/createGame":
                    const formDataPromise = request.formData();
                    var gameName = "";
                    await formDataPromise.then((formData) => { 
                        gameName = formData.get("gameName") as string;
                    });
                    const gameOptions = await gameMaster.CreateGame(gameName);
                    const returnHtml = '<ul><li id="' + gameOptions.GetGameId() + '">GameId:' + gameOptions.GetGameId() + 'GameName:' + gameOptions.GetGameName() + "</li></ul>";
                    return new Response(returnHtml, {status: 200});
                case "/joinGame":
                    return new Response("Not implemented", {status: 501});
                case "/ClearGame":
                    const gameId = url.searchParams.get("gameId");
                    await gameMaster.ClearGame(Number(gameId));
                default:
                    return new Response("404 Not Found", { status: 404 });
            }

        }
        else return new Response("404 Not Found", { status: 404 });
    }

    public LogRequest(request: Request): void{
        console.log("Request: " + request.method + " " + request.url);
    }


    public async BuildGameList(games: GameOptions[]){
        var returnHtml = "<ul>"; 
        console.log("building games list"); 
        games.forEach(game => {
            returnHtml += '<li id="' + game.GetGameId() + '">' + 
                "GameId:" + game.GetGameId() + "  GameName:"+ game.GetGameName() + 
                //'<button hx-on:click="alert(\'delete ID:'+ game.GetGameId() + " gameName:" + game.GetGameName() + '\')">delete</button>' +
                '<button hx-get"/ClearGame?gameId=' + game.GetGameId() + '">delete</button>' +  
                "</li>";
        });
        return returnHtml;
    }
}

