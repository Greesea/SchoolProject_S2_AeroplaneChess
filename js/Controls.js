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

    obj.Parent = parent;
    var loc = location;
    var textLoc = textLocation;
    obj.Zindex = zindex;
    obj.Size = size;
    obj.Text = text;
    obj.Font = (font == null) ? "" : font;
    obj.BackColor = backColor;
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

    obj.AreaCheck = (areaCheckFunc == null) ? EventFunctions.None : areaCheckFunc;
    obj.Draw = (drawFunc == null) ? EventFunctions.None : drawFunc;
    obj.Update = (updateFunc == null) ? EventFunctions.None : updateFunc;
    obj.OnMouseClick = (onMouseClickFunc == null) ? EventFunctions.None : onMouseClickFunc;
    obj.OnMouseDown = (onMouseDownFunc == null) ? EventFunctions.None : onMouseDownFunc;
    obj.OnMouseHover = (onMouseHoverFunc == null) ? EventFunctions.None : onMouseHoverFunc;
    obj.OnMouseLeave = (onMouseLeaveFunc == null) ? EventFunctions.None : onMouseLeaveFunc;

    return obj;
};