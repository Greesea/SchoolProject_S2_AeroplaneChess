/**
 * Created by Drake on 2015/4/6.
 */
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)
            return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.getElementByType = function (type) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].type && this[i].type == type) {
            return this[i];
        }
    }

    return null;
};

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

    obj.remove = function (name) {
        var index = -1;
        for (var i = 0; i < obj.list.length; i++) {
            if (obj.list[i].name == name) {
                index = i;
                break;
            }
        }

        obj.list.splice(index, 1);
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
        var rList = [];

        for (var i = 0; i < 9; i++) {
            var r = Math.random();
            while (true) {
                if (r > 0.4 && r < 0.6) {
                    r = Math.random();
                } else {
                    break;
                }
            }

            rList.push(Math.floor(r * (max + 1 - min) + min));
        }

        return rList[(Math.floor(Math.random() * 9))];

        //return Math.floor(r * (max + 1 - min) + min);
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

    DamageHit: function (view, region, whereAmI, index) {
        var onDamage = [];

        //查找被碰撞的飞机
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var nowPlane = view.playerLogic.player[i].plane[j];

                if (nowPlane) {
                    if (nowPlane.region != region && nowPlane.whereAmI == whereAmI && nowPlane.nowRouteIndex == index) {
                        onDamage.push(nowPlane);
                    }
                }
            }
        }

        //如果列表大于0
        if (onDamage.length > 0) {
            for (var i = 0; i < onDamage.length; i++) {
                var hangarSlot = Utils.GetFirstNullHangarSlot(view.gameLogic, onDamage[i].region);
                if (hangarSlot) {
                    hangarSlot.original.empty = false;
                    onDamage[i].sprite.animate = nodeMoveAnimate(onDamage[i].sprite, [hangarSlot], 6, Utils.NullFunc);
                }
            }
        }
    },

    GetFirstNullHangarSlot: function (logic, region) {
        var re = null;

        //查找对应的机库
        for (var i = 0; i < 4; i++) {
            if (logic.hangar[i].region == region) {
                for (var j = 1; j < 5; j++) {
                    if (logic.hangar[i].slotLocationArray[j].empty) {
                        re = {};
                        re.original = logic.hangar[i].slotLocationArray[j];
                        re.position = logic.hangar[i].slotLocationArray[j].clone();
                        re.whereAmI = "hangar";
                        re.direction = logic.hangar[i].direction;
                        re.region = region;
                        re.index = j;
                        break;
                    }
                }
            }
        }

        return re;
    },

    EndFunc: function (e) {
        var plane = e.sender.bindPlane;
        plane.parent.parent.stage.removeChild(e.sender);
        plane.parent.plane.remove(plane);
        plane.parent.completeCount++;
        plane.parent.parent.updateLeftPanel();

        if (plane.parent.completeCount == 4) {
            plane.parent.parent.gameOver(plane.region);
        }

        e.sender.bindPlane.parent.parent.nextPlayer();
    },

    moveFunc: function (e, state) {
        switch (state) {
            case "{six}":
                e.sender.bindPlane.parent.parent.displayDice();
                break;
            case "{six}{end}":
                Utils.EndFunc(e);
                e.sender.bindPlane.parent.parent.displayDice();
                break;
            case "{end}":
                Utils.EndFunc(e);
                break;
            case "{next}":
                e.sender.bindPlane.parent.parent.nextPlayer();
                break;
        }
    }
};

var Region = {
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
    obj.parent = null;

    return obj;
};

var GamePlayer = function (region, isAI) {
    var obj = {};

    obj.parent = null;
    obj.plane = [];
    obj.region = region;
    obj.isAI = isAI;
    obj.completeCount = 0;

    return obj;
};

var PlayerLogic = function () {
    var obj = {};

    obj.parent = null;
    obj.player = [null, null, null, null];
    obj.nowPlayer = -1;
    obj.logic = null;
    obj.stage = null;
    obj.leftPanel = null;
    obj.dice = null;

    obj.getNode = function (region, where, index) {
        //根据位置查找节点
        switch (where) {
            case "node":
                var v = {};
                v.original = obj.logic.route[index];
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
                        v.original = obj.logic.hangar[i];
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
                        v.original = obj.logic.end[i];
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

    obj.start = function () {
        //初始化骰子
        obj.dice = new PIXI.Sprite(Utils.DiceAnimate[0]);
        obj.dice.anchor.set(0.5);
        obj.dice.width = 45;
        obj.dice.height = 48;
        obj.dice.position.set(450, 300);
        obj.parent.containsAnimate.push(obj.dice);
        obj.dice.on("click", obj.diceClick);

        //获取左栏元素
        obj.leftPanel = [null, null, null, null];

        for (var i = 0; i < obj.parent.leftPanel.children.length; i++) {
            if (!!obj.parent.leftPanel.children[i].type) {
                if (obj.parent.leftPanel.children[i].type == "leftPanelContainer") {
                    obj.leftPanel[obj.parent.leftPanel.children[i].region] = obj.parent.leftPanel.children[i];
                }
            }
        }

        //设置非AI玩家对应的左栏元素文本
        for (var i = 0; i < 4; i++) {
            if (!obj.player[i].isAI) {
                obj.leftPanel[i].children.getElementByType("leftPanelItemTitleText").text = "             人类";
            }
        }

        //开始逻辑
        obj.nowPlayer = Utils.GenerateRandomNum(0, 3);
        obj.leftPanel[obj.nowPlayer].children.getElementByType("leftPanelItemBG").swapStatus(true);

        obj.displayDice();
    };

    obj.gameOver = function (e) {
        obj.nextPlayer = Utils.NullFunc;
        obj.displayDice = Utils.NullFunc;
        obj.diceClick = Utils.NullFunc;
        obj.planeCanClick = Utils.NullFunc;

        var container = new PIXI.Container();

        var msgBG = PIXI.Sprite.fromImage("../Resources/InGame/message-bg.png");
        msgBG.position.set(250, 250);
        container.addChild(msgBG);

        var text = new PIXI.Text("游戏结束 玩家" + (e + 1) + "胜利");
        text.position.set(330, 260);
        container.addChild(text);

        var btn = new PIXI.Sprite(PIXI.Texture.fromImage("../Resources/InGame/backBtn-bg.png"));
        btn.position.set(390, 300);
        btn.interactive = true;
        btn.buttonMode = true;
        btn.on("click", function () {
            stages.remove("game");
            nowStage = stages.getStageByName("mainmenu");
            GameInitializeGameStage();
        });
        container.addChild(btn);

        obj.stage.addChild(container);
    };

    obj.nextPlayer = function () {
        if (++obj.nowPlayer >= 4) {
            obj.nowPlayer = 0;
        }

        for (var i = 0; i < 4; i++) {
            if (i == obj.nowPlayer) {
                obj.leftPanel[i].children.getElementByType("leftPanelItemBG").swapStatus(true);
            } else {
                obj.leftPanel[i].children.getElementByType("leftPanelItemBG").swapStatus(false);
            }
        }

        obj.displayDice();
    };

    obj.displayDice = function () {
        obj.dice.animate = switchAnimate(obj.dice, Utils.DiceAnimate, 25, true, Utils.NullFunc);
        obj.stage.addChild(obj.dice);

        if (obj.player[obj.nowPlayer].isAI) {
            obj.dice.interactive = false;
            obj.dice.buttonMode = false;
            setTimeout(function () {
                obj.diceClick();
            }, 2000);
        } else {
            obj.dice.interactive = true;
            obj.dice.buttonMode = true;
        }

    };

    obj.diceClick = function () {
        //清除动画并设置骰子的数字
        obj.dice.animate = undefined;
        obj.dice.interactive = false;
        obj.dice.buttonMode = false;
        obj.dice.random = Utils.GenerateRandomNum(1, 6);
        obj.dice.texture = Utils.DiceAnimate[obj.dice.random - 1];

        //取消所有飞机可点击
        for (var i = 0; i < 4; i++) {
            obj.planeCanClick(obj.player[i].plane, false);
        }

        //检索是否有非6点可以移动的飞机
        var outsidePlane = [];
        for (var i = 0; i < 4; i++) {
            if (obj.player[obj.nowPlayer].plane[i]) {
                if (obj.dice.random != 6) {
                    if (obj.player[obj.nowPlayer].plane[i].whereAmI == "hangar" && obj.player[obj.nowPlayer].plane[i].nowRouteIndex > 0) {
                        continue;
                    }
                }
                outsidePlane.push(obj.player[obj.nowPlayer].plane[i]);
            }
        }

        //判断是否是AI
        if (obj.player[obj.nowPlayer].isAI) {
            setTimeout(function () {
                if (outsidePlane.length > 0) {//非6可移动飞机数量>0
                    obj.movePlane(outsidePlane[0], obj.dice.random);
                } else if (obj.dice.random == 6) {//点数==6
                    obj.movePlane(obj.player[obj.nowPlayer].plane[0], obj.dice.random);
                } else {//换下一个
                    obj.nextPlayer();
                }
            }, 2000);
        } else {
            if (outsidePlane.length > 0 || obj.dice.random == 6) {//如果非6可移动飞机数量>0或者点数==6
                obj.planeCanClick(outsidePlane, true);
            } else {
                setTimeout(obj.nextPlayer, 2000);
            }
        }
    };

    obj.planeCanClick = function (objArray, bool) {
        for (var i = 0; i < objArray.length; i++) {
            if (objArray[i]) {
                objArray[i].sprite.interactive = bool;
                objArray[i].sprite.buttonMode = bool;
            }
        }
    };

    obj.playerSelectPlane = function (planeSprite) {
        obj.planeCanClick(obj.player[obj.nowPlayer].plane, false);
        obj.movePlane(planeSprite.bindPlane, obj.dice.random);
    };

    obj.updateLeftPanel = function () {
        if (obj.leftPanel) {
            for (var i = 0; i < 4; i++) {
                obj.leftPanel[i].children.getElementByType("leftPanelItemCounterText").text = obj.player[i].completeCount;
            }
        }
    };

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
                hangar.slotLocationArray[j + 1].empty = false;

                var plane = new GamePlane(j + 1, "hangar", hangar.direction, obj.player[i].region);
                plane.hangar = hangar;
                plane.parent = obj.player[i];

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
        obj.stage.removeChild(obj.dice);

        var state = (moveCount == 6) ? "{six}" : "{next}";
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

                plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, state, Utils.moveFunc);
            } else if (moveCount == 6) {
                var original = obj.getNode(plane.region, "hangar", plane.nowRouteIndex).original;
                original.slotLocationArray[plane.nowRouteIndex].empty = true;
                plane.sprite.animate = nodeMoveAnimate(plane.sprite, [obj.getNode(plane.region, "hangar", 0)], 6, state, Utils.moveFunc);
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

                    if (nodes[nodes.length - 1].index == 5) {
                        state += "{end}";
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

                if (nodes[nodes.length - 1].index == 5) {
                    state += "{end}";
                }
            }

            plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, state, Utils.moveFunc);
        } else if (plane.whereAmI == "end") {
            var times = 0;
            var nowIndex = plane.nowRouteIndex + 1;
            var reverse = false;
            var end = false;

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
                        end = true;
                    }
                    break;
                }
            }

            if (end)
                state = "{end}";
            plane.sprite.animate = nodeMoveAnimate(plane.sprite, nodes, 6, state, Utils.moveFunc);
        }

        function nodeJump(plane, node, nodeArray) {
            node.hit = obj.parent;

            if (node.region == plane.region && node.goForward) {
                if (node.goForward.isJump) {
                    node.direction = node.goForward.jumpDirection;
                    var endHit = obj.getNode(node.goForward.jumpHitRegion, "end", 2);
                    endHit.direction = null;
                    endHit.hit = obj.parent;
                    nodeArray.push(endHit);
                    var jumpEnd = obj.getNode(null, "node", node.goForward.goTo);
                    jumpEnd.hit = obj.parent;
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
                        nodes[nodes.length - 1].hit = obj.parent;

                        if (nodes[nodes.length - 1].endTo && nodes[nodes.length - 1].region == plane.region)
                            nodes[nodes.length - 1].direction = obj.getNode(plane.region, "end", 0).direction;

                        if (nodes[nodes.length - 1].goForward && nodes[nodes.length - 1].goForward.isJump)
                            nodeJump(plane, nodes[nodes.length - 1], nodes);
                    }
                }
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
        var sp = new PIXI.Sprite(Utils.PanelPlayerBG_cover[i]);
        sp.type = "leftPanelItemBG";
        sp.index = i;
        sp.state = false;
        sp.position.set(0, 100 * i);
        sp.swapStatus = function () {
            if (this.state) {
                this.texture = Utils.PanelPlayerBG_cover[this.index];
                this.state = false;
            } else {
                this.texture = Utils.PanelPlayerBG[this.index];
                this.state = true;
            }
        };
        sp.swapStatus = function (bool) {
            if (bool) {
                this.texture = Utils.PanelPlayerBG[this.index];
            } else {
                this.texture = Utils.PanelPlayerBG_cover[this.index];
            }
            this.state = bool;
        };
        container.addChild(sp);

        var title = new PIXI.Text("玩家" + (i + 1) + "：");
        title.style.font = "bold 14pt Arial";
        title.anchor.set(0, 0);
        title.position.set(5, 10 + (i * 100));
        container.addChild(title);

        var text = new PIXI.Text("电脑(简单的)");
        text.type = "leftPanelItemTitleText";
        text.style.font = "bold 14pt Arial";
        text.anchor.set(0, 0);
        text.position.set(5, 30 + (i * 100));
        container.addChild(text);

        var counterTitle = new PIXI.Text("完成数：");
        counterTitle.style.font = "bold 14pt Arial";
        counterTitle.anchor.set(0, 0);
        counterTitle.position.set(5, 60 + (i * 100));
        container.addChild(counterTitle);

        var counter = new PIXI.Text("0");
        counter.type = "leftPanelItemCounterText";
        counter.style.font = "bold 14pt Arial";
        counter.anchor.set(0, 0);
        counter.position.set(80, 60 + (i * 100));
        container.addChild(counter);

        obj.leftPanel.addChild(container);
    }

    obj.gameStage.addChild(obj.leftPanel);
    /*==================初始化左栏==================*/

    obj.start = function () {
        var container = new PIXI.Container();

        var selectBG = PIXI.Sprite.fromImage("../Resources/InGame/message-bg.png");
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