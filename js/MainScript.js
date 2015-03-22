/**
 * Created by Drake on 2015/3/18.
 */

$(function () {
    Initialize();
});

function controlsOnClick() {
    this.ForeColor = "Black";
    //this.Text = prompt("请输入", "test");
}

function controlsOnMouseDown() {
    this.BackColor = "green";
}

function controlsOnHover() {
    this.BackColor = "orange";
    console.log("hover");
}

function controlsOnLeave() {
    this.BackColor = "red";
    this.ForeColor = "white";
}

function Initialize() {
    var jqCanvas = $("#gamearea");
    jqCanvas.attr("width", 600).attr("height", 480);
    gameArea = jqCanvas[0].getContext("2d");
    mouseInput = new MouseInputState(jqCanvas);

    var array = [];

    array[0] = new MenuButton(null, new Location(60, 110), 1, new Size(150, 150), "单人游戏", "20pt 微软雅黑", new Location(22, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);

    var MainMenu = new GameMenu(array, "gray");
    var game = new Game(MainMenu);

    game.GameStart();

    //gameArea.font = "36pt 微软雅黑";
    //gameArea.fillText("Test", 50, 50, 9999);
}