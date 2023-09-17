import GameMaster from "./GameCreator";
import { GameOptions } from "../models/gameOptions";
import { serialize } from "bun:jsc";

export default class Router{

    public async Route(request: Request): Promise<Response>{
    const url = new URL(request.url);
    const gameMaster = new GameMaster();
    let games = [];
    if (request.method == "GET"){
        switch (url.pathname){
            case "/": 
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/home.html"));
            case "/launchGame":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/launchGame.html"));
            case "/connectToGame":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/connectToGame.html"));
            case "/about":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/about.html"));
            case "/GetGame":
                const gameId = url.searchParams.get("gameId");
                const gameOptions = await gameMaster.GetGame(Number(gameId));
                const generatedHtml = '<ul><li id="' + gameOptions.GetGameId() + '">GameName:' + gameOptions.GetGameName() + "</li></ul>";
                const serializedGameOptions = serialize(gameOptions);
                return new Response(serializedGameOptions, {status: 200});
            case "/GetGamesHtml":
                games = await gameMaster.GetAllGames();
                var returnHtml = "<ul>";
                for (let i = 0; i < games.length; i++){
                    returnHtml += '<li id="' + games[i].GetGameId() + '">' + 
                    "GameId:" + games[i].GetGameId() + "GameName:"+ games[i].GetGameName() + 
                    "</li>";
                }
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
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else return new Response("404 Not Found", { status: 404 });
}
}

