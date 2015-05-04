/**
 * Created by Drake on 2015/5/3.
 */
var metroContent = new metro_itemManager();

var metro_theme = {
    "dark": "dark",
    "light": "light"
};

function metro_itemManager() {
    this.items = [];
    this.defaultTheme = "dark";
    this.getItem = function (key, theme) {
        var localTheme = (!!theme) ? theme : this.defaultTheme;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].key == key && this.items[i].theme == localTheme) {
                return this.items[i];
            }
        }
        return null;
    };
    this.getValue = function (key, theme) {
        return this.getItem(key, theme).value;
    };
    this.push = function (obj) {
        this.items.push(obj);
    }
}

function metro_item(key, value, theme) {
    this.key = key;
    this.value = value;
    this.theme = theme;
}

$(function () {
    var theme = metro_theme.dark;
    metroContent.defaultTheme = metro_theme.dark;
    metroContent.push(new metro_item("color:metro-navigate-dropdown-menu-normal", "#ffffff", theme));
    metroContent.push(new metro_item("color:metro-navigate-dropdown-menu-over", "#a5a5a5", theme));
    metroContent.push(new metro_item("color:metro-navigate-dropdown-menu-bg-normal", "#767676", theme));
    metroContent.push(new metro_item("color:metro-navigate-dropdown-menu-bg-over", "#000000", theme));
    metroContent.push(new metro_item("color:metro-content-link-normal", "#79bbeb", theme));
    metroContent.push(new metro_item("color:metro-content-link-over", "#8fcfc3", theme));
    metroContent.push(new metro_item("color:metro-content-link-down", "#7bb7ab", theme));
    metroContent.push(new metro_item("color:metro-content-button-bg-normal", "#79bbeb", theme));
    metroContent.push(new metro_item("color:metro-content-button-bg-over", "#8fcfc3", theme));
    metroContent.push(new metro_item("color:metro-content-button-bg-down", "#7bb7ab", theme));
    metroContent.push(new metro_item("color:metro-comment-page-bg-normal", "#689977", theme));
    metroContent.push(new metro_item("color:metro-comment-page-bg-over", "#73a886", theme));
    metroContent.push(new metro_item("color:metro-comment-page-bg-down", "#5e8a6b", theme));
    metroContent.push(new metro_item("color:metro-submit-text-btn-bg-normal", "#689977", theme));
    metroContent.push(new metro_item("color:metro-submit-text-btn-bg-over", "#73a886", theme));
    metroContent.push(new metro_item("color:metro-submit-text-btn-bg-down", "#5e8a6b", theme));


    //导航栏下拉菜单
    $(".metro-navigate-dropdown-menu").hover(function () {
        $(this).stop().animate({"color": metroContent.getValue("color:metro-navigate-dropdown-menu-over"), "background-color": metroContent.getValue("color:metro-navigate-dropdown-menu-bg-over")}, "normal");
    }, function () {
        $(this).stop().animate({"color": metroContent.getValue("color:metro-navigate-dropdown-menu-normal"), "background-color": metroContent.getValue("color:metro-navigate-dropdown-menu-bg-normal")}, "normal");
    });

    //正文连接
    $(".metro-content-link,.metro-content-link-block a")
        .hover(function () {
            $(this).stop().animate({"color": metroContent.getValue("color:metro-content-link-over")}, 120);
        }, function () {
            $(this).stop().animate({"color": metroContent.getValue("color:metro-content-link-normal")}, 120);
        })
        .mousedown(function () {
            $(this).stop().animate({"color": metroContent.getValue("color:metro-content-link-down")}, 120);
        })
        .mouseup(function () {
            $(this).stop().animate({"color": metroContent.getValue("color:metro-content-link-over")}, 120);
        });

    //正文按钮
    $(".metro-content-button")
        .hover(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-content-button-bg-over")}, 120);
        }, function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-content-button-bg-normal")}, 120);
        })
        .mousedown(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-content-button-bg-down")}, 120);
        })
        .mouseup(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-content-button-bg-over")}, 120);
        });

    //页切换
    $(".metro-page-prev,.metro-page-next,.metro-page-number")
        .hover(function () {
            if (!$(this).is(".metro-page-disable"))
                $(this).stop().animate({"background-color": metroContent.getValue("color:metro-comment-page-bg-over")}, 120);
        }, function () {
            if (!$(this).is(".metro-page-disable"))
                $(this).stop().animate({"background-color": metroContent.getValue("color:metro-comment-page-bg-normal")}, 120);
        })
        .mousedown(function () {
            if (!$(this).is(".metro-page-disable"))
                $(this).stop().animate({"background-color": metroContent.getValue("color:metro-comment-page-bg-down")}, 120);
        })
        .mouseup(function () {
            if (!$(this).is(".metro-page-disable"))
                $(this).stop().animate({"background-color": metroContent.getValue("color:metro-comment-page-bg-over")}, 120);
        });

    //提交按钮
    $(".metro-submit-text-btn")
        .hover(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-submit-text-btn-bg-over")}, 120);
        }, function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-submit-text-btn-bg-normal")}, 120);
        })
        .mousedown(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-submit-text-btn-bg-down")}, 120);
        })
        .mouseup(function () {
            $(this).stop().animate({"background-color": metroContent.getValue("color:metro-submit-text-btn-bg-over")}, 120);
        });
});