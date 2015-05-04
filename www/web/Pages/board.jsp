<%--
  Created by IntelliJ IDEA.
  User: Drake
  Date: 2015/5/4
  Time: 8:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="zh-CN">
    <meta charset="UTF-8">
    <title>讨论板 - 飞行棋</title>
    <link rel="stylesheet" href="../Style/metro.css"/>
    <link rel="stylesheet" href="../Style/board.css"/>

    <script src="../Script/library/jquery-1.11.1.js"></script>
    <script src="../Script/library/jquery.animate-colors.js"></script>
    <script src="../Script/library/jquery.nicescroll.js"></script>
    <script src="../Script/metro.js"></script>
    <script src="../Script/board.js"></script>
    <script>
        $("html").niceScroll();
    </script>
</head>
<body>
<div id="container">
    <%@include file="head.jsp" %>
    <div id="inner" class="navMenu-pos_repair">
        <div id="innerItem" class="metro-container">
            <div id="comments"></div>
            <div class="metro-page-block">
                <span class="metro-page-prev"><</span>
                <span class="metro-page-number" id="page1">1</span>
                <span class="metro-page-number" id="page2">2</span>
                <span class="metro-page-number" id="page3">3</span>
                <span class="metro-page-next">></span>

                <div class="metro-page-clear"></div>
            </div>
            <div class="metro-submit-text-block">
                <table>
                    <tr class="metro-submit-text-attr-block">
                        <td class="metro-submit-text-attr-title">用户名(可选)：</td>
                        <td class="metro-submit-text-attr-input-block">
                            <input class="metro-submit-text-attr-input" type="text"/>
                        </td>
                    </tr>
                    <tr class="metro-submit-text-attr-block">
                        <td class="metro-submit-text-attr-title">邮箱(可选)：</td>
                        <td class="metro-submit-text-attr-input-block">
                            <input class="metro-submit-text-attr-input" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <textarea class="metro-submit-text-area"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="metro-submit-text-btn-block">
                            <div class="metro-submit-text-btn">提交</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <%@include file="foot.jsp" %>
</div>
</body>
</html>