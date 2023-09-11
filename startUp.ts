import { SessionManager } from "./backend/SessionManager";
import GameMaster from "./backend/GameCreator";
import { Server } from "tls";

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    console.log("path:" + request.url + " method:" + request.method);
    return Route(request);
  },
});


console.log("server started:", server.hostname + ":" + server.port);

function printRequest(request: Request){
    console.log("url:", request.url);
    console.log("method:", request.method);
    console.log("headers:", request.headers);
    console.log("body:", request.body);
}

function printServerDetails(server: Server){
    console.log("hostname:", server.hostname);
}

function Route(request: Request): Response{
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
                const session = SessionManager.GetSession(request);
                const gameMaster = new GameMaster();
                gameMaster.CreateGame("Test Game");
                return new Response("Game Created", { status: 200 });
            default:
                return new Response("404 Not Found", { status: 404 });
        }
    }
    else return new Response("404 Not Found", { status: 404 });
}

