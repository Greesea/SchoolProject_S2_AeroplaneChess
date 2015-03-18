/**
 * Created by Drake on 2015/3/18.
 */
$(function () {
    Initialize();
    $("#gamearea").attr("width",600).attr("height",480);
});

function Initialize() {
    var mapObjArray = new Array();
    //mapObjArray[0] = MapObject.CreateNew(Location.CreateNew(50, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    //mapObjArray[1] = MapObject.CreateNew(Location.CreateNew(100, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    //mapObjArray[2] = MapObject.CreateNew(Location.CreateNew(150, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    //mapObjArray[3] = MapObject.CreateNew(Location.CreateNew(200, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    //mapObjArray[4] = MapObject.CreateNew(Location.CreateNew(250, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);

    mapObjArray[0] = new MapObject(new Location(50, 50), new Size(20, 20), Region._Corner, false, Draw);
    mapObjArray[1] = new MapObject(new Location(100, 50), new Size(20, 20), Region.Red, false, Draw);
    mapObjArray[2] = new MapObject(new Location(150, 50), new Size(20, 20), Region.Blue, false, Draw);
    mapObjArray[3] = new MapObject(new Location(200, 50), new Size(20, 20), Region.Orange, false, Draw);
    mapObjArray[4] = new MapObject(new Location(250, 50), new Size(20, 20), Region.Yellow, false, Draw);

    gameArea = $("#gamearea")[0].getContext("2d");
    //var game = Game.Initialize(mapObjArray);
    var game = new Game(mapObjArray);
    game.GameStart();
}

function Draw() {
    gameArea.fillStyle = this.Region.toString();
    gameArea.fillRect(this.Location.X, this.Location.Y, this.Size.Width, this.Size.Height);
}