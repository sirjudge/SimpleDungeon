import AuthenticateUser from "./backend/Authenticate";

const server = Bun.serve({
  port: 3000,
  fetch(request) {
    AuthenticateUser(request);
    Route(request);
    return Route(request);
  },
});

function Route(request: Request){
    const url = new URL(request.url);
    console.log(url);
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

