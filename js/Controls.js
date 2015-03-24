/**
 * Created by tsaccp on 2015/3/22.
 */

/**
 * 菜单按钮
 * @param parent 父级菜单(可赋值也可以不赋值 在创建GameMenu的时候会自动绑定parent)
 * @param location 坐标(相对父级)
 * @param zindex 渲染深度
 * @param size 大小
 * @param text 文本
 * @param font 字体信息
 * @param textLocation 文本位置(相对自己)
 * @param backColor 背景色
 * @param foreColor 前景色(文本颜色)
 * @param areaCheckFunc 命中检查方法
 * @param drawFunc 渲染方法(可为null)
 * @param updateFunc 更新方法(可为null)
 * @param onMouseClickFunc 鼠标单击方法(可为null)
 * @param onMouseDownFunc 鼠标按下方法(可为null)
 * @param onMouseHoverFunc 鼠标悬停方法(可为null)
 * @param onMouseLeaveFunc 鼠标离开方法(可为null)
 * @returns {{}}
 * @constructor
 */
var MenuButton = function (parent, location, zindex, size, text, font, textLocation, backColor, foreColor, areaCheckFunc, drawFunc, updateFunc, onMouseClickFunc, onMouseDownFunc, onMouseHoverFunc, onMouseLeaveFunc) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "MenuButton";

    /**
     * 父对象
     */
    obj.Parent = parent;

    /**
     * 坐标
     */
    var loc = location;

    /**
     * 文本偏移量(相对自己)
     */
    var textLoc = textLocation;

    /**
     * 渲染深度
     */
    obj.Zindex = zindex;

    /**
     * 大小
     */
    obj.Size = size;

    /**
     * 文本
     */
    obj.Text = text;

    /**
     * 字体信息
     * @type {string}
     */
    obj.Font = (font == null) ? "" : font;

    /**
     * 背景色
     */
    obj.BackColor = backColor;

    /**
     * 前景色(文本颜色)
     */
    obj.ForeColor = foreColor;

    /**
     * 坐标(相对父级)
     * @returns {Location}
     * @constructor
     */
    obj.Location = function () {
        return new Location(obj.Parent.X() + loc.X, obj.Parent.Y() + loc.Y);
    };

    /**
     * 文本位置(相对自己)
     * @returns {Location}
     * @constructor
     */
    obj.TextLocation = function () {
        return new Location(this.X() + textLoc.X, this.Y() + textLoc.Y);
    };

    /**
     * 横坐标(相对父级)
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location().X;
    };

    /**
     * 纵坐标(相对父级)
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location().Y;
    };

    /**
     * 宽度
     * @returns {Width|Number}
     * @constructor
     */
    obj.Width = function () {
        return obj.Size.Width;
    };

    /**
     * 高度
     * @returns {Height|Number}
     * @constructor
     */
    obj.Height = function () {
        return obj.Size.Height;
    };

    /**
     * 命中测试
     * @type {None}
     */
    obj.AreaCheck = (areaCheckFunc == null) ? EventFunctions.None : areaCheckFunc;
    /**
     * 渲染
     * @type {None}
     */
    obj.Draw = (drawFunc == null) ? EventFunctions.None : drawFunc;
    /**
     * 更新
     * @type {None}
     */
    obj.Update = (updateFunc == null) ? EventFunctions.None : updateFunc;
    var MouseClick = (onMouseClickFunc == null) ? EventFunctions.None : onMouseClickFunc;
    var MouseDown = (onMouseDownFunc == null) ? EventFunctions.None : onMouseDownFunc;
    var MouseHover = (onMouseHoverFunc == null) ? EventFunctions.None : onMouseHoverFunc;
    var MouseLeave = (onMouseLeaveFunc == null) ? EventFunctions.None : onMouseLeaveFunc;

    /**
     * 鼠标点击时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseClick = function (location) {
        MouseClick(obj);
    };

    /**
     * 鼠标按下时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseDown = function (location) {
        MouseDown(obj);
    };

    /**
     * 鼠标悬停时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseHover = function (location) {
        MouseHover(obj);
    };

    /**
     * 鼠标离开时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseLeave = function (location) {
        MouseLeave(obj);
    };

    return obj;
};

/**
 * 菜单标题
 * @param parent 父级菜单(可赋值也可以不赋值 在创建GameMenu的时候会自动绑定parent)
 * @param location location 坐标(相对父级)
 * @param zindex 渲染深度
 * @param text 文本
 * @param font 字体信息
 * @param background 背景(Image{50*50} or 颜色字符串)
 * @param foreColor foreColor 前景色(文本颜色)
 * @param drawFunc 渲染方法(可为null)
 * @returns {{}}
 * @constructor
 */
var MenuTitle = function (parent, location, zindex, text, font, background, foreColor, drawFunc) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "MenuTitle";

    /**
     * 父元素
     */
    obj.Parent = parent;

    /**
     * 坐标
     */
    var loc = location;

    /**
     * 渲染深度
     */
    obj.Zindex = zindex;

    /**
     * 文本
     */
    obj.Text = text;

    /**
     * 字体信息
     * @type {string}
     */
    obj.Font = (font == null) ? "" : font;

    /**
     * 背景(Image{50*50} or 颜色字符串)
     */
    obj.Background = background;

    /**
     * 前景色(文本颜色)
     */
    obj.ForeColor = foreColor;

    /**
     * 坐标(相对父级)
     * @returns {Location}
     * @constructor
     */
    obj.Location = function () {
        return new Location(obj.Parent.X() + loc.X, obj.Parent.Y() + loc.Y);
    };

    /**
     * 文本位置(相对自己)
     * @returns {Location}
     * @constructor
     */
    obj.TextLocation = function () {
        return new Location(this.X() + textLoc.X, this.Y() + textLoc.Y);
    };

    /**
     * 横坐标(相对父级)
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location().X;
    };

    /**
     * 纵坐标(相对父级)
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location().Y;
    };

    obj.Draw = (drawFunc == null) ? EventFunctions.None : drawFunc;

    return obj;
};

/**
 * 下拉菜单
 * @param parent 父级菜单(可赋值也可以不赋值 在创建GameMenu的时候会自动绑定parent)
 * @param location 坐标(相对父级)
 * @param zindex 渲染深度
 * @param itemSize 菜单项大小
 * @param valueArray 值列表(数组)
 * @param nowSelectIndex 当前选择的下标(不能超过值列表的大小)
 * @param font 字体信息
 * @param textOffset 文本偏移量
 * @param backColor 背景色
 * @param foreColor 前景色(文本颜色)
 * @param borderColor 边框颜色
 * @param onMouseClickFunc 鼠标单击方法(可为null)
 * @param onMouseDownFunc 鼠标按下方法(可为null)
 * @param onMouseHoverFunc 鼠标悬停方法(可为null)
 * @param onMouseLeaveFunc 鼠标离开方法(可为null)
 * @returns {{}}
 * @constructor
 */
var DropdownBox = function (parent, location, zindex, itemSize, valueArray, nowSelectIndex, font, textOffset, backColor, foreColor, borderColor, onMouseClickFunc, onMouseDownFunc, onMouseHoverFunc, onMouseLeaveFunc) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "DropdownBox";

    /**
     * 父元素
     */
    obj.Parent = parent;

    /**
     * 坐标
     */
    var loc = location;

    /**
     * 渲染深度
     */
    obj.Zindex = zindex;

    /**
     * 大小
     */
    var size = itemSize;

    /**
     * 值列表
     */
    obj.Values = valueArray;

    /**
     * 当前选择的下标
     */
    obj.SelectedIndex = nowSelectIndex;

    var items = [];

    /**
     * 字体信息
     */
    obj.Font = font;

    /**
     * 文本偏移量
     */
    obj.TextOffset = textOffset;

    /**
     * 背景色
     */
    obj.BackColor = backColor;

    /**
     * 前景色(文本颜色)
     */
    obj.ForeColor = foreColor;

    /**
     * 边框颜色
     */
    obj.BorderColor = borderColor;

    /**
     * 当前状态
     * @type {boolean}
     */
    obj.isOpen = false;

    /**
     * 坐标(相对父级)
     * @returns {Location}
     * @constructor
     */
    obj.Location = function () {
        return new Location(obj.Parent.X() + loc.X, obj.Parent.Y() + loc.Y);
    };

    /**
     * 横坐标(相对父级)
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location().X;
    };

    /**
     * 纵坐标(相对父级)
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location().Y;
    };

    /**
     * 当前选择的值
     * @returns {*}
     * @constructor
     */
    obj.SelectedValue = function () {
        return obj.Values[obj.SelectedIndex];
    };

    /**
     * 当前选择的对象
     * @returns {*}
     * @constructor
     */
    obj.SelectedItem = function () {
        return items[obj.SelectedIndex];
    };

    /**
     * 从点获取对象
     * @param location 点
     * @returns {*}
     * @constructor
     */
    obj.GetItemFromLocation = function (location) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].AreaCheck(location)) {
                return items[i];
            }
        }

        return null;
    };

    /**
     * 渲染
     * @constructor
     */
    obj.Draw = function () {
        if (!obj.isOpen) {
            items[obj.SelectedIndex].Draw();
        } else {
            for (var i = 0; i < items.length; i++) {
                items[i].Draw();
            }
        }

        gameArea.fillStyle = obj.BorderColor;

        gameArea.strokeRect(obj.Location().X, obj.Location().Y, size.Width, size.Height);
    };

    /**
     * 命中测试
     * @param location
     * @returns {*}
     * @constructor
     */
    obj.AreaCheck = function (location) {
        if (!obj.isOpen) {
            return items[obj.SelectedIndex].AreaCheck(location);
        } else {
            for (var i = 0; i < items.length; i++) {
                if (items[i].AreaCheck(location)) {
                    return true;
                }
            }
            return false;
        }
    };

    var MouseClick = (onMouseClickFunc == null) ? EventFunctions.None : onMouseClickFunc;
    var MouseDown = (onMouseDownFunc == null) ? EventFunctions.None : onMouseDownFunc;
    var MouseHover = (onMouseHoverFunc == null) ? EventFunctions.None : onMouseHoverFunc;
    var MouseLeave = (onMouseLeaveFunc == null) ? EventFunctions.None : onMouseLeaveFunc;

    /**
     * 鼠标点击时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseClick = function (location) {
        if (!obj.isOpen) {
            obj.isOpen = true;
        } else {
            var o = obj.GetItemFromLocation(location);
            if (obj.SelectedIndex != o.Index) {
                obj.SelectedIndex = o.Index;
            }
            obj.isOpen = false;
        }

        MouseClick(location, obj.isOpen, obj);
    };

    /**
     * 鼠标按下时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseDown = function (location) {
        MouseDown(location, obj.isOpen, obj);
    };

    /**
     * 鼠标悬停时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseHover = function (location) {
        MouseHover(location, obj.isOpen, obj);
    };

    /**
     * 鼠标离开时触发
     * @param location 鼠标坐标
     * @constructor
     */
    obj.OnMouseLeave = function (location) {
        MouseLeave(obj.isOpen, obj);
    };

    //初始化列表
    for (var i = 0; i < obj.Values.length; i++) {
        var o = {};
        /**
         * 类型
         * @type {string}
         */
        o.Type = "DropdownBoxItem";

        /**
         * 父元素
         * @type {{}}
         */
        o.Parent = obj;

        /**
         * 所属下标
         * @type {number}
         */
        o.Index = i;

        /**
         * 所属值
         */
        o.Value = obj.Values[i];

        /**
         * 坐标(相对父元素的父元素)
         * @returns {Location}
         * @constructor
         */
        o.Location = function () {
            var compare = this.Index - this.Parent.SelectedIndex;

            if (compare > 0) {
                return new Location(this.Parent.X(), this.Parent.Y() + (size.Height * compare));
            } else if (compare < 0) {
                return new Location(this.Parent.X(), this.Parent.Y() - (size.Height * Math.abs(compare)));
            }

            return new Location(this.Parent.X(), this.Parent.Y());
        };

        /**
         * 命中测试
         * @param location 点
         * @returns {boolean}
         * @constructor
         */
        o.AreaCheck = function (location) {
            return (location.X >= this.Location().X && location.X <= this.Location().X + size.Width) && (location.Y >= this.Location().Y && location.Y <= this.Location().Y + size.Height);
        };

        /**
         * 渲染
         * @constructor
         */
        o.Draw = function () {
            gameArea.fillStyle = this.Parent.BackColor;
            gameArea.fillRect(this.Location().X, this.Location().Y, size.Width, size.Height);
            gameArea.fillStyle = this.Parent.ForeColor;
            gameArea.font = this.Parent.Font;
            gameArea.fillText(this.Value, this.Location().X + this.Parent.TextOffset.X, this.Location().Y + this.Parent.TextOffset.Y, 9999);
        };

        items.push(o);
    }

    return obj;
};

/**
 * 文本控件
 * @param parent 下拉菜单
 * @param location 父级菜单(可赋值也可以不赋值 在创建GameMenu的时候会自动绑定parent)
 * @param zindex 坐标(相对父级)
 * @param text 渲染深度
 * @param font 字体信息
 * @param foreColor 前景色(文本颜色)
 * @returns {{}}
 * @constructor
 */
var Label = function (parent, location, zindex, text, font, foreColor) {
    var obj = {};
    /**
     * 类型
     * @type {string}
     */
    obj.Type = "Label";

    /**
     * 父元素
     */
    obj.Parent = parent;

    /**
     * 坐标
     */
    var loc = location;

    /**
     * 渲染深度
     */
    obj.Zindex = zindex;

    /**
     * 文本
     */
    obj.Text = text;

    /**
     * 字体信息
     * @type {string}
     */
    obj.Font = (font == null) ? "" : font;

    /**
     * 前景色(文本颜色)
     */
    obj.ForeColor = foreColor;

    /**
     * 坐标(相对父级)
     * @returns {Location}
     * @constructor
     */
    obj.Location = function () {
        return new Location(obj.Parent.X() + loc.X, obj.Parent.Y() + loc.Y);
    };

    /**
     * 横坐标(相对父级)
     * @returns {Location.X|Number}
     * @constructor
     */
    obj.X = function () {
        return obj.Location().X;
    };

    /**
     * 纵坐标(相对父级)
     * @returns {Location.Y|Number}
     * @constructor
     */
    obj.Y = function () {
        return obj.Location().Y;
    };

    /**
     * 渲染
     * @constructor
     */
    obj.Draw = function () {
        gameArea.fillStyle = obj.ForeColor;
        gameArea.font = obj.Font;
        gameArea.fillText(obj.Text, obj.X(), obj.Y(), 9999);
    };

    return obj;
};