/**
 * Created by Drake on 2015/4/6.
 */

//创建渲染器
var renderer = PIXI.autoDetectRenderer(800, 600);
var nowStage;
var stages;

$(function () {
    document.body.appendChild(renderer.view);
    stages = Stages();

    GameInitializeMainMenu();
    GameInitializeTestMenu();
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
                    setTimeout(function () {
                        nowStage.parentView.playerLogic.start();
                    }, 2000);
                })
        }

        stage.addChild(btn);
    }

    var gamestage = new Stage(stage, "mainmenu");
    stages.list.push(gamestage);
}

function GameInitializeGameStage() {
    var route = [];

    //从中间的红色节点为起始点
    /*                            所属玩家         转向               结束到        跳跃到           路径点               */
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(450,77.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(479.5,77.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(509.5,77.5)));
    route.push(new GameRouteNode(Region.player1, Direction.down,   null/*TODO*/, null, new PIXI.Point(543.5,88.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(554.5,121.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(554.5,151.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(542.5,184.5)));
    route.push(new GameRouteNode(Region.player1, Direction.right,  null/*TODO*/, null, new PIXI.Point(565.5,207.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(599.5,196.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(627.5,196.5)));
    route.push(new GameRouteNode(Region.player4, Direction.down,   null/*TODO*/, null, new PIXI.Point(660.5,208)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(672.5,240.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(672.5,270.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(672.5,300.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(672.5,330.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(672.5,359.5)));
    route.push(new GameRouteNode(Region.player2, Direction.left,   null/*TODO*/, null, new PIXI.Point(661,392.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(627.5,404.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(599.5,404.5)));
    route.push(new GameRouteNode(Region.player1, Direction.down,   null/*TODO*/, null, new PIXI.Point(565.5,393)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(543.5,416.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(554.5,449.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(554.5,479.5)));
    route.push(new GameRouteNode(Region.player1, Direction.left,   null/*TODO*/, null, new PIXI.Point(543,513.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(509.5,524.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(479.5,524.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(449.5,524.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(420.5,524.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(390.5,524.5)));
    route.push(new GameRouteNode(Region.player3, Direction.up,     null/*TODO*/, null, new PIXI.Point(357.5,513.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(346.5,479.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(346.5,449.5)));
    route.push(new GameRouteNode(Region.player2, Direction.left,   null/*TODO*/, null, new PIXI.Point(357.5,416.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(333,393.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(301.5,404.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(271.5,404.5)));
    route.push(new GameRouteNode(Region.player2, Direction.up,     null/*TODO*/, null, new PIXI.Point(237.5,393)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(226.5,359.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(226.5,329.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(226.5,300.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(226.5,270.5)));
    route.push(new GameRouteNode(Region.player3, null,             null/*TODO*/, null, new PIXI.Point(226.5,241.5)));
    route.push(new GameRouteNode(Region.player4, Direction.right,  null/*TODO*/, null, new PIXI.Point(238,207.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(270.5,196.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(300.5,196.5)));
    route.push(new GameRouteNode(Region.player3, Direction.up,     null/*TODO*/, null, new PIXI.Point(334.5,207.5)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(357,184.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(345.5,151.5)));
    route.push(new GameRouteNode(Region.player2, null,             null/*TODO*/, null, new PIXI.Point(345.5,121.5)));
    route.push(new GameRouteNode(Region.player3, Direction.right,  null/*TODO*/, null, new PIXI.Point(356.5,88)));
    route.push(new GameRouteNode(Region.player4, null,             null/*TODO*/, null, new PIXI.Point(390.5,77.5)));
    route.push(new GameRouteNode(Region.player1, null,             null/*TODO*/, null, new PIXI.Point(420.5,77.5)));

    var hangar = [];
    hangar.push(new GameHangar([new PIXI.Point(204.3, 186.6), new PIXI.Point(214.5, 115.81), new PIXI.Point(265.19, 115.81), new PIXI.Point(265.19, 64.5), new PIXI.Point(214.5, 64.5)], 42/*TODO*/, Region.player1, Direction.down));
    hangar.push(new GameHangar([new PIXI.Point(566.1, 55.8), new PIXI.Point(634.5, 64.5), new PIXI.Point(634.5, 115.81), new PIXI.Point(685.19, 115.81), new PIXI.Point(685.19, 64.5)], 3/*TODO*/, Region.player2, Direction.left));
    hangar.push(new GameHangar([new PIXI.Point(696.6, 413.1), new PIXI.Point(685.19, 484.5), new PIXI.Point(634.5, 484.5), new PIXI.Point(634.5, 535.81), new PIXI.Point(685.19, 535.81)], 16/*TODO*/, Region.player3, Direction.up));
    hangar.push(new GameHangar([new PIXI.Point(337.92, 549.13), new PIXI.Point(265.19, 535.81), new PIXI.Point(265.19, 484.5), new PIXI.Point(214.5, 484.5), new PIXI.Point(214.5, 535.81)], 29/*TODO*/, Region.player4, Direction.right));

    var gamelogic = new GameLogic(route, null, hangar);

    var playerlogic = new PlayerLogic();
    playerlogic.player[0] = new GamePlayer(null, Region.player1, false);
    playerlogic.player[1] = new GamePlayer(null, Region.player2, false);
    playerlogic.player[2] = new GamePlayer(null, Region.player3, false);
    playerlogic.player[3] = new GamePlayer(null, Region.player4, false);
    playerlogic.bindObjParent();

    var view = new GameView(gamelogic, playerlogic);

    var gamestage = new Stage(view.gameStage, "game");
    stages.list.push(gamestage);
}

/*=====================TEST=====================*/
function GameInitializeTestMenu() {
    var stage = new PIXI.Container();
    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    background.interactive = true;
    stage.addChild(background);

    var icon = new PIXI.Sprite(PIXI.Texture.fromImage("../Resources/InGame/PlaneImage.ico"));
    icon.anchor.set(0.5);

    icon.position.set(150, 150);

    icon.width = 32;
    icon.height = 32;

    background
        .on("click", function (e) {
            if (!!icon.animate) {
                icon.animate.targetLocArray.push(e.data.global.clone());
            } else {
                icon.animate = moveAnimate(icon, [e.data.global.clone()], 5, function () {
                    console.log("complete");
                });
            }
        });

    stage.addChild(icon);

    stage.update = function () {
        icon.rotation += 0.01;

        for (var i = 0; i < this.children.length; i++) {
            if (!!this.children[i].animate) {
                this.children[i].animate.update();
            }
        }
    };

    //添加舞台到列表
    var gamestage = new Stage(stage, "singleplaysettings");
    stages.list.push(gamestage);
}