import {expect, test} from "bun:test";
import GameMaster from "../backend/GameCreator";

test("GameMaster CreateDB", async () => {
    const gameMaster = new GameMaster();
    const testName = "uniqueTestName" + Date.now().toString();
    const gameOptions = await gameMaster.CreateGame(testName);
    expect(gameOptions).toHaveProperty("gameId");
    expect(gameOptions).toHaveProperty("gameName");
    expect(gameOptions.GetGameId()).toBeGreaterThan(0);
    expect(gameOptions.GetGameName()).toBe(testName);
});

test("GameMasterGetGame", async () => {
    const gameId = 1;
    const gameMaster = new GameMaster();
    const gameOptions = await gameMaster.GetGame(gameId);
    expect(gameOptions.GetGameId()).toBe(gameId);
    expect(gameOptions.GetGameName()).not.toBeNil();
});
