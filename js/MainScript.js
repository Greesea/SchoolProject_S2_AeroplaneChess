/**
 * Created by Drake on 2015/3/18.
 */
var game;
var unit = 20;

$(function () {
    //Initialize();
    var jqCanvas = $("#gamearea");
    jqCanvas.attr("width", 600).attr("height", 480);
    gameArea = jqCanvas[0].getContext("2d");
    mouseInput = new MouseInputState(jqCanvas);

    var array = [];

    array[0] = new MenuButton(new Location(60, 110), 3, new Size(150, 150), "单人游戏", "red", "black", controlsDraw, UpdateFunc.None, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    array[1] = new MenuButton(new Location(60, 50), 1, new Size(40, 25), "def", "blue", "black", controlsDraw, UpdateFunc.None, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    array[2] = new MenuButton(new Location(70, 50), 2, new Size(40, 25), "ghi", "yellow", "black", controlsDraw, UpdateFunc.None, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);

    Utils.SortByZindex(array, true);

    var menu = new GameMenu(array, new Size(600, 480), "gray");
    setInterval(function () {
        gameArea.clearRect(0, 0, 600, 480);
        menu.Tick();
    }, 1000 / 60);
});

function controlsDraw() {
    gameArea.fillStyle = this.BackgroundColor;
    gameArea.fillRect(this.Location.X, this.Location.Y, this.Size.Width, this.Size.Height);
    gameArea.fillStyle = this.ForeColor;
    gameArea.fillText(this.Text, this.Location.X + 20, this.Location.Y + 10, 99);
}

function controlsOnClick() {
    this.ForeColor = "White";
}

function controlsOnMouseDown() {
    this.BackgroundColor = "green";
}

function controlsOnHover() {
    this.BackgroundColor = "orange";
}

function controlsOnLeave() {
    this.BackgroundColor = "blue";
}

function Initialize() {
    var mapObjArray = [];

    mapObjArray[0] = new MapRect(new Location(50, 50), new Size(unit, unit), Region._Corner, false, DrawFunc.FilledRect, update);
    mapObjArray[1] = new MapRect(new Location(100, 50), new Size(unit, unit), Region.Red, false, DrawFunc.FilledRect, update);
    mapObjArray[2] = new MapRect(new Location(150, 50), new Size(unit, unit), Region.Blue, false, DrawFunc.FilledRect, update);
    mapObjArray[3] = new MapRect(new Location(200, 50), new Size(unit, unit), Region.Orange, false, DrawFunc.FilledRect, update);
    mapObjArray[4] = new MapRect(new Location(250, 50), new Size(unit, unit), Region.Yellow, false, DrawFunc.FilledRect, update);
    mapObjArray[5] = new MapTriangle(new Location(50, 100), new Size(unit, unit), Region._Corner, TriangleDirection.TopLeft, DrawFunc.FilledTriangle, update);
    mapObjArray[6] = new MapTriangle(new Location(100, 100), new Size(unit, unit), Region._Corner, TriangleDirection.TopRight, DrawFunc.FilledTriangle, update);
    mapObjArray[7] = new MapTriangle(new Location(150, 100), new Size(unit, unit), Region._Corner, TriangleDirection.BottomLeft, DrawFunc.FilledTriangle, update);
    mapObjArray[8] = new MapTriangle(new Location(200, 100), new Size(unit, unit), Region._Corner, TriangleDirection.BottomRight, DrawFunc.FilledTriangle, update);
    mapObjArray[9] = new MapCircleAnother(new Location(60, 160), 10, Region._Corner, DrawFunc.FilledCircleAnother, update);
    mapObjArray[10] = new MapCircle(new Location(100, 150), new Size(unit, unit), Region.Red, DrawFunc.FilledCircle, update);
    mapObjArray[11] = new MapCircle(new Location(150, 150), new Size(unit, unit), Region.Blue, DrawFunc.FilledCircle, update);
    mapObjArray[12] = new MapCircle(new Location(200, 150), new Size(unit, unit), Region.Orange, DrawFunc.FilledCircle, update);
    mapObjArray[13] = new MapCircle(new Location(250, 150), new Size(unit, unit), Region.Yellow, DrawFunc.FilledCircle, update);

    var jqCanvas = $("#gamearea");
    jqCanvas.attr("width", 600).attr("height", 480);
    mouseInput = new MouseInputState(jqCanvas);

    gameArea = jqCanvas[0].getContext("2d");
    game = new Game(mapObjArray);
    game.GameStart();
}

function update() {
    if (mouseInput.GetState(MouseButton.LeftButton) == MouseState.Click) {
        if (Utils.AreaCheck(this, mouseInput.Location)) {
            switch (this.Region) {
                case Region._Corner:
                    this.Region = Region.Red;
                    break;
                case Region.Red:
                    this.Region = Region.Blue;
                    break;
                case Region.Blue:
                    this.Region = Region.Orange;
                    break;
                case Region.Orange:
                    this.Region = Region.Yellow;
                    break;
                case Region.Yellow:
                    this.Region = Region._Corner;
                    break;
            }
        }
    }
}