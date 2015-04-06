/**
 * Created by Drake on 2015/3/19.
 */

/**
 * 场景管理器
 * @param gameMenu 初始菜单
 * @returns {{}}
 * @constructor
 */
var Game = function (gameMenu) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "Game";

    /**
     * 正在渲染的菜单
     */
    obj.Menu = gameMenu;

    obj.Running = null;

    /**
     * 菜单切换
     */
    var swapMenu;

    /**
     * 切换状态
     */
    var nowSwaping;

    //-----时间计时
    var time;

    /**
     * 切换菜单
     * @param menu
     * @constructor
     */
    obj.SwapToMenu = function (menu) {
        //  !!menu等效menu!=undefined && menu!=null
        //  !! = 强制转换成bool
        //  过程：
        //  menu!=undefined && menu!=null
        //  menu==(!!undefined)&&menu==(!!null)
        //  menu==true&&menu==true
        //  !!menu
        if (!nowSwaping && !!menu) {
            swapMenu = menu;
            nowSwaping = true;
            gameMenu.ClearControlState();

            //-----时间计时
            time = new Date();

            swapMenu.Location = new Location(700, 0);
        }
    };

    /**
     * 开始游戏
     * @constructor
     */
    obj.GameStart = function () {
        obj.Running = setInterval(function () {
            gameArea.clearRect(0, 0, 600, 480);

            if (nowSwaping) {
                gameMenu.Location = new Location(gameMenu.X() - 8, gameMenu.Y());
            }

            gameMenu.Draw();

            if (nowSwaping) {
                swapMenu.Location = new Location(swapMenu.X() - 8, swapMenu.Y());
                if (swapMenu.X() <= 0) {
                    gameMenu = swapMenu;
                    gameMenu.Location = new Location(0, 0);
                    swapMenu = undefined;
                    nowSwaping = false;

                    if (gameMenu.Type == "GameViewer") {
                        gameMenu.GameState = true;
                    }

                    console.log("swapComplete");

                    //-----时间计时
                    var endTime = new Date();
                    $("#output").html(endTime - time);
                    //-----

                    gameMenu.Draw();
                } else {
                    swapMenu.Draw();
                }
            }

            mouseInput.ClearClickState();
        }, (1000 / 100));
    };

    obj.StopGame = function () {
        if (!!obj.Running) {
            clearInterval(obj.Running);
            obj.Running = null;
            console.log("[game stop]")
        }
    };

    return obj;
};

/**
 * 游戏选单
 * @param controls 控件列表
 * @param background 背景(Image or 颜色字符串)
 * @returns {{}}
 * @constructor
 */
var GameMenu = function (controls, background) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "GameMenu";

    /**
     * 控件列表
     */
    obj.Controls = controls;

    /**
     * 背景(Image or 颜色字符串)
     */
    obj.Background = background;

    /**
     * 坐标
     * @type {Location}
     */
    obj.Location = new Location(0, 0);

    /**
     * 现在悬停
     */
    var nowHover;

    /**
     * 现在按下
     */
    var nowPress;

    /**
     * 横坐标
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location.X;
    };

    /**
     * 纵坐标
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location.Y;
    };

    /**
     * 排列控件深度(在对控件列表进行添加删除或修改了控件的深度之后调用本方法来应用正确的渲染深度)
     * @constructor
     */
    obj.SortControls = function () {
        Utils.SortByZindex(obj.Controls, true);
    };

    /**
     * 绑定数组里所有控件的父级对象为本菜单
     * @constructor
     */
    obj.BindAllParent = function () {
        for (var i = 0; i < obj.Controls.length; i++) {
            obj.Controls[i].Parent = this;
        }
    };

    /**
     * 清除控件状态(比如展开的DropdownBox)
     * @constructor
     */
    obj.ClearControlState = function () {
        for (var i = 0; i < obj.Controls.length; i++) {
            if (obj.Controls[i].Type == "DropdownBox") {
                obj.Controls[i].isOpen = false;
            }
        }
    };

    /**
     * 设置悬停对象
     * @param hover
     */
    obj.setHover = function (hover) {
        nowHover = hover;
    };

    /**
     * 设置按下对象
     * @param press
     */
    obj.setPress = function (press) {
        nowPress = press;
    };

    /**
     * 绘制
     * @constructor
     */
    obj.Draw = function () {
        Utils.InputEventTrigger(obj.Controls, nowHover, nowPress, obj.setHover, obj.setPress);

        if (obj.Background instanceof Image) {
            gameArea.drawImage(obj.Background, this.X(), this.Y());
        } else {
            gameArea.fillStyle = obj.Background;
            gameArea.fillRect(this.X(), this.Y(), 700, 480);
        }

        for (var i = 0; i < obj.Controls.length; i++) {
            if (obj.Controls[i].Update != undefined)
                obj.Controls[i].Update();
            obj.Controls[i].Draw();
        }
    };

    obj.SortControls();
    obj.BindAllParent();

    return obj;
};

/**
 * 游戏逻辑处理
 * @param routeArray 节点集
 * @param goalArray 终点集
 * @param pairArray 通道集
 * @param playerArray 玩家集
 * @returns {{}}
 * @constructor
 */
var GameLogic = function (routeArray, goalArray, pairArray, playerArray) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "GameLogic";

    /**
     * 路径集
     */
    obj.Routes = routeArray;

    /**
     * 终点路线集
     */
    obj.Goals = goalArray;

    /**
     * 通道配对集
     */
    obj.Pair = pairArray;

    /**
     * 玩家集
     */
    obj.Players = playerArray;

    /**
     * 坐标
     * @type {Location}
     */
    obj.Location = new Location(0, 0);

    /**
     * 横坐标
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location.X;
    };

    /**
     * 纵坐标
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location.Y;
    };

    /**
     * 绑定所有控件的父元素
     * @constructor
     */
    obj.BindAllParent = function () {
        for (var i = 0; i < obj.Routes.length; i++) {
            obj.Routes[i].Parent = this;
        }
        for (var i = 0; i < obj.Goals.length; i++) {
            obj.Goals[i].Parent = this;
        }
        for (var i = 0; i < obj.Players.length; i++) {
            obj.Players[i].Parent = this;
        }
    };

    obj.Draw = function () {
        for (var i = 0; i < obj.Players.length; i++) {
            obj.Players[i].Draw();
        }
    };

    obj.ThrowDice = function () {
        
    };

    obj.BindAllParent();

    return obj;
};

/**
 * 玩家
 * @param parent 父元素(GameLogic)
 * @param hangar 机库
 * @param planeArray 飞机集
 * @returns {{}}
 * @constructor
 */
var Player = function (parent, hangar, planeArray) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "Player";

    /**
     * 父元素
     */
    obj.Parent = parent;

    /**
     * 机库
     */
    obj.Hangar = hangar;

    /**
     * 飞机集
     */
    obj.Planes = planeArray;

    /**
     * 现在悬停
     */
    var nowHover;

    /**
     * 现在按下
     */
    var nowPress;

    obj.AnimateList = [];

    /**
     * 绑定所有控件的父元素
     * @constructor
     */
    obj.BindAllParent = function () {
        for (var i = 0; i < obj.Hangar.length; i++) {
            obj.Hangar[i].Parent = this;
        }
        for (var i = 0; i < obj.Planes.length; i++) {
            obj.Planes[i].Parent = this;
        }
    };

    obj.RemoveEndedAnimate = function () {
        var arr = [];

        for (var i = 0; i < obj.AnimateList.length; i++) {
            if (!obj.AnimateList[i].IsEnded) {
                arr.push(obj.AnimateList[i]);
            }
        }

        obj.AnimateList = arr;
    };

    /**
     * 设置悬停对象
     * @param hover
     */
    obj.setHover = function (hover) {
        nowHover = hover;
    };

    /**
     * 设置按下对象
     * @param press
     */
    obj.setPress = function (press) {
        nowPress = press;
    };

    obj.Draw = function () {
        Utils.InputEventTrigger(obj.Planes, nowHover, nowPress, obj.setHover, obj.setPress);
        obj.RemoveEndedAnimate();

        for (var i = 0; i < obj.AnimateList.length; i++) {
            obj.AnimateList[i].Update();
        }

        for (var i = 0; i < obj.Planes.length; i++) {
            obj.Planes[i].Draw();
        }
    };

    obj.BindAllParent();

    for (var i = 0; i < obj.Planes.length; i++) {
        obj.Planes[i].Location = obj.Hangar.Nodes[i].Location();
    }

    return obj;
};

var Animate = function (parent, plane, startLoc, endLoc, callbackFunc) {
    var obj = {};
    obj.Type = "Animate";

    obj.Plane = plane;

    obj.Loc = startLoc;

    obj.EndLoc = endLoc;

    obj.IsEnded = false;

    obj.Callback = callbackFunc;

    obj.Update = function () {
        if (obj.Loc.X > obj.EndLoc.X) {
            obj.Loc.X -= 1;
        } else if (obj.Loc.X < obj.EndLoc.X) {
            obj.Loc.X += 1;
        }

        if (obj.Loc.Y > obj.EndLoc.Y) {
            obj.Loc.Y -= 1;
        } else if (obj.Loc.Y < obj.EndLoc.Y) {
            obj.Loc.Y += 1;
        }

        obj.Plane.Location = obj.Loc;

        if (obj.Loc.X == obj.EndLoc.X && obj.Loc.Y == obj.EndLoc.Y) {
            if (!obj.Callback(obj)) {
                obj.IsEnded = true;
            }
        }
    }

};

var GameViewer = function (logic, boardImage, boardLocation) {
    var obj = {};
    obj.Type = "GameViewer";

    obj.GameLogic = logic;

    obj.BoardImage = boardImage;

    obj.BoardLocation = boardLocation;

    obj.GameState = false;

    /**
     * 坐标
     * @type {Location}
     */
    obj.Location = new Location(0, 0);

    /**
     * 横坐标
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location.X;
    };

    /**
     * 纵坐标
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location.Y;
    };

    /**
     * 绘制
     * @constructor
     */
    obj.Draw = function () {
        if (obj.GameState) {
            if (!!obj.BoardImage && !!obj.BoardLocation) {
                gameArea.drawImage(obj.BoardImage, obj.BoardLocation.X, obj.BoardLocation.Y);
            }

            obj.GameLogic.Draw();
        }
    };

    return obj;
};