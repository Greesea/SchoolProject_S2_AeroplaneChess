/**
 * Created by Drake on 2015/4/6.
 */

//创建渲染器
var renderer = PIXI.autoDetectRenderer(800, 600);
var nowStage;
var stages;

$(function () {
    $("#innerItem").append(renderer.view);
    stages = Stages();

    //加载共通资源文件
    Utils.DiceAnimate = [PIXI.Texture.fromImage("../Resources/InGame/dice-1.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-2.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-3.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-4.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-5.png"), PIXI.Texture.fromImage("../Resources/InGame/dice-6.png")];
    Utils.PlaneIcons = [PIXI.Texture.fromImage("../Resources/InGame/plane-p1.png"), PIXI.Texture.fromImage("../Resources/InGame/plane-p2.png"), PIXI.Texture.fromImage("../Resources/InGame/plane-p3.png"), PIXI.Texture.fromImage("../Resources/InGame/plane-p4.png")];
    Utils.PanelPlayerBG = [PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p1.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p2.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p3.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p4.png")];
    Utils.PanelPlayerBG_cover = [PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p1-cover.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p2-cover.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p3-cover.png"), PIXI.Texture.fromImage("../Resources/InGame/leftPanel-p4-cover.png")];

    //加载菜单
    GameInitializeMainMenu();
    GameInitializeGameStage();

    //设置当前渲染
    nowStage = stages.getStageByName("mainmenu");
    //开始渲染
    rendererLoop();
});

function rendererLoop() {
    if (!!nowStage.update) {
        nowStage.update();
    }

    renderer.render(nowStage);
    requestAnimationFrame(rendererLoop);
}

function GameInitializeMainMenu() {
    var stage = new PIXI.Container();

    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    background.width = renderer.width;
    background.height = renderer.height;
    stage.addChild(background);

    var btnLocArray = [
        new PIXI.Point(140, 240),
        new PIXI.Point(340, 240),
        new PIXI.Point(540, 240),
        new PIXI.Point(140, 450),
        new PIXI.Point(340, 450)
    ];
    var btnTexture = PIXI.Texture.fromImage("../Resources/MainMenu/SinglePlayBTN_normal.png");

    for (var i = 0; i < btnLocArray.length; i++) {
        var btn = new PIXI.Sprite(btnTexture);//创建精灵
        btn.buttonMode = true;//打开按钮模式
        btn.interactive = true;//设置可交互

        //设置中心点居中
        btn.anchor.set(0.5);

        //设置坐标
        btn.position.x = btnLocArray[i].x;
        btn.position.y = btnLocArray[i].y;

        //设置大小
        btn.width = 180;
        btn.height = 180;

        //设置边框渲染器
        btn.border = new PIXI.Graphics();
        btn.addChild(btn.border);

        //绑定事件
        bindBtnEffect(btn, 0xffff00);

        if (i == 2) {
            btn
                .on("click", function () {
                    nowStage = stages.getStageByName("game");
                    nowStage.parentView.start();
                })
        }

        stage.addChild(btn);
    }

    var gamestage = new Stage(stage, "mainmenu");
    stages.list.push(gamestage);
}

function GameInitializeGameStage() {
    var route = [];
    route.push(new GameRouteNode(Region.player2, null, true, null, new PIXI.Point(450, 77.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(5, false, null, null), new PIXI.Point(479.5, 77.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(6, false, null, null), new PIXI.Point(509.5, 77.5)));
    route.push(new GameRouteNode(Region.player1, Direction.down, false, new GameRouteJump(7, false, null, null), new PIXI.Point(543.5, 88.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(8, false, null, null), new PIXI.Point(554.5, 121.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(9, false, null, null), new PIXI.Point(554.5, 151.5)));
    route.push(new GameRouteNode(Region.player4, Direction.right, false, new GameRouteJump(10, false, null, null), new PIXI.Point(542.5, 184.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(19, true, Region.player3, Direction.down), new PIXI.Point(565.5, 207.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(12, false, null, null), new PIXI.Point(599.5, 196.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(13, false, null, null), new PIXI.Point(627.5, 196.5)));
    route.push(new GameRouteNode(Region.player4, Direction.down, false, new GameRouteJump(14, false, null, null), new PIXI.Point(660.5, 208)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(15, false, null, null), new PIXI.Point(672.5, 240.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(16, false, null, null), new PIXI.Point(672.5, 270.5)));
    route.push(new GameRouteNode(Region.player3, null, true, null, new PIXI.Point(672.5, 300.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(18, false, null, null), new PIXI.Point(672.5, 330.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(19, false, null, null), new PIXI.Point(672.5, 359.5)));
    route.push(new GameRouteNode(Region.player2, Direction.left, false, new GameRouteJump(20, false, null, null), new PIXI.Point(661, 392.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(21, false, null, null), new PIXI.Point(627.5, 404.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(22, false, null, null), new PIXI.Point(599.5, 404.5)));
    route.push(new GameRouteNode(Region.player1, Direction.down, false, new GameRouteJump(23, false, null, null), new PIXI.Point(565.5, 393)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(32, true, Region.player4, Direction.left), new PIXI.Point(543.5, 416.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(25, false, null, null), new PIXI.Point(554.5, 449.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(26, false, null, null), new PIXI.Point(554.5, 479.5)));
    route.push(new GameRouteNode(Region.player1, Direction.left, false, new GameRouteJump(27, false, null, null), new PIXI.Point(543, 513.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(28, false, null, null), new PIXI.Point(509.5, 524.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(29, false, null, null), new PIXI.Point(479.5, 524.5)));
    route.push(new GameRouteNode(Region.player4, null, true, null, new PIXI.Point(449.5, 524.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(31, false, null, null), new PIXI.Point(420.5, 524.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(32, false, null, null), new PIXI.Point(390.5, 524.5)));
    route.push(new GameRouteNode(Region.player3, Direction.up, false, new GameRouteJump(33, false, null, null), new PIXI.Point(357.5, 513.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(34, false, null, null), new PIXI.Point(346.5, 479.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(35, false, null, null), new PIXI.Point(346.5, 449.5)));
    route.push(new GameRouteNode(Region.player2, Direction.left, false, new GameRouteJump(36, false, null, null), new PIXI.Point(357.5, 416.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(45, true, Region.player1, Direction.up), new PIXI.Point(333, 393.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(38, false, null, null), new PIXI.Point(301.5, 404.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(39, false, null, null), new PIXI.Point(271.5, 404.5)));
    route.push(new GameRouteNode(Region.player2, Direction.up, false, new GameRouteJump(40, false, null, null), new PIXI.Point(237.5, 393)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(41, false, null, null), new PIXI.Point(226.5, 359.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(42, false, null, null), new PIXI.Point(226.5, 329.5)));
    route.push(new GameRouteNode(Region.player1, null, true, null, new PIXI.Point(226.5, 300.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(44, false, null, null), new PIXI.Point(226.5, 270.5)));
    route.push(new GameRouteNode(Region.player3, null, false, new GameRouteJump(45, false, null, null), new PIXI.Point(226.5, 241.5)));
    route.push(new GameRouteNode(Region.player4, Direction.right, false, new GameRouteJump(46, false, null, null), new PIXI.Point(238, 207.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(47, false, null, null), new PIXI.Point(270.5, 196.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(48, false, null, null), new PIXI.Point(300.5, 196.5)));
    route.push(new GameRouteNode(Region.player3, Direction.up, false, new GameRouteJump(49, false, null, null), new PIXI.Point(334.5, 207.5)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(6, true, Region.player2, Direction.right), new PIXI.Point(357, 184.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(51, false, null, null), new PIXI.Point(345.5, 151.5)));
    route.push(new GameRouteNode(Region.player2, null, false, new GameRouteJump(0, false, null, null), new PIXI.Point(345.5, 121.5)));
    route.push(new GameRouteNode(Region.player3, Direction.right, false, new GameRouteJump(1, false, null, null), new PIXI.Point(356.5, 88)));
    route.push(new GameRouteNode(Region.player4, null, false, new GameRouteJump(2, false, null, null), new PIXI.Point(390.5, 77.5)));
    route.push(new GameRouteNode(Region.player1, null, false, new GameRouteJump(3, false, null, null), new PIXI.Point(420.5, 77.5)));

    var end = [];
    end.push(new GameRouteEnd([new PIXI.Point(275, 300.5), new PIXI.Point(304, 300.5), new PIXI.Point(333, 300.5), new PIXI.Point(362, 300.5), new PIXI.Point(391, 300.5), new PIXI.Point(422, 300.5)], Region.player1, Direction.right));
    end.push(new GameRouteEnd([new PIXI.Point(450, 124), new PIXI.Point(450, 153.5), new PIXI.Point(450, 183), new PIXI.Point(450, 212.5), new PIXI.Point(450, 241.5), new PIXI.Point(449.5, 273.5)], Region.player2, Direction.down));
    end.push(new GameRouteEnd([new PIXI.Point(624, 300.5), new PIXI.Point(594.5, 300.5), new PIXI.Point(566, 300.5), new PIXI.Point(537, 300.5), new PIXI.Point(507.5, 300.5), new PIXI.Point(477, 300)], Region.player3, Direction.left));
    end.push(new GameRouteEnd([new PIXI.Point(450, 476.5), new PIXI.Point(450, 447), new PIXI.Point(450, 417.5), new PIXI.Point(450, 388.5), new PIXI.Point(450, 359), new PIXI.Point(450, 326.5)], Region.player4, Direction.up));

    var hangar = [];
    hangar.push(new GameHangar([new PIXI.Point(204.3, 186.6), new PIXI.Point(214.5, 115.81), new PIXI.Point(265.19, 115.81), new PIXI.Point(265.19, 64.5), new PIXI.Point(214.5, 64.5)], 42, Region.player1, Direction.down, Direction.right));
    hangar.push(new GameHangar([new PIXI.Point(566.1, 55.8), new PIXI.Point(634.5, 64.5), new PIXI.Point(634.5, 115.81), new PIXI.Point(685.19, 115.81), new PIXI.Point(685.19, 64.5)], 3, Region.player2, Direction.left, Direction.down));
    hangar.push(new GameHangar([new PIXI.Point(696.6, 413.1), new PIXI.Point(685.19, 484.5), new PIXI.Point(634.5, 484.5), new PIXI.Point(634.5, 535.81), new PIXI.Point(685.19, 535.81)], 16, Region.player3, Direction.up, Direction.left));
    hangar.push(new GameHangar([new PIXI.Point(337.92, 549.13), new PIXI.Point(265.19, 535.81), new PIXI.Point(265.19, 484.5), new PIXI.Point(214.5, 484.5), new PIXI.Point(214.5, 535.81)], 29, Region.player4, Direction.right, Direction.up));

    var gamelogic = new GameLogic(route, end, hangar);

    var playerlogic = new PlayerLogic();
    playerlogic.player[0] = new GamePlayer(Region.player1, true);
    playerlogic.player[1] = new GamePlayer(Region.player2, true);
    playerlogic.player[2] = new GamePlayer(Region.player3, true);
    playerlogic.player[3] = new GamePlayer(Region.player4, true);
    playerlogic.bindObjParent();

    var view = new GameView(gamelogic, playerlogic);

    var gamestage = new Stage(view.gameStage, "game");
    stages.list.push(gamestage);
}