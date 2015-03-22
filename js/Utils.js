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
     * 依照Zindex进行排列(Zindex越大优先级越低)
     * @param array 被排列的数组
     * @param isDrawing true:从大到小 false:从小到大
     * @constructor
     */
    SortByZindex: function (array, isDrawing) {
        array.sort(function (o1, o2) {
            if (o1.Zindex > o2.Zindex) {
                if (isDrawing) {
                    return -1;
                }
                return 1;
            }
            else if (o1.Zindex < o2.Zindex) {
                if (isDrawing) {
                    return 1;
                }
                return -1;
            }
            return 0;
        });
    },

    /**
     * 输入操作触发器
     * @param objArray 被检测对象数组
     * @param nowHover 当前悬浮对象
     * @param nowPress 当前按下对象
     * @param setHoverFunc 设置悬浮对象方法
     * @param setPressFunc 设置按下对象方法
     * @constructor
     */
    InputEventTrigger: function (objArray, nowHover, nowPress, setHoverFunc, setPressFunc) {
        var array = [];
        for (var i = 0; i < objArray.length; i++) {
            if (objArray[i].AreaCheck(mouseInput.Location)) {
                array.push(objArray[i]);
            }

            if (mouseInput.GetState(MouseButton.LeftButton) == MouseState.Down) {
                if (nowPress == undefined) {
                    if (array.length > 0) {
                        setPressFunc(array[0]);
                        array[0].OnMouseDown();
                    }
                }
            } else if (mouseInput.GetState(MouseButton.LeftButton) == MouseState.Click) {
                if (array.length > 0) {
                    Utils.SortByZindex(array, false);
                    array[0].OnMouseClick();
                    array[0].OnMouseHover();
                    setPressFunc(undefined);
                }
            } else {
                if (array.length > 0) {
                    Utils.SortByZindex(array, false);
                    if (nowHover != array[0]) {
                        setHoverFunc(array[0]);
                        array[0].OnMouseHover();
                    }
                    return;
                }

                if (nowHover != undefined) {
                    nowHover.OnMouseLeave();
                    setHoverFunc(undefined);
                }
            }
        }
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