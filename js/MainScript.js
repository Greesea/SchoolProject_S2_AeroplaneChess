/**
 * Created by Drake on 2015/3/18.
 */

$(function () {
    Initialize();
});

function controlsOnClick(obj) {
    obj.ForeColor = "Black";
    //this.Text = prompt("请输入", "test");
}

function controlsOnMouseDown(obj) {
    obj.BackColor = "green";
}

function controlsOnHover(obj) {
    obj.BackColor = "orange";
}

function controlsOnLeave(obj) {
    obj.BackColor = "red";
    obj.ForeColor = "white";
}

function dropdownClick(location, state, obj) {
    if (!state) {
        $("#output").html(obj.SelectedValue());
    }
}

function Initialize() {
    var jqCanvas = $("#gamearea");
    jqCanvas.attr("width", 600).attr("height", 480);
    gameArea = jqCanvas[0].getContext("2d");
    mouseInput = new MouseInputState(jqCanvas);

    var array = [];

    array[0] = new MenuButton(null, new Location(60, 110), 1, new Size(150, 150), "单人游戏", "20pt 微软雅黑", new Location(22, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    array[1] = new MenuButton(null, new Location(60, 280), 1, new Size(150, 150), "单人游戏", "20pt 微软雅黑", new Location(22, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    array[2] = new MenuTitle(null, new Location(40, 30), 1, "Title", "18pt 微软雅黑", "blue", "white", Functions.DrawMenuTitle);
    array[3] = new DropdownBox(null, new Location(270, 110), 1, new Size(120, 35), [1, 2, 3, 4], 2, "14pt 微软雅黑", new Location(54, 23), "red", "white", "black", dropdownClick, null, null, null);

    //var img = new Image();
    //img.src = "../images/MainMenu.png";
    var MainMenu = new GameMenu(array, "gray");
    var game = new Game(MainMenu);

    game.GameStart();
}