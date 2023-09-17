import { GameOptions } from "../models/gameOptions";
import GameMaster from "./GameCreator";

export default class Router{

    public LogRequest(request: Request): void{
        console.log("Request: " + request.method + " " + request.url);
    }

    public async Route(request: Request): Promise<Response>{
        this.LogRequest(request);
        if (request.method == "GET"){
            return await this.RouteGetRequest(request);
        }
        else if (request.method == "POST"){
            return this.RoutePostRequest(request);
        }
       
        return new Response("404 Not Found", { status: 404 });
    }

    public async RoutePostRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        switch(url.pathname){
            case "/createGame":
                const formDataPromise = request.formData();
                var gameName = "";
                await formDataPromise.then((formData) => { 
                    gameName = formData.get("gameName") as string;
                });
                const gameOptions = await gameMaster.CreateGame(gameName);
                const returnHtml = '<ul><li id="' + gameOptions.GetGameId() + '">Id:' + gameOptions.GetGameId() + 'Name:' + gameOptions.GetGameName() + "</li></ul>";
                return new Response(returnHtml, {status: 200});
            case "/ClearGame":
                const gameId = url.searchParams.get("gameId");
                await gameMaster.ClearGame(Number(gameId));
                return new Response("Game Cleared", {status: 200});
        }
        return new Response("404 Not Found", { status: 404 });
    }

    public async RouteGetRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
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

    public async BuildGameList(games: GameOptions[]){
        var returnHtml = "<ul>"; 
        games.forEach(game => {
            var gameId = game.GetGameId();
            var gameName = game.GetGameName();
            returnHtml += '<li id="' + game.GetGameId() + '">' + 
                `Id:${gameId} Name:${gameName}` +
                `<button hx-get"//ClearGame?gameId=${gameId}">delete</button>` +  
                "</li>";
        });
        return returnHtml;
    }
}

