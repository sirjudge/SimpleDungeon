import { GameOptions } from "../models/gameOptions";
import Session from "../models/session";
import GameMaster from "./GameMaster";
import { SessionManager } from "./SessionManager";

export default class Router{


    public async Route(request: Request): Promise<Response>{
        this.LogRequest(request);
        this.HandleSession(request);
        switch(request.method){
            case "GET":
                return await this.RouteGetRequest(request);
            case "POST":
                return await this.RoutePostRequest(request);
            case "DELETE":
                return await this.RouteDeleteRequest(request);
            default:
                return this.Generate404(); 
        }
    }

    private Generate404(): Response {
        return new Response("404 Not Found, { status: 404 }");
    }

    private LogRequest(request: Request): void{
        console.log("Request: " + request.method + " " + request.url);
    }

    private HandleSession(request : Request) : Session{

        var sessionManager = new SessionManager();
        var url = new URL(request.url);
        var gameIdString = url.searchParams.get("gameId"); 
        console.log("gameIdString:", gameIdString);
        let gameId = 0;
        if (gameIdString != null){
            gameId = Number(gameIdString); 
            var gameOptions = new GameOptions(gameId, "");
            var session = sessionManager.GetSession(gameId);
            if (session == null){
                session = sessionManager.CreateNewSessionFromGameOption(gameOptions);
            }
            return session;
        }
        console.log("no gameId found in url, no session created");
        var session = sessionManager.GetSession(0);
        return session;
    }

    private async RouteDeleteRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        switch (url.pathname){
            case "/DeleteGame":
                const gameId = url.searchParams.get("gameId");
            await gameMaster.DeleteGame(Number(gameId));
            return new Response("Game deleted", {status: 200});
            default:
                return this.Generate404();
        }
    }

    private async RouteGetRequest(request: Request): Promise<Response>{
        const url = new URL(request.url);
        const gameMaster = new GameMaster();
        let games = [];

        // auto handle style resolution
        // todo: do link sanitization here as well
        if (url.pathname.split("/")[0] == "styles")
            return new Response(Bun.file(import.meta.dir + "/../frontend/" + url.pathname));

        switch (url.pathname){
            case "/": 
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/home.html"));
            case "/about":
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/about.html"));
            case "/launchGame":
                console.log( "launchGame called");
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/launchGame.html"), {status: 200});
            case "/GetGamesHtml":
                console.log("GetGamesHtml called");
                games = await gameMaster.GetAllGames();
            var returnHtml = await this.BuildGameList(games);
            return new Response(returnHtml, {status: 200});
            case "/GetGames":
                console.log("GetGames called");
                games = await gameMaster.GetAllGames();
            return new Response(JSON.stringify(games), {status: 200});
            case "/GameEngine":
                console.log("GameEngine called");
                return new Response(Bun.file(import.meta.dir + "/../frontend/pages/GameEngine.html"));
            case "/LaunchGameEngine":
                const gameId = url.searchParams.get("gameId");
                console.log("Launching enginer: ", gameId); 
                var response = new Response("Connection established", {status: 200});
                response.headers.set("HX-REDIRECT", "/GameEngine?gameId=" + gameId);
                return response;
            default:
                return this.Generate404();
        }
    }

    private async BuildGameList(games: GameOptions[]){
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

    private async RoutePostRequest(request: Request): Promise<Response>{
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
            console.log("gameOptions returnHtml");
            const returnHtml = '<ul><li id="' + gameOptions.GetGameId() + '">Id:' + gameOptions.GetGameId() + 'Name:' + gameOptions.GetGameName() + "</li></ul>";
            return new Response(returnHtml, {status: 200});
            default:
                return this.Generate404();
        }
    }
}

