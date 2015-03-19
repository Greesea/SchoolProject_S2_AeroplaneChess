/**
 * Created by Drake on 2015/3/18.
 */
var game;
var unit = 20;

$(function () {
    Initialize();
    //$(document).keydown(keyfunc);
    $("#gamearea").attr("width", 600).attr("height", 480);
    $(document.body).on("click", function (e) {
        var x = e.pageX - ($("#gamearea").offset().left);
        var y = e.pageY - ($("#gamearea").offset().top);

        var index = 0;
        if ((x >= game.MapObjs[index].Location.X && x <= (game.MapObjs[index].Location.X + game.MapObjs[index].Size.Width)) && (y >= game.MapObjs[index].Location.Y && y <= (game.MapObjs[index].Location.Y + game.MapObjs[index].Size.Height))) {
            if (game.MapObjs[index].Type == "MapTriangle") {
                switch (game.MapObjs[index].Direction) {
                    case TriangleDirection.TopLeft:
                        game.MapObjs[index].Direction = TriangleDirection.TopRight;
                        break;
                    case TriangleDirection.TopRight:
                        game.MapObjs[index].Direction = TriangleDirection.BottomRight;
                        break;
                    case TriangleDirection.BottomRight:
                        game.MapObjs[index].Direction = TriangleDirection.BottomLeft;
                        break;
                    case TriangleDirection.BottomLeft:
                        game.MapObjs[index].Direction = TriangleDirection.TopLeft;
                        break;
                }
            } else if (game.MapObjs[index].Type == "MapRect" || game.MapObjs[index].Type == "MapCircle") {
                switch (game.MapObjs[index].Region) {
                    case Region._Corner:
                        game.MapObjs[index].Region = Region.Red;
                        break;
                    case Region.Red:
                        game.MapObjs[index].Region = Region.Blue;
                        break;
                    case Region.Blue:
                        game.MapObjs[index].Region = Region.Orange;
                        break;
                    case Region.Orange:
                        game.MapObjs[index].Region = Region.Yellow;
                        break;
                    case Region.Yellow:
                        game.MapObjs[index].Region = Region._Corner;
                        break;
                }
            }
        }

        $("#output").html("X:" + x + "\nY:" + y);
    });
});

function Initialize() {
    var mapObjArray = [];

    mapObjArray[0] = new MapRect(new Location(50, 50), new Size(unit, unit), Region._Corner, false, DrawFunc.FilledRect);
    mapObjArray[1] = new MapRect(new Location(100, 50), new Size(unit, unit), Region.Red, false, DrawFunc.FilledRect);
    mapObjArray[2] = new MapRect(new Location(150, 50), new Size(unit, unit), Region.Blue, false, DrawFunc.FilledRect);
    mapObjArray[3] = new MapRect(new Location(200, 50), new Size(unit, unit), Region.Orange, false, DrawFunc.FilledRect);
    mapObjArray[4] = new MapRect(new Location(250, 50), new Size(unit, unit), Region.Yellow, false, DrawFunc.FilledRect);
    mapObjArray[5] = new MapTriangle(new Location(50, 100), new Size(unit, unit), Region._Corner, TriangleDirection.TopLeft, DrawFunc.FilledTriangle);
    mapObjArray[6] = new MapTriangle(new Location(100, 100), new Size(unit, unit), Region._Corner, TriangleDirection.TopRight, DrawFunc.FilledTriangle);
    mapObjArray[7] = new MapTriangle(new Location(150, 100), new Size(unit, unit), Region._Corner, TriangleDirection.BottomLeft, DrawFunc.FilledTriangle);
    mapObjArray[8] = new MapTriangle(new Location(200, 100), new Size(unit, unit), Region._Corner, TriangleDirection.BottomRight, DrawFunc.FilledTriangle);
    mapObjArray[9] = new MapCircleAnother(new Location(60, 160), 10, Region._Corner, DrawFunc.FilledCircleAnother);
    mapObjArray[10] = new MapCircle(new Location(100, 150), new Size(unit, unit), Region.Red, DrawFunc.FilledCircle);
    mapObjArray[11] = new MapCircle(new Location(150, 150), new Size(unit, unit), Region.Blue, DrawFunc.FilledCircle);
    mapObjArray[12] = new MapCircle(new Location(200, 150), new Size(unit, unit), Region.Orange, DrawFunc.FilledCircle);
    mapObjArray[13] = new MapCircle(new Location(250, 150), new Size(unit, unit), Region.Yellow, DrawFunc.FilledCircle);

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

    $("#output").html(event.keyCode);
}