/**
 * Created by Drake on 2015/4/6.
 */
var Stages = function () {
    var obj = {};

    obj.list = [];

    obj.getStageByName = function (name) {
        for (var i = 0; i < obj.list.length; i++) {
            if (obj.list[i].name == name) {
                return obj.list[i].stage;
            }
        }

        return null;
    };

    return obj;
};

var Stage = function (stage, name) {
    var obj = {};

    obj.stage = stage;
    obj.name = name;

    return obj;
};

var Utils = {
    "NullFunc": function () {
    }
};

var Region = {
    "tableCorner": -1,
    "player1": 0,
    "player2": 1,
    "player3": 2,
    "player4": 3
};

var Direction = {
    "up": 0,
    "right": 90,
    "down": 180,
    "left": 270
};

var GameRouteNode = function (region, changeDirection, endTo, goForward, location) {
    var obj = {};

    obj.region = region;
    obj.direction = changeDirection;
    obj.endTo = endTo;
    obj.goForward = goForward;
    obj.location = location;

    return obj;
};

var GameRouteEnd = function (nodeLocationArray, region) {
    var obj = {};

    obj.nodeLocationArray = nodeLocationArray;
    obj.region = region;

    return obj;
};

var GameHangar = function (slotLocationArray, region, direction) {
    var obj = {};

    obj.slotLocationArray = slotLocationArray;
    obj.region = region;
    obj.direction = direction;

    return obj;
};

var GameLogic = function (routeArray, endArray, hangarArray) {
    var obj = {};

    obj.route = routeArray;
    obj.end = endArray;
    obj.hangar = hangarArray;

    return obj;
};

var GamePlane = function (nowRouteIndex, whereAmI, direction, region) {
    var obj = {};

    obj.nowRouteIndex = nowRouteIndex;
    obj.whereAmI = whereAmI;
    obj.direction = direction;
    obj.region = region;

    return obj;
};

var GamePlayer = function (parent, region, isAI) {
    var obj = {};

    obj.parent = parent;
    obj.plane = [];
    obj.region = region;
    obj.isAI = isAI;

    obj.createPlanes = function () {
        for (var i = 0; i < obj.parent.logic.hangar.length; i++) {
            if (obj.parent.logic.hangar[i].region == obj.region) {
                var hangar = obj.parent.logic.hangar[i];
                for (var j = 0; j < hangar.slotLocationArray.length - 1; j++) {
                    var plane = new GamePlane(j + 1, "hangar", hangar.direction, obj.region);
                    //***
                    plane.name = i + "_" + j;

                    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("../Resources/InGame/PlaneImage.ico"));
                    sprite.interactive = true;
                    sprite.anchor.set(0.5);
                    var pos = obj.parent.getPlaneLocation(plane);
                    sprite.position.set(pos.x, pos.y);
                    sprite.width = 32;
                    sprite.height = 32;
                    sprite.bindPlane = plane;

                    sprite.on("click", function () {
                        obj.parent.playerSelectPlane(this);
                    });

                    obj.parent.stage.addChild(sprite);

                    obj.plane.push(plane);
                }
            }
        }
    };

    return obj;
};

var PlayerLogic = function (parent, playerArray) {
    var obj = {};

    obj.parent = parent;
    obj.player = playerArray;
    obj.logic = null;
    obj.stage = null;

    obj.getPlaneLocation = function (plane) {
        switch (plane.whereAmI) {
            case "hangar":
                for (var i = 0; i < obj.logic.hangar.length; i++) {
                    if (obj.logic.hangar[i].region == plane.region) {
                        return obj.logic.hangar[i].slotLocationArray[plane.nowRouteIndex];
                    }
                }
                break;
            case "node":
                return obj.logic.route[plane.nowRouteIndex];
            case "end":
                for (var i = 0; i < obj.logic.end.length; i++) {
                    if (obj.logic.end[i].region == plane.region) {
                        return obj.logic.end[i].nodeLocationArray[plane.nowRouteIndex];
                    }
                }
                break;
        }
    };

    obj.playerSelectPlane = function (plane) {

    };

    obj.bindObjParent = function () {
        for (var i = 0; i < obj.player.length; i++) {
            if (!!obj.player[i]) {
                obj.player[i].parent = obj;
            }
        }
    };

    obj.bindObjParent();

    return obj;
};

var GameView = function (gamelogic, playerlogic) {
    var obj = {};

    obj.gameLogic = gamelogic;
    obj.playerLogic = playerlogic;
    obj.gameStage = new PIXI.Container();

    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    obj.gameStage.addChild(background);

    obj.bindObjParent = function () {
        obj.playerLogic.parent = obj;
        obj.playerLogic.logic = obj.gameLogic;
        obj.playerLogic.stage = obj.gameStage;
    };

    obj.bindObjParent();

    for (var i = 0; i < 4; i++) {
        if (!!obj.playerLogic.player[i]) {
            obj.playerLogic.player[i].createPlanes();
        }
    }

    return obj;
};