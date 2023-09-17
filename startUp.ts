import Router from "./backend/Router";
const server = Bun.serve( {
  port: 3000,
  async fetch(request) {
    const router = new Router();
    return await router.Route(request);
  },
});

console.log("server started:", server.hostname + ":" + server.port);

