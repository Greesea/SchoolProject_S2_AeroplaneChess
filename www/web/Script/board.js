/**
 * Created by Drake on 2015/5/4.
 */
var board_nowPage = 1;

$(function () {
    //获取第一页数据
    board_adjustPageControl();

    $(".metro-page-prev").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage--;
            board_syncPage($(this));
        }
    });

    $(".metro-page-next").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage++;
            board_syncPage($(this));
        }
    });

    $(".metro-page-number").click(function () {
        if (!$(this).is(".metro-page-disable")) {
            board_nowPage = parseInt($(this).html());
            board_syncPage($(this));
        }
    });

    $(".metro-submit-text-btn").click(function () {
        $.ajax({
            url: "ajax/boardAjax.jsp",
            type: "post",
            cache: "false",
            dataType: "json",
            data: "request=new&poster=" + $("#poster").val().trim() + "&mail=" + $("#mail").val().trim() + "&content=" + $("#content").val().trim(),
            success: function (data) {
                if (data == null) {
                    alert("未知错误");
                } else if (data.code == "0xe1") {
                    alert("提交失败：参数不正确");
                } else if (data.code == "0xe2") {
                    alert("提交失败：用户名或邮箱或内容过长");
                } else if (data.code == "0xe3") {
                    alert("提交失败：内容不能为空")
                } else if (data.code == "0xe4") {
                    alert("提交失败：数据库异常，请联系管理员");
                } else if (data.code == "0xff") {
                    board_nowPage = 1;
                    board_adjustPageControl();
                    board_fillPage(1);
                }
            },
            error: function () {
                alert("网络错误")
            }
        });
    });
});

function board_syncPage(sender) {
    board_adjustPageControl();
    sender.stop().removeAttr("style");
}

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
                alert("请求失败：参数不正确");
            } else if (data.code == "0xff") {
                $(".metro-page-prev,.metro-page-next,.metro-page-number").removeAttr("style").removeClass("metro-page-disable");
                if (data.msg < 3) {
                    $(".metro-page-number").each(function (i, e) {
                        if (i >= data.msg) {
                            $(e).addClass("metro-page-disable");
                        }
                    });
                    $(".metro-page-next").addClass("metro-page-disable");
                }
                if (board_nowPage < 3) {
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
                } else if (board_nowPage > parseInt(data.msg) - 2) {
                    $("#page1").html(parseInt(data.msg) - 2);
                    $("#page2").html(parseInt(data.msg) - 1);
                    $("#page3").html(data.msg);
                    $(".metro-page-number").each(function () {
                        if ($(this).html() == board_nowPage) {
                            $(this).addClass("metro-page-disable");
                        }
                    });

                    if (board_nowPage == parseInt(data.msg)) {
                        $(".metro-page-next").addClass("metro-page-disable");
                    }
                } else {
                    $("#page1").html(board_nowPage - 1);
                    $("#page2").html(board_nowPage).addClass("metro-page-disable");
                    $("#page3").html(board_nowPage + 1);
                }
                board_fillPage(board_nowPage);
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
                alert("请求失败：参数不正确");
            } else if (data.code == "0xff") {
                $("#comments").html(data.msg);
            }
        },
        error: function () {
            alert("网络异常");
        }
    });
}