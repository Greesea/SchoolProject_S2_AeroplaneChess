/**
 * Created by Drake on 2015/4/22.
 */
$(function () {
    var navMenuAnimateState = "close";
    var navMenuTimer = null;

    $(".navMenu-head").hover(function () {
        clearTimeout(navMenuTimer);
        if (navMenuAnimateState != "open" && navMenuAnimateState != "down" && navMenuAnimateState != "left") {
            var content = $(this).find(".navMenu-content");
            content.stop(true);

            switch (navMenuAnimateState) {
                case "close":
                    content.css("width", "120px");
                case "up":
                    navMenuAnimateState = "down";
                    content.animate({"height": "160px"}, "normal", function () {
                        navMenuAnimateState = "left";
                    });
                case "right":
                    navMenuAnimateState = "left";
                    content.animate({"width": "340px"}, "normal", function () {
                        navMenuAnimateState = "open";
                    });
                    break;
            }
        }
    }, function () {
        clearTimeout(navMenuTimer);
        navMenuTimer = setTimeout(hide, 800);

        function hide() {
            if (navMenuAnimateState != "close" && navMenuAnimateState != "right" && navMenuAnimateState != "up") {
                var content = $(".navMenu-head .navMenu-content");
                content.stop(true);
                switch (navMenuAnimateState) {
                    case "open":
                    case "left":
                        navMenuAnimateState = "right";
                        content.animate({"width": "120px"}, "normal", function () {
                            navMenuAnimateState = "up";
                        });
                    case "down":
                        navMenuAnimateState = "up";
                        content.animate({"height": "0px"}, "normal", function () {
                            navMenuAnimateState = "close";
                            $(this).css("width", "0");
                        });
                        break;
                }
            }
        }
    });

    $(".navMenu-item").mouseenter(function () {
        navMenuChangeHint($(this));
    });

    function navMenuChangeHint(sender) {
        if (sender) {
            switch (sender.find("a").html()) {
                case "玩法":
                    $(".navMenu-hint")
                        .html(sender.find("span").html());
                    break;
                case "游戏交流":
                    $(".navMenu-hint")
                        .html(sender.find("span").html());
                    break;

            }
            sender
                .stop()
                .animate({"border-color": "white"}, 300)
                .siblings()
                .stop()
                .animate({"border-color": "#a2a2a2"}, 300);
            $(".navMenu-hint")
                .css("opacity", "0")
                .stop(true)
                .animate({"opacity": "1"}, "slow");
        }
    }

    navMenuChangeHint($(".navMenu-item:eq(0)"));
});