/**
 * Created by Drake on 2015/3/18.
 */
/**
 * 绘制区域
 */
var gameArea;

/**
 * 类型：大小
 * @param width     宽度
 * @param height    高度
 * @returns {{}}
 * @constructor
 */
var Size = function (width, height) {
    var obj = {};
    obj.Type = "Size";

    obj.Width = width;
    obj.Height = height;
    return obj;
};

/**
 * 类型：坐标
 * @param x 横坐标
 * @param y 纵坐标
 * @returns {{}}
 * @constructor
 */
var Location = function (x, y) {
    var obj = {};
    obj.Type = "Location";

    obj.X = x;
    obj.Y = y;
    return obj;
};

var Functions = {
    /**
     * 命中检查
     * @param location 被验证的坐标
     * @returns {boolean} 是否命中
     * @constructor
     */
    AreaCheck: function (location) {
        return (location.X >= this.X() && location.X <= this.X() + this.Width()) && (location.Y >= this.Y() && location.Y <= this.Y() + this.Height());
    },
    /**
     * 绘制菜单按钮
     * @constructor
     */
    DrawMenuButton: function () {
        gameArea.fillStyle = this.BackColor;
        gameArea.fillRect(this.X(), this.Y(), this.Width(), this.Height());
        gameArea.fillStyle = this.ForeColor;
        gameArea.font = this.Font;
        gameArea.fillText(this.Text, this.TextLocation().X, this.TextLocation().Y, 9999);
    }
};

var EventFunctions = {
    /**
     * 无动作
     * @constructor
     */
    None: function () {
    }
};

/**
 * 枚举：玩家颜色
 * @type {{_Corner: string, Red: string, Blue: string, Orange: string, Yellow: string}}
 */
var Region = {
    _Corner: "gray",
    Red: "red",
    Blue: "blue",
    Orange: "orange",
    Yellow: "yellow"
};

/**
 * 浏览器类别
 * @type {{Android: string, WindowsPhone: string, WindowsPhoneDesktop: string, Other: string}}
 */
var Browsers = {
    "Android": "Android",
    "WindowsPhone": "WindowsPhone",
    "WindowsPhoneDesktop": "WindowsPhoneDesktop",
    "Other": "Other"
};

/**
 * 鼠标按键
 * @type {{LeftButton: number, RightButton: number}}
 */
var MouseButton = {
    "LeftButton": 0,
    "RightButton": 1,
    "MiddleButton": 2
};

/**
 * 鼠标按键状态
 * @type {{None: number, Down: number, Click: number}}
 */
var MouseState = {
    "None": 0,
    "Down": 1,
    "Click": 2
};