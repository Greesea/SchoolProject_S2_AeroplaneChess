/**
 * Created by Drake on 2015/3/18.
 */
var times = 0;
function Initialize() {
    var gameArea = $("#gamearea")[0].getContext("2d");
    setInterval(function () {
        Draw(gameArea);
    }, (1000 / 60));
}

function Draw(gameArea) {
    times++;
    gameArea.clearRect(0, 0, 600, 480);
    gameArea.fillRect(0 + (times * 2), 0, 100, 100);
    console.log(times);
}