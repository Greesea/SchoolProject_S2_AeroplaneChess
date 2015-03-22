/**
 * Created by Drake on 2015/3/19.
 */
var Game = function (MapObjects) {
    var obj = {};
    obj.Type = "Game";

    obj.MapObjs = MapObjects;
    obj.GameStart = function () {
        setInterval(function () {
            gameArea.clearRect(0, 0, 600, 480);
            for (var i = 0; i < obj.MapObjs.length; i++) {
                if (obj.MapObjs[i].Update != null)
                    obj.MapObjs[i].Update();
                if (obj.MapObjs[i].Draw != null)
                    obj.MapObjs[i].Draw();
            }
            mouseInput.ClearClickState();
        }, (1000 / 100));
    };
    return obj;
};

var GameMenu = function (controls, size, backgroundColor) {
    var obj = {};
    obj.Type = "GameMenu";
    obj.Controls = controls;
    obj.Size = size;
    obj.BackgroundColor = backgroundColor;
    var nowHover;
    var nowDown;

    obj.Tick = function () {
        var array = [];
        for (var i = 0; i < obj.Controls.length; i++) {
            if (Utils.AreaCheck(obj.Controls[i], mouseInput.Location)) {
                array.push(obj.Controls[i]);
            }
        }
        if (mouseInput.GetState(MouseButton.LeftButton) == MouseState.Down) {
            if (nowDown == undefined) {
                if (array.length > 0) {
                    nowDown = array[0];
                    nowDown.OnMouseDown();
                }
            }
        }
        else if (mouseInput.GetState(MouseButton.LeftButton) == MouseState.Click) {
            if (array.length > 0) {
                Utils.SortByZindex(array, false);
                array[0].OnClick();
                nowDown = undefined;
            }
        } else {
            if (nowHover != undefined) {
                nowHover.OnLeave();
                nowHover = undefined;
            }

            if (array.length > 0) {
                Utils.SortByZindex(array, false);
                nowHover = array[0];
                nowHover.OnHover();
            }
        }

        gameArea.fillStyle = obj.BackgroundColor;
        gameArea.fillRect(0, 0, obj.Size.Width, obj.Size.Height);
        for (var i = 0; i < obj.Controls.length; i++) {
            obj.Controls[i].Update();
            obj.Controls[i].Draw();
        }

        mouseInput.ClearClickState();
    };

    return obj;
};