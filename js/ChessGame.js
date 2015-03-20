/**
 * Created by Drake on 2015/3/19.
 */
var Game = function (MapObjects) {
    var obj = {};
    obj.Type = "Game";

    obj.MapObjs = MapObjects;
    obj.GameStart = function () {
        setInterval(function () {
            gameArea.clearRect(0, 0, 600, 480);
            for (var i = 0; i < obj.MapObjs.length; i++) {
                if (obj.MapObjs[i].Update != null)
                    obj.MapObjs[i].Update();
                if (obj.MapObjs[i].Draw != null)
                    obj.MapObjs[i].Draw();
            }
            mouseInput.ClearClickState();
        }, (1000 / 100));
    };
    return obj;
};

var Chessboard = function (MapObjects) {
    var obj = {};
    obj.Type = "Chessboard";

    obj.MapObjs = MapObjects;
    obj.Draw = function () {
        gameArea.clearRect(0, 0, 600, 480);
        for (var i = 0; i < obj.MapObjs.length; i++) {
            if (obj.MapObjs[i].Draw != null)
                obj.MapObjs[i].Draw();
        }
    };
    return obj;
};