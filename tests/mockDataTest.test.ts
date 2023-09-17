import { GameOptions } from "../models/gameOptions";
import {expect, test} from "bun:test";

function createGameOptions(): GameOptions[]{
    var gameOption1 = new GameOptions(1,"game1");
    var gameOption2 = new GameOptions(2,"game2");
    var gameOption3 = new GameOptions(3,"game3");
    var gameOption4 = new GameOptions(4,"game4");
    var gameOption5 = new GameOptions(5,"game5");
    return new Array(gameOption1, gameOption2, gameOption3, gameOption4, gameOption5);
}


test("GameOptionsInitialization", () => {
    var gameOptionsArray = createGameOptions();
    expect(gameOptionsArray[0].GetGameId()).toEqual(1);
    expect(gameOptionsArray[0].GetGameName()).toEqual("game1");
    expect(gameOptionsArray[1].GetGameId()).toEqual(2);
    expect(gameOptionsArray[1].GetGameName()).toEqual("game2");
    expect(gameOptionsArray[2].GetGameId()).toEqual(3);
    expect(gameOptionsArray[2].GetGameName()).toEqual("game3");
    expect(gameOptionsArray[3].GetGameId()).toEqual(4);
    expect(gameOptionsArray[3].GetGameName()).toEqual("game4");
    expect(gameOptionsArray[4].GetGameId()).toEqual(5);
    expect(gameOptionsArray[4].GetGameName()).toEqual("game5");
});
