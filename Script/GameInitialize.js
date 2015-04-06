/**
 * Created by Drake on 2015/4/6.
 */

//创建渲染器
var renderer = PIXI.autoDetectRenderer(800, 600);
var nowStage;
var stageArray;

$(function () {
    document.body.appendChild(renderer.view);
    stageArray = GameStages();

    GameInitializeMainMenu();
    GameInitializeTestMenu();

    //设置当前渲染
    nowStage = stageArray.getStageByName("mainmenu");
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
        bindBtnEffect(btn);

        if (i == 2) {
            btn
                .on("click", function () {
                    nowStage = stageArray.getStageByName("singleplaysettings");
                })
                .on("tap", function () {
                    nowStage = stageArray.getStageByName("singleplaysettings");
                });
        }

        stage.addChild(btn);
    }

    var gamestage = new GameStage(stage, "mainmenu");
    stageArray.list.push(gamestage);
}

function GameInitializeTestMenu() {
    var stage = new PIXI.Container();
    var background = PIXI.Sprite.fromImage("../Resources/MainMenu/background.png");
    background.interactive = true;
    stage.addChild(background);

    var icon = new PIXI.Sprite(PIXI.Texture.fromImage("../Resources/tempPlaneImage.ico"));
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
                    alert("complete");
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
    var gamestage = new GameStage(stage, "singleplaysettings");
    stageArray.list.push(gamestage);
}