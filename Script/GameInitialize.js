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
                })
        }

        stage.addChild(btn);
    }

    var gamestage = new Stage(stage, "mainmenu");
    stages.list.push(gamestage);
}

function GameInitializeGameStage() {
    var route = [];

    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(100, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(150, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(200, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(250, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(300, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(350, 50)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(350, 100)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(350, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(300, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(250, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(200, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(150, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(100, 150)));
    route.push(new GameRouteNode(Region.tableCorner, null, null, null, new PIXI.Point(100, 100)));

    var hangar = [];
    hangar.push(new GameHangar([new PIXI.Point(400, 350), new PIXI.Point(400, 400), new PIXI.Point(400, 450), new PIXI.Point(450, 400), new PIXI.Point(450, 450)], Region.player1, Direction.up));
    hangar.push(new GameHangar([new PIXI.Point(600, 350),new PIXI.Point(600, 400), new PIXI.Point(600, 450), new PIXI.Point(650, 400), new PIXI.Point(650, 450)], Region.player3, Direction.up));

    var gamelogic = new GameLogic(route, null, hangar);

    var playerlogic = new PlayerLogic(null, [new GamePlayer(null, Region.player1, false), null, new GamePlayer(null, Region.player3, false), null]);

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