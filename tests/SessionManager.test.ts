import {expect, test} from "bun:test";
import Session from "../models/session.ts";
import { GameOptions } from "../models/gameOptions.ts";

test("TestSessionModelConstructor", () => {
    var gameOptions = new GameOptions(1, "testGameName");
    var session = new Session(gameOptions);
    // verifiy userGuid set correctly 
    expect(session.GetUserGuid()).not.toBeNull();
    
    // verify gameOptiosn set correctly
    expect(session.GetGameOptions()).not.toBeNull();
    expect(session.GetGameOptions().GetGameId()).toEqual(gameOptions.GetGameId());
    expect(session.GetGameOptions().GetGameName()).toEqual(gameOptions.GetGameName());
    expect(session.GetDateTimeStamp()).not.toBeNull();
});
