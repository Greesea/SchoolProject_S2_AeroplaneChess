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
        setInterval(function () {
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