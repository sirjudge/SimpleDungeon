import { SessionManager } from "./backend/SessionManager";
import GameMaster from "./backend/GameCreator";

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const session = SessionManager.GetSession(request);
    const gameMaster = new GameMaster();
    gameMaster.CreateGame("Test Game");
    return Route(request);
  },
});



function Route(request: Request): Response{
    const url = new URL(request.url);
    console.log(request);
    if (request.method == "POST"){
        switch (url.pathname){
            case "/": 
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/home.html"));
            case "/launchGame":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/launchGame.html"));
            case "/connectToGame":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/connectToGame.html"));
            case "/about":
                return new Response(Bun.file(import.meta.dir + "/frontend/pages/about.html"));
            case "/createGame":
                return new Response("Game Created", { status: 200 });
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else if (request.method == "GET"){
        switch(url.pathname){
            case "/createGame":
                return new Response("Game Created", { status: 200 });
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else{
        return new Response("404 Not Found", { status: 404 });
    }
}

