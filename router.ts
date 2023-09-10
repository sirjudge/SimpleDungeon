const server = Bun.serve({
      // routing logic
  port: 3000,
  fetch(request) {
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
            return new Response(Bun.file(import.meta.dir + "frontend/pages/about.html"));
        default:
            return new Response("404 Not Found", { status: 404 });
      }
  },
});


console.log("server is running on port ", server.port);
