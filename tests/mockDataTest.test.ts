import { GameOptions } from "../models/gameOptions";


function createGameOptions(): GameOptions[]{
    var gameOption1 = new GameOptions(1,"game1");
    var gameOption2 = new GameOptions(2,"game2");
    var gameOption3 = new GameOptions(3,"game3");
    var gameOption4 = new GameOptions(4,"game4");
    var gameOption5 = new GameOptions(5,"game5");
    return new Array(gameOption1, gameOption2, gameOption3, gameOption4, gameOption5);
}


