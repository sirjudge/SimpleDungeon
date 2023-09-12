import { SessionManager } from "./backend/SessionManager";
import GameMaster from "./backend/GameCreator";
import { deserialize, serialize } from "bun:jsc";
import { GameOptions } from "./models/gameOptions";
import { request } from "http";


const server = Bun.serve( {
  port: 3000,
  async fetch(request) {
      return Route(request);
  },
});


console.log("server started:", server.hostname + ":" + server.port);

async function Route(request: Request): Promise<Response>{
    const url = new URL(request.url);
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
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else if (request.method == "POST"){
        switch(url.pathname){
            case "/createGame":
                const formDataPromise = request.formData();
                var gameOptions = new GameOptions(0,"");
                await formDataPromise.then((formData) => { 
                    const gameName = formData.get("gameName");
                    const gameId = formData.get("gameId");
                    gameOptions = new GameOptions(Number(gameId), String(gameName));
                });
                
                const gameMaster = new GameMaster();
                await gameMaster.CreateGame(gameOptions);
                const returnHtml = '<ul><li id="' + gameOptions.GetGameId() + '">GameName:' + gameOptions.GetGameName() + "</li></ul>";
                return new Response(returnHtml, {status: 200});
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else return new Response("404 Not Found", { status: 404 });
}

