/**
 * Created by Drake on 2015/3/18.
 */
var game;


$(function () {
    Initialize();
    $(document).keydown(keyfunc);
    $("#gamearea").attr("width", 600).attr("height", 480);
});

function Initialize() {
    var mapObjArray = [];

    mapObjArray[0] = new MapRect(new Location(50, 50), new Size(20, 20), Region._Corner, false, DrawFunc.FilledRect);
    mapObjArray[1] = new MapRect(new Location(100, 50), new Size(20, 20), Region.Red, false, DrawFunc.FilledRect);
    mapObjArray[2] = new MapRect(new Location(150, 50), new Size(20, 20), Region.Blue, false, DrawFunc.FilledRect);
    mapObjArray[3] = new MapRect(new Location(200, 50), new Size(20, 20), Region.Orange, false, DrawFunc.FilledRect);
    mapObjArray[4] = new MapRect(new Location(250, 50), new Size(20, 20), Region.Yellow, false, DrawFunc.FilledRect);
    mapObjArray[5] = new MapTriangle(new Location(50, 100), new Size(20, 20), Region._Corner, TriangleDirection.TopLeft, DrawFunc.FilledTriangle);
    mapObjArray[6] = new MapTriangle(new Location(100, 100), new Size(20, 20), Region._Corner, TriangleDirection.TopRight, DrawFunc.FilledTriangle);
    mapObjArray[7] = new MapTriangle(new Location(150, 100), new Size(20, 20), Region._Corner, TriangleDirection.BottomLeft, DrawFunc.FilledTriangle);
    mapObjArray[8] = new MapTriangle(new Location(200, 100), new Size(20, 20), Region._Corner, TriangleDirection.BottomRight, DrawFunc.FilledTriangle);
    mapObjArray[9] = new MapCircleAnother(new Location(60, 160), 10, Region._Corner, DrawFunc.FilledCircleAnother);
    mapObjArray[10] = new MapCircle(new Location(100, 150), new Size(20, 20), Region.Red, DrawFunc.FilledCircle);
    mapObjArray[11] = new MapCircle(new Location(150, 150), new Size(20, 20), Region.Blue, DrawFunc.FilledCircle);
    mapObjArray[12] = new MapCircle(new Location(200, 150), new Size(20, 20), Region.Orange, DrawFunc.FilledCircle);
    mapObjArray[13] = new MapCircle(new Location(250, 150), new Size(20, 20), Region.Yellow, DrawFunc.FilledCircle);


    gameArea = $("#gamearea")[0].getContext("2d");
    game = new Game(mapObjArray);
    game.GameStart();
}

function keyfunc(event) {
    if (event.keyCode == 39) {
        game.MapObjs[5].Location = new Location(game.MapObjs[5].Location.X + 2, game.MapObjs[5].Location.Y);
    } else if (event.keyCode == 37) {
        game.MapObjs[5].Location = new Location(game.MapObjs[5].Location.X - 2, game.MapObjs[5].Location.Y);
    } else if (event.keyCode == 38) {
        game.MapObjs[5].Location = new Location(game.MapObjs[5].Location.X, game.MapObjs[5].Location.Y - 2);
    } else if (event.keyCode == 40) {
        game.MapObjs[5].Location = new Location(game.MapObjs[5].Location.X, game.MapObjs[5].Location.Y + 2);
    }

    $("#keyOutput").html(event.keyCode);
}