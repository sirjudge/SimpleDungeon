import { GameOptions } from "../models/gameOptions";
import GameMaster from "./GameCreator";

export default class Router{

    public LogRequest(request: Request): void{
        console.log("Request: " + request.method + " " + request.url);
    }

    public async Route(request: Request): Promise<Response>{
        this.LogRequest(request);
        switch(request.method){
            case "GET":
                return await this.RouteGetRequest(request);
            case "POST":
                return await this.RoutePostRequest(request);
            case "DELETE":
                return await this.RouteDeleteRequest(request);
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }

    public async RouteDeleteRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        switch (url.pathname){
            case "/DeleteGame":
                const gameId = url.searchParams.get("gameId");
                await gameMaster.DeleteGame(Number(gameId));
                return new Response("Game deleted", {status: 200});
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }

    public async RouteGetRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        let games = [];
        switch (url.pathname){
            case "/": 
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/home.html"));
            case "/about":
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/about.html"));
            case "/launchGame":
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/launchGame.html"), {status: 200});
            case "/GetGamesHtml":
                games = await gameMaster.GetAllGames();
                var returnHtml = await this.BuildGameList(games);
                return new Response(returnHtml, {status: 200});
            case "/GetGames":
                games = await gameMaster.GetAllGames();
                return new Response(JSON.stringify(games), {status: 200});
            case "/GameEngine":
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/GameEngine.html"));
            case "/LaunchGameEngine":
                const gameId = url.searchParams.get("gameId");
                var response = new Response("Connection established", {status: 200});
                response.headers.set("HX-REDIRECT", "/GameEngine?gameId=" + gameId);
                return response;
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }

    public async BuildGameList(games: GameOptions[]){
        var returnHtml = `<div id="gameList"><ul>`;
        games.forEach(game => {
            var gameId = game.GetGameId();
            var gameName = game.GetGameName();
            returnHtml += '<li id="' + gameId + '">' + 
                `Id:${gameId} Name:${gameName}` +
                `<button hx-delete=\"\/DeleteGame?gameId=${gameId}">Delete</button>` +  
                `<button hx-get=\"\/LaunchGameEngine?gameId=${gameId}">Launch</button>` +  
                "</li>";
        });
        return returnHtml + "</ul></div>";
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
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
}

