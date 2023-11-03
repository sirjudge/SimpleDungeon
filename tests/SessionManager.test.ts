import {expect, test} from "bun:test";
import Session from "../models/session.ts";

test("TestSessionModelConstructor", () => {
    var gameId = 1;
    var gameName = "test game";
    var session = new Session(gameId, gameName);
    // verifiy userGuid set correctly 
    expect(session.GetUserGuid()).not.toBeNull();
    
    // verify gameOptiosn set correctly
    expect(session.GetGameOptions()).not.toBeNull();
    expect(session.GetGameOptions().GetGameId()).toEqual(gameId);
    expect(session.GetGameOptions().GetGameName()).toEqual(gameName);
    expect(session.GetDateTimeStamp()).not.toBeNull();
});
