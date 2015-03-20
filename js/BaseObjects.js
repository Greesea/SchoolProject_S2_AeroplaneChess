/**
 * Created by Drake on 2015/3/18.
 */
/**
 * 绘制区域
 */
var gameArea;

/**
 * 地图元件：矩形
 * @param location  位置(左上角)
 * @param size      大小
 * @param region    所属玩家
 * @param canJump   能否跳跃
 * @param drawfunc      绘制方法
 * @returns {{}}
 * @constructor
 * @param updateFunc
 */
var MapRect = function (location, size, region, canJump, drawfunc, updateFunc) {
    var obj = {};
    obj.Type = "MapRect";

    obj.Location = location;
    obj.Size = size;
    obj.Region = region;
    obj.CanJump = canJump;
    obj.Draw = drawfunc;
    obj.Update = updateFunc
    return obj;
};

/**
 * 地图元件：等腰三角形
 * @param location              位置(左上角)
 * @param size                  大小
 * @param region                所属玩家
 * @param triangleDirection     三角形方向
 * @param drawfunc                  绘制方法
 * @returns {{}}
 * @constructor
 * @param updateFunc
 */
var MapTriangle = function (location, size, region, triangleDirection, drawfunc, updateFunc) {
    var obj = {};
    obj.Type = "MapTriangle";

    obj.Location = location;
    obj.Size = size;
    obj.Region = region;
    obj.Direction = triangleDirection;
    obj.Draw = drawfunc;
    obj.Update = updateFunc
    return obj;
};

/**
 * 地图元件：圆
 * @param location  位置(左上角)
 * @param size      大小
 * @param region    所属玩家
 * @param drawfunc      绘制方法
 * @returns {{}}
 * @constructor
 * @param updateFunc
 */
var MapCircle = function (location, size, region, drawfunc, updateFunc) {
    var obj = {};
    obj.Type = "MapCircle";

    obj.Location = location;
    obj.Size = size;
    obj.Region = region;
    obj.Draw = drawfunc;
    obj.Update = updateFunc
    return obj;
};

/**
 * 地图元件：高级圆
 * @param centerLocation    中心点
 * @param radius            半径
 * @param region            所属玩家
 * @param drawfunc              绘制方法
 * @returns {{}}
 * @constructor
 * @param updateFunc
 */
var MapCircleAnother = function (centerLocation, radius, region, drawfunc, updateFunc) {
    var obj = {};
    obj.Type = "MapCircleAnother";

    obj.CenterLocation = centerLocation;
    obj.Radius = radius;
    obj.Region = region;
    obj.Draw = drawfunc;
    obj.Update = updateFunc
    return obj;
};

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

/**
 * 绘制方法
 * @type {{FilledRect: FilledRect, FilledTriangle: FilledTriangle, FilledCircle: FilledCircle, FilledCircleAnother: FilledCircleAnother}}
 */
var DrawFunc = {
    FilledRect: function () {
        gameArea.fillStyle = this.Region.toString();
        gameArea.fillRect(this.Location.X, this.Location.Y, this.Size.Width, this.Size.Height);
    },
    FilledTriangle: function () {
        gameArea.beginPath();

        switch (this.Direction) {
            case TriangleDirection.TopLeft:
                gameArea.moveTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                gameArea.lineTo(this.Location.X, this.Location.Y + this.Size.Height);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y);
                gameArea.moveTo(this.Location.X, this.Location.Y + this.Size.Height);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y);
                break;
            case TriangleDirection.TopRight:
                gameArea.moveTo(this.Location.X, this.Location.Y + this.Size.Height);
                gameArea.lineTo(this.Location.X, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                gameArea.moveTo(this.Location.X, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                break;
            case TriangleDirection.BottomLeft:
                gameArea.moveTo(this.Location.X + this.Size.Width, this.Location.Y);
                gameArea.lineTo(this.Location.X, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                gameArea.moveTo(this.Location.X, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                break;
            case TriangleDirection.BottomRight:
                gameArea.moveTo(this.Location.X, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y);
                gameArea.lineTo(this.Location.X, this.Location.Y + this.Size.Height);
                gameArea.moveTo(this.Location.X + this.Size.Width, this.Location.Y);
                gameArea.lineTo(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
                break;
        }

        gameArea.closePath();
        gameArea.fillStyle = this.Region.toString();
        gameArea.fill();
    },
    FilledCircle: function () {
        gameArea.beginPath();
        gameArea.arc(this.Location.X + (this.Size.Width / 2.0), this.Location.Y + (this.Size.Height / 2.0), (this.Size.Width > this.Size.Height) ? (this.Size.Height / 2.0) : (this.Size.Width / 2.0), 0, Math.PI * 2, true);
        gameArea.closePath();
        gameArea.fillStyle = this.Region.toString();
        gameArea.fill();
    },
    FilledCircleAnother: function () {
        gameArea.beginPath();
        gameArea.arc(this.CenterLocation.X, this.CenterLocation.Y, this.Radius, 0, Math.PI * 2, true);
        gameArea.closePath();
        gameArea.fillStyle = this.Region.toString();
        gameArea.fill();
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
 * 枚举：三角形方向
 * @type {{TopLeft: number, TopRight: number, BottomLeft: number, BottomRight: number}}
 */
var TriangleDirection = {
    TopLeft: 0,
    TopRight: 1,
    BottomLeft: 2,
    BottomRight: 3
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