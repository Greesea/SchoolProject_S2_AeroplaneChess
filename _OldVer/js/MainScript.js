/**
 * Created by Drake on 2015/3/18.
 */
var g;
var mainMenu;
var singlePlayMenu;
var gameView;

$(function () {
    Initialize();
});

function controlsOnClick(obj) {
    //obj.ForeColor = "Black";
    //this.Text = prompt("请输入", "test");
    g.SwapToMenu(singlePlayMenu);
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

function singlePlayBTNClick(obj) {
    g.SwapToMenu(mainMenu);
}

function testGameBTNClick(obj) {
    g.SwapToMenu(gameView);
}

function planeMouseClick(obj) {
    console.log("[Click!]Region:" + obj.Region);
}

function Initialize() {
    //初始化基本组件
    var jqCanvas = $("#gamearea");
    jqCanvas.attr("width", 600).attr("height", 480);
    gameArea = jqCanvas[0].getContext("2d");
    mouseInput = new MouseInputState(jqCanvas);

    //初始化菜单项
    var mainMenuArray = [];
    mainMenuArray[0] = new MenuButton(null, new Location(60, 110), 1, new Size(150, 150), "单人游戏", "20pt 微软雅黑", new Location(22, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, controlsOnClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    mainMenuArray[1] = new MenuButton(null, new Location(60, 280), 1, new Size(150, 150), "测试游戏", "20pt 微软雅黑", new Location(22, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, testGameBTNClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);
    mainMenuArray[2] = new MenuTitle(null, new Location(40, 30), 1, "Title", "18pt 微软雅黑", "blue", "white", Functions.DrawMenuTitle);
    mainMenuArray[3] = new DropdownBox(null, new Location(270, 110), 1, new Size(120, 35), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 2, "14pt 微软雅黑", new Location(54, 23), "red", "white", "black", dropdownClick, null, null, null);
    mainMenuArray[4] = new Label(null, new Location(270, 316), 1, "Label", "36pt 微软雅黑", "white");

    var singlePlayArray = [];
    singlePlayArray[0] = new MenuTitle(null, new Location(40, 30), 1, "SinglePlay", "18pt 微软雅黑", "orange", "white", Functions.DrawMenuTitle);
    singlePlayArray[1] = new MenuButton(null, new Location(60, 110), 1, new Size(150, 150), "返回主菜单", "20pt 微软雅黑", new Location(10, 83), "red", "white", Functions.AreaCheck, Functions.DrawMenuButton, null, singlePlayBTNClick, controlsOnMouseDown, controlsOnHover, controlsOnLeave);

    //var img = new Image();
    //img.src = "../images/MainMenu.png";
    var MainMenu = new GameMenu(mainMenuArray, "gray");
    var SinglePlayerMenu = new GameMenu(singlePlayArray, "gray");
    var game = new Game(MainMenu);

    g = game;
    mainMenu = MainMenu;
    singlePlayMenu = SinglePlayerMenu;

    //初始化游戏内容相关
    var planeImage = new Image();
    planeImage.src = "../images/tempPlaneImage.ico";
    var planeImageList = new PlaneImageList(planeImage, planeImage, planeImage, planeImage);

    var routeArray = [];
    routeArray.push(new GameRouteNote(null, new Location(50, 250), Region.Orange, false, false));
    routeArray.push(new GameRouteNote(null, new Location(100, 250), Region._Corner, true, false));
    routeArray.push(new GameRouteNote(null, new Location(150, 250), Region._Corner, false, false));
    routeArray.push(new GameRouteNote(null, new Location(200, 250), Region._Corner, false, false));
    routeArray.push(new GameRouteNote(null, new Location(250, 250), Region.Orange, false, false));
    routeArray.push(new GameRouteNote(null, new Location(300, 250), Region._Corner, false, false));

    var goalArray = [];
    goalArray.push(new GameGoalPath(null, [new Location(50, 100), new Location(100, 100)], Region.Blue));

    var pairArray = [];
    pairArray.push(new GameTunnelPair(routeArray[0], routeArray[4], goalArray[0], 1));

    var hangerNodeArray = [];
    hangerNodeArray.push(new GameHangarNode(null, new Location(0, 0)));

    var hanger = new GameHangar(null, new Location(50, 50), Region.Orange, hangerNodeArray);

    var planeArray = [];
    planeArray.push(new GamePlane(null, new Location(0, 0), Region.Orange, planeImageList, PlaneDirection.Front, planeMouseClick));

    var playerArray = [];
    playerArray.push(new Player(null, hanger, planeArray));

    var logic = new GameLogic(routeArray, goalArray, pairArray, playerArray);

    var viewer = new GameViewer(logic, null, null);

    gameView = viewer;

    //游戏主控启动
    game.GameStart();
}