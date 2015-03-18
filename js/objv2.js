/**
 * Created by Drake on 2015/3/18.
 */
var MapObject = function (location, size, region, canJump, func) {
    var obj = new Object();
    obj.Location = location;
    obj.Size = size;
    obj.Region = region;
    obj.CanJump = canJump;
    obj.Draw = func;
    return obj;
};

var Game = function (MapObjects) {
    var obj = new Object();
    obj.MapObjs = MapObjects;
    obj.GameStart = function () {
        setInterval(function () {
            for (var i = 0; i < obj.MapObjs.length; i++) {
                if (obj.MapObjs[i].Draw != null)
                    obj.MapObjs[i].Draw();
            }
        }, (1000 / 100));
    };
    return obj;
};

var Size = function (width, height) {
    var obj = new Object();
    obj.Width = width;
    obj.Height = height;
    return obj;
};

var Location = function (x, y) {
    var obj = new Object();
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