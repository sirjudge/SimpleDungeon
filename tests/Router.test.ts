import {expect, test} from "bun:test";
import Router from "../backend/Router";

test("Router-home", async () => {
    var router = new Router(); 
    var request = new Request("http://localhost:3000/", {method: "GET"});
    var response = await router.Route(request);
    expect(response.status).toEqual(200);
});

