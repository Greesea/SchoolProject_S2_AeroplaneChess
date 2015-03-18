/**
 * Created by Drake on 2015/3/18.
 */
var MapObject = function (location, size, region, canJump, func) {
    var obj = {};
    obj.Location = location;
    obj.Size = size;
    obj.Region = region;
    obj.CanJump = canJump;
    obj.Draw = func;
    return obj;
};

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

var Size = function (width, height) {
    var obj = {};
    obj.Width = width;
    obj.Height = height;
    return obj;
};

var Location = function (x, y) {
    var obj = {};
    obj.X = x;
    obj.Y = y;
    return obj;
};

var Region = {
    _Corner: "gray",
    Red: "red",
    Blue: "blue",
    Orange: "orange",
    Yellow: "yellow"
};