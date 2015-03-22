/**
 * Created by tsaccp on 2015/3/22.
 */
var MenuButton = function (location, zindex, size, text, backgroundColor, foreColor, drawFunc, updateFunc, onClickFunc, onMouseDownFunc, onHoverFunc, onLeaveFunc) {
    var obj = {};

    obj.Location = location;
    obj.Zindex = zindex;
    obj.Size = size;
    obj.Text = text;
    obj.BackgroundColor = backgroundColor;
    obj.ForeColor = foreColor;
    obj.OnClick = onClickFunc;
    obj.OnMouseDown = onMouseDownFunc;
    obj.OnHover = onHoverFunc;
    obj.OnLeave = onLeaveFunc;

    obj.Draw = drawFunc;
    obj.Update = updateFunc;

    return obj;
};

var MenuTitle = function (location, zindex, size, text, titleImage, foreColor, drawFunc, updateFunc, onClickFunc, onHoverFunc, onLeaveFunc) {
    var obj = {};

    obj.Location = location;
    obj.Zindex = zindex;
    obj.Size = size;
    obj.Text = text;
    obj.TitleImage = titleImage;
    obj.ForeColor = foreColor;
    obj.OnClick = onClickFunc;
    obj.OnHover = onHoverFunc;
    obj.OnLeave = onLeaveFunc;

    obj.Draw = drawFunc;
    obj.Update = updateFunc;

    return obj;
};