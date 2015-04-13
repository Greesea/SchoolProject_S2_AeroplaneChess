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
    NullFunc: function () {
    },

    GenerateRandomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    DiceAnimate: [PIXI.Texture.fromImage("../Resources/InGame/dice-1.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-2.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-3.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-4.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-5.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-6.png")]
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

var GameHangar = function (slotLocationArray, hangarOutIndex, region, direction) {
    var obj = {};

    obj.slotLocationArray = slotLocationArray;
    obj.hangarOutIndex = hangarOutIndex;
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

                    var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("../Resources/InGame/plane-p" + (obj.region + 1) + ".png"));
                    sprite.interactive = true;
                    sprite.anchor.set(0.5);
                    var pos = obj.parent.getPathLocation(plane.region, plane.whereAmI, plane.nowRouteIndex);
                    sprite.position.set(pos.x, pos.y);
                    sprite.width = 32;
                    sprite.height = 32;
                    sprite.bindPlane = plane;

                    sprite.on("click", function () {
                        obj.parent.playerSelectPlane(this);
                    });

                    obj.parent.stage.addChild(sprite);
                    obj.parent.parent.containsAnimate.push(sprite);

                    plane.sprite = sprite;
                    obj.plane.push(plane);
                }
            }
        }
    };

    return obj;
};

var PlayerLogic = function () {
    var obj = {};

    obj.parent = null;
    obj.player = [null, null, null, null];
    obj.nowPlayer = -1;
    obj.logic = null;
    obj.stage = null;

    obj.getPathLocation = function (region, where, index) {
        switch (where) {
            case "hangar":
                for (var i = 0; i < obj.logic.hangar.length; i++) {
                    if (obj.logic.hangar[i].region == region) {
                        return obj.logic.hangar[i].slotLocationArray[index];
                    }
                }
                break;
            case "node":
                return obj.logic.route[index].location;
            case "end":
                for (var i = 0; i < obj.logic.end.length; i++) {
                    if (obj.logic.end[i].region == region) {
                        return obj.logic.end[i].nodeLocationArray[index];
                    }
                }
                break;
        }
    };

    //TODO 完善游戏开始部分
    obj.start = function () {
        console.log("run");

        var resultList = [0, 0, 0, 0];
        var spriteList = [];
        var posList = [new PIXI.Point(50, 50), new PIXI.Point(50, 100), new PIXI.Point(50, 150), new PIXI.Point(50, 200)];

        for (var i = 0; i < 4; i++) {
            resultList[i] = Utils.GenerateRandomNum(1, 6);

            var sprite = new PIXI.Sprite(Utils.DiceAnimate[0]);
            sprite.anchor.set(0.5);
            sprite.width = 45;
            sprite.height = 48;
            sprite.position.set(posList[i].x, posList[i].y);
            sprite.animate = switchAnimate(sprite, Utils.DiceAnimate, 25, true, Utils.NullFunc);
            sprite.diceValue = resultList[i];

            sprite.interactive = true;
            sprite.on("click", function () {
                console.log(this);
                this.animate = undefined;
                this.texture = Utils.DiceAnimate[this.diceValue];
            });

            obj.parent.containsAnimate.push(sprite);
            obj.stage.addChild(sprite);

            spriteList.push(sprite);
        }
    };

    obj.playerSelectPlane = function (planeSprite) {
        if (planeSprite.bindPlane.whereAmI == "hangar") {
            if (planeSprite.bindPlane.nowRouteIndex == 0) {
                for (var i = 0; i < obj.logic.hangar.length; i++) {
                    if (planeSprite.bindPlane.region == obj.logic.hangar[i].region) {
                        planeSprite.animate = moveAnimate(planeSprite, [obj.getPathLocation(null, "node", obj.logic.hangar[i].hangarOutIndex)], 15, function (e) {
                            e.sender.bindPlane.nowRouteIndex = e.complete;
                            e.sender.bindPlane.whereAmI = "node";
                            return true;
                        });
                        planeSprite.animate.complete = obj.logic.hangar[i].hangarOutIndex;
                    }
                }
            } else {
                planeSprite.animate = moveAnimate(planeSprite, [obj.getPathLocation(planeSprite.bindPlane.region, "hangar", 0)], 6, function (e) {
                    e.sender.bindPlane.nowRouteIndex = 0;
                    return true;
                });
            }
        }
        else if (planeSprite.bindPlane.whereAmI == "node") {
            var mov;
            while (true) {
                mov = Math.round(Math.random() * 6);
                if (mov > 0) {
                    break;
                }
            }

            if (mov > 0) {
                var path = [];
                var over = false;
                for (var i = planeSprite.bindPlane.nowRouteIndex + 1; i <= planeSprite.bindPlane.nowRouteIndex + mov; i++) {
                    if (i >= obj.logic.route.length) {
                        path.push(obj.getPathLocation(null, "node", i - obj.logic.route.length));
                        over = true;
                    } else {
                        path.push(obj.getPathLocation(null, "node", i));
                    }
                }

                planeSprite.animate = moveAnimate(planeSprite, path, 6, function (e) {
                    e.sender.bindPlane.nowRouteIndex = (over) ? planeSprite.bindPlane.nowRouteIndex + mov - obj.logic.route.length : planeSprite.bindPlane.nowRouteIndex + mov;
                    return true;
                });
            }
        }
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
    obj.containsAnimate = [];

    obj.gameStage.parentView = obj;

    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    obj.gameStage.addChild(background);

    var board = PIXI.Sprite.fromImage("../Resources/InGame/board.png");
    obj.gameStage.addChild(board);

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

    obj.gameStage.update = function () {
        for (var i = 0; i < obj.containsAnimate.length; i++) {
            if (!!obj.containsAnimate[i].animate) {
                obj.containsAnimate[i].animate.update();
            }
        }
    };

    return obj;
};