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

    /**
     * @return {number}
     */
    GenerateRandomNum: function (min, max) {
        var r = Math.random();
        while (true) {
            if (r > 0.4 && r < 0.6) {
                r = Math.random();
            } else {
                break;
            }
        }

        return Math.floor(r * (max + 1 - min) + min);
    },

    DiceAnimate: [],

    PlaneIcons: [],

    PanelPlayerBG: [],

    /**
     * @return {number}
     */
    Radians2Degree: function (radians) {
        return 180 / Math.PI * radians;
    },

    /**
     * @return {number}
     */
    Degree2Radians: function (degree) {
        return Math.PI / 180 * degree;
    },

    GeneratePerMove: function (startPoint, endPoint, speed, an) {
        return new PIXI.Point(speed * (-(Math.cos(Math.atan2(startPoint.x - endPoint.x, startPoint.y - endPoint.y) - an))), speed * (Math.sin(Math.atan2(startPoint.x - endPoint.x, startPoint.y - endPoint.y) - an)));
    },

    /**
     * @return {boolean}
     */
    ComparePoint: function (pointA, pointB, deviation, speed) {
        return (Math.abs(pointA.x - pointB.x) <= (deviation * speed) && Math.abs(pointA.y - pointB.y) <= (deviation * speed))
    },

    //TODO 碰撞判定与动作
    DamageHit: function (logic, sender, where, index) {
        //console.log("hit");
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

var GameRouteEnd = function (nodeLocationArray, region, direction) {
    var obj = {};

    obj.nodeLocationArray = nodeLocationArray;
    obj.region = region;
    obj.direction = direction;

    return obj;
};

var GameRouteJump = function (goTo, isJump, jumpHitRegion, jumpDirection) {
    var obj = {};

    obj.goTo = goTo;
    obj.isJump = isJump;
    obj.jumpHitRegion = jumpHitRegion;
    obj.jumpDirection = jumpDirection;

    return obj;
};

var GameHangar = function (slotLocationArray, hangarOutIndex, region, direction, outDirection) {
    var obj = {};

    obj.slotLocationArray = slotLocationArray;
    obj.hangarOutIndex = hangarOutIndex;
    obj.region = region;
    obj.direction = direction;
    obj.outDirection = outDirection;

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

var GamePlayer = function (region, isAI) {
    var obj = {};

    obj.parent = null;
    obj.plane = [];
    obj.region = region;
    obj.isAI = isAI;

    return obj;
};

var PlayerLogic = function () {
    var obj = {};

    obj.parent = null;
    obj.player = [null, null, null, null];
    obj.nowPlayer = -1;
    obj.logic = null;
    obj.stage = null;

    obj.getNode = function (region, where, index) {
        //根据位置查找节点
        switch (where) {
            case "node":
                var v = {};
                v.position = obj.logic.route[index].location.clone();
                v.direction = obj.logic.route[index].direction;
                v.goForward = (!obj.logic.route[index].goForward) ? null : new GameRouteJump(obj.logic.route[index].goForward.goTo, obj.logic.route[index].goForward.isJump, obj.logic.route[index].goForward.jumpHitRegion, obj.logic.route[index].goForward.jumpDirection);
                v.region = obj.logic.route[index].region;
                v.endTo = obj.logic.route[index].endTo;
                v.whereAmI = "node";
                v.index = index;
                return v;
            case "hangar":
                var v = undefined;
                for (var i = 0; i < obj.logic.hangar.length; i++) {
                    if (obj.logic.hangar[i].region == region) {
                        v = {};
                        v.position = obj.logic.hangar[i].slotLocationArray[index].clone();
                        v.whereAmI = "hangar";
                        if (index == 0) {
                            v.direction = obj.logic.hangar[i].outDirection;
                        } else {
                            v.direction = obj.logic.hangar[i].direction;
                        }
                        v.region = obj.logic.hangar[i].region;
                        v.index = index;
                        break;
                    }
                }
                return v;
            case "end":
                var v = undefined;
                for (var i = 0; i < obj.logic.end.length; i++) {
                    if (obj.logic.end[i].region == region) {
                        v = {};
                        v.position = obj.logic.end[i].nodeLocationArray[index].clone();
                        v.whereAmI = "end";
                        v.direction = obj.logic.end[i].direction;
                        v.region = obj.logic.end[i].region;
                        v.index = index;
                        break;
                    }
                }
                return v;
        }
    };

    //TODO 游戏逻辑开始
    obj.start = function () {
        //获取左栏元素
        var leftPanelContainers = [null, null, null, null];

        for (var i = 0; i < obj.parent.leftPanel.children.length; i++) {
            if (!!obj.parent.leftPanel.children[i].type) {
                if (obj.parent.leftPanel.children[i].type == "leftPanelContainer") {
                    leftPanelContainers[obj.parent.leftPanel.children[i].region] = obj.parent.leftPanel.children[i];
                }
            }
        }

        //设置非AI玩家对应的左栏元素文本
        for (var i = 0; i < 4; i++) {
            if (!obj.player[i].isAI) {
                leftPanelContainers[i].children[1].text = "玩家：人";
            }
        }

        obj.nowPlayer = Utils.GenerateRandomNum(1, 4);
        obj.nowPlayer = 0;
        gameLoop();


        //console.log("run");

        //var resultList = [0, 0, 0, 0];
        //var spriteList = [];
        //var posList = [new PIXI.Point(50, 50), new PIXI.Point(50, 100), new PIXI.Point(50, 150), new PIXI.Point(50, 200)];

        //for (var i = 0; i < 4; i++) {
        //    resultList[i] = Utils.GenerateRandomNum(1, 6);

        //    var sprite = new PIXI.Sprite(Utils.DiceAnimate[0]);
        //    sprite.anchor.set(0.5);
        //    sprite.width = 45;
        //    sprite.height = 48;
        //    sprite.position.set(posList[i].x, posList[i].y);
        //    sprite.animate = switchAnimate(sprite, Utils.DiceAnimate, 25, true, Utils.NullFunc);
        //    sprite.diceValue = resultList[i];

        //    sprite.interactive = true;
        //    sprite.on("click", function () {
        //        console.log(this);
        //        this.animate = undefined;
        //        this.texture = Utils.DiceAnimate[this.diceValue];
        //    });

        //    obj.parent.containsAnimate.push(sprite);
        //    obj.stage.addChild(sprite);

        //    spriteList.push(sprite);
        //}
    };

    function gameLoop() {
        for (var i = 0; i < obj.player[obj.nowPlayer].plane.length; i++) {
            obj.player[obj.nowPlayer].plane[i].sprite.interactive = true;
            obj.player[obj.nowPlayer].plane[i].sprite.buttonMode = true;
            if (!obj.player[obj.nowPlayer].isAI) {
                obj.player[obj.nowPlayer].plane[i].sprite.interactive = true;
                obj.player[obj.nowPlayer].plane[i].sprite.buttonMode = true;
            } else {

            }
        }
    }

    obj.createPlanes = function () {
        for (var i = 0; i < 4; i++) {//遍历玩家
            var hangar = null;

            for (var j = 0; j < 4; j++) {//遍历机库
                if (obj.logic.hangar[j].region == obj.player[i].region) {
                    hangar = obj.logic.hangar[j];
                    break;
                }
            }

            for (var j = 0; j < 4; j++) {//创建飞机
                var plane = new GamePlane(j + 1, "hangar", hangar.direction, obj.player[i].region);
                plane.hangar = hangar;

                var sprite = new PIXI.Sprite(Utils.PlaneIcons[i]);
                sprite.anchor.set(0.5);
                var pos = obj.getNode(plane.region, plane.whereAmI, plane.nowRouteIndex).position;
                sprite.position.set(pos.x, pos.y);
                sprite.width = 32;
                sprite.height = 32;
                sprite.bindPlane = plane;
                sprite.rotation = Utils.Degree2Radians(hangar.direction);

                sprite.on("click", function () {
                    obj.playerSelectPlane(this);
                });

                obj.stage.addChild(sprite);
                obj.parent.containsAnimate.push(sprite);

                plane.sprite = sprite;
                obj.player[i].plane.push(plane);
            }
        }
    };

    obj.movePlane = function (plane, moveCount) {
        var nodes = [];
        if (plane.whereAmI == "hangar") {
            if (plane.nowRouteIndex == 0) {//当飞机正在机场出口时
                var startIndex = plane.hangar.hangarOutIndex;

                for (var i = 0; i < moveCount; i++) {
                    var nodeIndex = startIndex + i;
                    if (nodeIndex >= obj.logic.route.length) {
                        nodeIndex -= obj.logic.route.length;
                    }

                    var node = obj.getNode(null, "node", nodeIndex);
                    nodes.push(node);
                }

                nodeJump(plane, nodes[nodes.length - 1], nodes);

                plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, Utils.NullFunc);
            } else if (moveCount <= 6) {
                plane.sprite.animate = nodeMoveAnimate(plane.sprite, [obj.getNode(plane.region, "hangar", 0)], 6, Utils.NullFunc);
            }
        } else if (plane.whereAmI == "node") {//当飞机在棋盘中
            var nowIndex = plane.nowRouteIndex;
            var turnToEnd = 0;
            var nowNode = obj.getNode(null, "node", nowIndex);

            if (!(nowNode.endTo && nowNode.region == plane.region)) {
                for (var i = 1; i <= moveCount; i++) {
                    nowIndex = plane.nowRouteIndex + i;
                    if (nowIndex >= obj.logic.route.length) {
                        nowIndex -= obj.logic.route.length;
                    }

                    var n = obj.getNode(null, "node", nowIndex);
                    nodes.push(n);

                    if (n.endTo && n.region == plane.region) {//如果下一个坐标点转向结束
                        //设置turnToEnd为当前移动第几步并跳出循环
                        turnToEnd = i;
                        break;
                    }
                }

                if (turnToEnd) {
                    nodes[nodes.length - 1].direction = obj.getNode(plane.region, "end", 0).direction;//设置转向
                    for (var i = 0; i < moveCount - turnToEnd; i++) {
                        var n = obj.getNode(plane.region, "end", i);
                        nodes.push(n);
                    }
                }

                if (!turnToEnd) {
                    nodeJump(plane, nodes[nodes.length - 1], nodes);
                }
            } else {
                for (var i = 0; i < moveCount; i++) {
                    var n = obj.getNode(plane.region, "end", i);
                    nodes.push(n);
                }
            }

            plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, Utils.NullFunc);
        } else if (plane.whereAmI == "end") {
            var times = 0;
            var nowIndex = plane.nowRouteIndex + 1;
            var reverse = false;
            while (true) {
                if (nowIndex > 5) {
                    nowIndex -= 2;
                    reverse = true;
                }

                var n = obj.getNode(plane.region, "end", nowIndex);
                nodes.push(n);

                if (reverse) {
                    nowIndex--;
                } else {
                    nowIndex++;
                }
                if (++times == moveCount) {
                    if (nodes[nodes.length - 1].index == 5) {
                        //TODO 抵达终点后
                        plane.complete = true;
                        plane.sprite.interactive = false;
                        plane.sprite.buttonMode = false;
                    }
                    break;
                }
            }

            plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, Utils.NullFunc);
        }

        function nodeJump(plane, node, nodeArray) {
            node.hit = obj.logic;

            if (node.region == plane.region && node.goForward) {
                if (node.goForward.isJump) {
                    node.direction = node.goForward.jumpDirection;
                    var endHit = obj.getNode(node.goForward.jumpHitRegion, "end", 2);
                    endHit.direction = null;
                    endHit.hit = obj.logic;
                    nodeArray.push(endHit);
                    var jumpEnd = obj.getNode(null, "node", node.goForward.goTo);
                    jumpEnd.hit = obj.logic;
                    nodeArray.push(jumpEnd);
                    nodeJump(plane, jumpEnd, nodeArray);
                } else {
                    var max = -1;
                    if (node.index > node.goForward.goTo) {
                        max = node.goForward.goTo + obj.logic.route.length - node.index;
                    } else {
                        max = node.goForward.goTo - node.index;
                    }

                    if (max > 0) {
                        var nowIndex = node.index;
                        for (var i = 1; i <= max; i++) {
                            nowIndex = node.index + i;
                            if (nowIndex >= obj.logic.route.length) {
                                nowIndex -= obj.logic.route.length;
                            }

                            var n = obj.getNode(null, "node", nowIndex);
                            nodes.push(n);
                        }
                        nodes[nodes.length - 1].hit = obj.logic;

                        if (nodes[nodes.length - 1].endTo && nodes[nodes.length - 1].region == plane.region)
                            nodes[nodes.length - 1].direction = obj.getNode(plane.region, "end", 0).direction;
                    }
                }
            }
        }
    };

    obj.playerSelectPlane = function (planeSprite) {
        var random = Utils.GenerateRandomNum(1, 6);
        console.log(random);
        obj.movePlane(planeSprite.bindPlane, random);
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
    obj.leftPanel = null;

    obj.gameStage.parentView = obj;

    //初始化背景
    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    obj.gameStage.addChild(background);

    //初始化棋盘
    var board = PIXI.Sprite.fromImage("../Resources/InGame/board.png");
    obj.gameStage.addChild(board);

    /*==================初始化左栏==================*/
    obj.leftPanel = new PIXI.Container();
    //左栏背景
    var panelBG = PIXI.Sprite.fromImage("../Resources/Ingame/leftPanel.png");
    panelBG.position.set(0, 0);
    obj.leftPanel.addChild(panelBG);

    //左栏元素
    for (var i = 0; i < 4; i++) {
        var container = new PIXI.Container();
        container.type = "leftPanelContainer";
        container.region = i;

        //左栏元素背景
        var sp = new PIXI.Sprite(Utils.PanelPlayerBG[i]);
        sp.type = "leftPanelItemBG";
        sp.position.set(0, 100 * (i + 1));
        container.addChild(sp);

        var text = new PIXI.Text("玩家：AI");
        sp.type = "leftPanelItemText";
        text.position.set(20, 30 + (i * 100));

        container.addChild(text);

        obj.leftPanel.addChild(container);
    }

    obj.gameStage.addChild(obj.leftPanel);
    /*==================初始化左栏==================*/

    //TODO 游戏开始
    obj.start = function () {
        var container = new PIXI.Container();

        var selectBG = PIXI.Sprite.fromImage("../Resources/InGame/selectplayerslot.png");
        selectBG.position.set(250, 250);
        container.addChild(selectBG);

        var text = new PIXI.Text("请选择一个颜色(位置)");
        text.position.set(320, 260);
        container.addChild(text);

        for (var i = 0; i < 4; i++) {
            var sp = new PIXI.Sprite(Utils.PlaneIcons[i]);
            sp.position.set(300 + (i * 90), 300);
            sp.interactive = true;
            sp.buttonMode = true;
            sp.region = i;
            sp.on("click", onSelect);
            container.addChild(sp);
        }

        obj.gameStage.addChild(container);

        function onSelect() {
            obj.gameStage.removeChild(this.parent);
            obj.playerLogic.player[this.region].isAI = false;
            obj.playerLogic.start();
        }
    };

    obj.bindObjParent = function () {
        obj.playerLogic.parent = obj;
        obj.playerLogic.logic = obj.gameLogic;
        obj.playerLogic.stage = obj.gameStage;
    };

    obj.bindObjParent();

    obj.playerLogic.createPlanes();

    obj.gameStage.update = function () {
        for (var i = 0; i < obj.containsAnimate.length; i++) {
            if (!!obj.containsAnimate[i].animate) {
                obj.containsAnimate[i].animate.update();
            }
        }
    };

    return obj;
};