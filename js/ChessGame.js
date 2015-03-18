/**
 * Created by Drake on 2015/3/19.
 */
var Game = function (MapObjects) {
    var obj = {};
    obj.MapObjs = MapObjects;
    obj.GameStart = function () {
        setInterval(function () {
            gameArea.clearRect(0, 0, 600, 480);
            //console.log("clear");
            for (var i = 0; i < obj.MapObjs.length; i++) {
                if (obj.MapObjs[i].Draw != null)
                    obj.MapObjs[i].Draw();
            }
        }, (1000 / 100));
    };
    return obj;
};