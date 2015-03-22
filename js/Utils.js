/**
 * Created by Drake on 2015/3/20.
 */
var mouseInput;

var Utils = {
    /**
     * 检查UA
     * @param ua UserAgent
     * @returns {string} 浏览器类型
     * @constructor
     */
    CheckUA: function (ua) {
        console.log(ua);
        if (ua.indexOf("Mozilla/") == 0 && ua.indexOf("Android") != -1 && ua.indexOf("Linux") != -1 && ua.indexOf("AppleWebKit") != -1 && ua.indexOf("Mobile Safari") != -1) {
            return Browsers.Android;
        } else if (ua.indexOf("Mozilla/" == 0) && ua.indexOf("Windows Phone") != -1 && ua.indexOf("Trident/") != -1) {
            return Browsers.WindowsPhone;
        } else if (ua.indexOf("Mozilla/") == 0 && ua.indexOf("Windows NT") != -1 && ua.indexOf("Trident/") != -1 && ua.indexOf("WPDesktop") != -1) {
            return Browsers.WindowsPhoneDesktop;
        } else {
            return Browsers.Other;
        }
    },

    /**
     * 检查点是否在对象范围中
     * @param mapObject 对象
     * @param location 点
     * @returns {boolean} 布尔
     * @constructor
     */
    AreaCheck: function (mapObject, location) {
        var result;

        if (mapObject.Type == "MapCircle") {
            gameArea.save();
            gameArea.beginPath();
            gameArea.arc(mapObject.Location.X + (mapObject.Size.Width / 2.0), mapObject.Location.Y + (mapObject.Size.Height / 2.0), (mapObject.Size.Width > mapObject.Size.Height) ? (mapObject.Size.Height / 2.0) : (mapObject.Size.Width / 2.0), 0, Math.PI * 2, true);
            gameArea.closePath();

            result = gameArea.isPointInPath(location.X, location.Y);
            gameArea.restore();
        } else if (mapObject.Type == "MapCircleAnother") {
            gameArea.save();
            gameArea.beginPath();
            gameArea.arc(mapObject.CenterLocation.X, mapObject.CenterLocation.Y, mapObject.Radius, 0, Math.PI * 2, true);
            gameArea.closePath();

            result = gameArea.isPointInPath(location.X, location.Y);
            gameArea.restore();
        } else if (mapObject.Type == "MapTriangle") {
            gameArea.save();
            gameArea.beginPath();

            switch (mapObject.Direction) {
                case TriangleDirection.TopLeft:
                    gameArea.moveTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.lineTo(mapObject.Location.X, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y);
                    gameArea.moveTo(mapObject.Location.X, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y);
                    break;
                case TriangleDirection.TopRight:
                    gameArea.moveTo(mapObject.Location.X, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.lineTo(mapObject.Location.X, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.moveTo(mapObject.Location.X, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    break;
                case TriangleDirection.BottomLeft:
                    gameArea.moveTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.moveTo(mapObject.Location.X, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    break;
                case TriangleDirection.BottomRight:
                    gameArea.moveTo(mapObject.Location.X, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X, mapObject.Location.Y + mapObject.Size.Height);
                    gameArea.moveTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y);
                    gameArea.lineTo(mapObject.Location.X + mapObject.Size.Width, mapObject.Location.Y + mapObject.Size.Height);
                    break;
            }

            gameArea.closePath();
            result = gameArea.isPointInPath(location.X, location.Y);
            gameArea.restore();
        } else {
            result = ((location.X >= mapObject.Location.X && location.X <= (mapObject.Location.X + mapObject.Size.Width)) && (location.Y >= mapObject.Location.Y && location.Y <= (mapObject.Location.Y + mapObject.Size.Height)));
        }
        return result;
    }
};

/**
 * 鼠标状态检测器
 * @param jqueryCanvas canvas的jquery对象
 * @returns {{}}
 * @constructor
 */
var MouseInputState = function (jqueryCanvas) {
    var obj = {};

    obj.Browser = Utils.CheckUA(navigator.userAgent);//识别浏览器
    obj.Offset = new Location(jqueryCanvas.offset().left, jqueryCanvas.offset().top);//给予offset初始值
    obj.Location = new Location(-1, -1);
    var mouseStateArray = [0, 0, 0];//初始化鼠标状态

    /**
     * 获取鼠标状态
     * @param mouseButton 鼠标按键
     * @returns {*} 鼠标状态
     * @constructor
     */
    obj.GetState = function (mouseButton) {
        var value = -1;
        if (mouseButton == MouseButton.LeftButton) {
            value = mouseStateArray[0];
        } else if (mouseButton == MouseButton.RightButton) {
            value = mouseStateArray[1];
        } else if (mouseButton == MouseButton.MiddleButton) {
            value = mouseStateArray[2];
        }

        switch (value) {
            case 0:
                return MouseState.None;
            case 1:
                return MouseState.Down;
            case 2:
                return MouseState.Click;
            default :
                return null;
        }
    };
    /**
     * 清除按下状态
     * @constructor
     */
    obj.ClearClickState = function () {
        for (var i = 0; i < 3; i++) {
            if (mouseStateArray[i] == 2) {
                mouseStateArray[i] = 0;
            }
        }
    };

    //注册鼠标移动
    jqueryCanvas[0].addEventListener("mousemove", function (e) {
        if (obj.Browser != Browsers.WindowsPhone && obj.Browser != Browsers.WindowsPhoneDesktop) {
            obj.Offset = new Location(jqueryCanvas.offset().left, jqueryCanvas.offset().top);
        }
        obj.Location = new Location((e.pageX - obj.Offset.X), (e.pageY - obj.Offset.Y));
    }, false);
    //注册鼠标按下
    jqueryCanvas[0].addEventListener("mousedown", function (e) {
        switch (e.button) {
            case 0:
                mouseStateArray[0] = 1;
                break;
            case 2:
                mouseStateArray[1] = 1;
                break;
            case 1:
                mouseStateArray[2] = 1;
                break;
        }
    }, false);
    //注册鼠标释放
    jqueryCanvas[0].addEventListener("mouseup", function (e) {
        switch (e.button) {
            case 0:
                if (mouseStateArray[0] == 1) {
                    mouseStateArray[0] = 2;
                } else {
                    mouseStateArray[0] = 0;
                }
                break;
            case 2:
                if (mouseStateArray[1] == 1) {
                    mouseStateArray[1] = 2;
                } else {
                    mouseStateArray[1] = 0;
                }
                break;
            case 1:
                if (mouseStateArray[2] == 1) {
                    mouseStateArray[2] = 2;
                } else {
                    mouseStateArray[2] = 0;
                }
                break;
        }
    }, false);

    //清除右键菜单
    jqueryCanvas.bind("contextmenu", function (e) {
        return false;
    });
    return obj;
};