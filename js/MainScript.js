/**
 * Created by Drake on 2015/3/18.
 */
function Initialize() {
    var mapObjArray = new Array();
    mapObjArray[0] = MapObject.CreateNew(Location.CreateNew(50, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    mapObjArray[1] = MapObject.CreateNew(Location.CreateNew(100, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    mapObjArray[2] = MapObject.CreateNew(Location.CreateNew(150, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    mapObjArray[3] = MapObject.CreateNew(Location.CreateNew(200, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);
    mapObjArray[4] = MapObject.CreateNew(Location.CreateNew(250, 50), Size.CreateNew(20, 20), Region.Red, false, Draw);

    gameArea = $("#gamearea")[0].getContext("2d");
    var game = Game.Initialize(mapObjArray);
    console.log(game.GetObjs());
    game.GameStart();
}

function Draw() {
    gameArea.fillStyle = this.Region.toString();
    gameArea.fillRect(this.Location.X, this.Location.Y, this.Size.Width, this.Size.Height);
    console.log("draw! " + this.Location.X + " " + this.Location.Y + " " + this.Size.Width + " " + this.Size.Height);
}