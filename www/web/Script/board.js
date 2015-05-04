/**
 * Created by Drake on 2015/5/4.
 */
var board_nowPage = 1;

$(function () {
    //获取第一页数据
    board_fillPage(1);
    board_adjustPageControl();

    $(".metro-page-prev").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage--;
            board_fillPage(board_nowPage);
            board_adjustPageControl();
        }
    });

    $(".metro-page-next").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage++;
            board_fillPage(board_nowPage);
            board_adjustPageControl();
        }
    });

    $(".metro-page-number").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage = $(this).html();
            board_fillPage(board_nowPage);
            board_adjustPageControl();
        }
    });

    $(".metro-submit-text-btn").click(function () {
        $.ajax({
            url: "ajax/boardAjax.jsp",
            type: "post",
            cache: "false",
            dataType: "json",
            data: "a=test",
            success: function (data) {
                if (data == null) {
                    alert("未知错误");
                } else if (data.code == "0xe1") {
                    alert("无参数");
                } else if (data.code == "0xe2") {
                    alert("过长");
                } else if (data.code == "0xe3") {
                    alert("数据库异常");
                } else if (data.code == "0xff") {
                    alert(data.msg);
                }
            },
            error: function () {
                alert("网络错误")
            }
        });
    });
});

function board_adjustPageControl() {
    $.ajax({
        url: "ajax/boardAjax.jsp",
        type: "post",
        cache: "false",
        dataType: "json",
        data: "request=pagemax",
        success: function (data) {
            if (data == null) {
                alert("未知错误");
            } else if (data.code == "0xe1") {
                alert("无参数");
            } else if (data.code == "0xff") {
                if (board_nowPage < 3) {
                    $(".metro-page-block").children().removeClass("metro-page-disable");

                    $("#page1").html(1);
                    $("#page2").html(2);
                    $("#page3").html(3);
                    $(".metro-page-number").each(function () {
                        if ($(this).html() == board_nowPage) {
                            $(this).addClass("metro-page-disable");
                        }
                    });

                    if (board_nowPage == 1) {
                        $(".metro-page-prev").addClass("metro-page-disable");
                    }
                } else if (board_nowPage > data.msg - 2) {
                    $(".metro-page-block").children().removeClass("metro-page-disable");
                    $("#page1").html(data.msg - 2);
                    $("#page2").html(data.msg - 1);
                    $("#page3").html(data.msg);
                    $(".metro-page-number").each(function () {
                        if ($(this).html() == board_nowPage) {
                            $(this).addClass("metro-page-disable");
                        }
                    });

                    if (board_nowPage == data.msg) {
                        $(".metro-page-next").addClass("metro-page-disable");
                    }
                } else {
                    $(".metro-page-block").children().removeClass("metro-page-disable");
                    $("#page1").html(board_nowPage - 1);
                    $("#page2").html(board_nowPage).addClass("metro-page-disable");
                    $("#page3").html(board_nowPage + 1);
                }
            }
        },
        error: function () {
            alert("网络异常");
        }
    });
}

function board_fillPage(page) {
    $("#comments").children().remove();
    $.ajax({
        url: "ajax/boardAjax.jsp",
        type: "post",
        cache: "false",
        dataType: "json",
        data: "request=get&page=" + page,
        success: function (data) {
            if (data == null) {
                alert("未知错误");
            } else if (data.code == "0xe1") {
                alert("无参数");
            } else if (data.code == "0xff") {
                $("#comments").html(data.msg);
            }
        },
        error: function () {
            alert("网络异常");
        }
    });
}