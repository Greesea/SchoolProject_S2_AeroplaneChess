<%--
  Created by IntelliJ IDEA.
  User: Drake
  Date: 2015/5/3
  Time: 19:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="zh-CN">
    <meta charset="UTF-8">
    <title>主页 - 飞行棋</title>
    <link rel="stylesheet" href="../Style/metro.css"/>
    <link rel="stylesheet" href="../Style/index.css"/>

    <script src="../Script/library/jquery-1.11.1.js"></script>
    <script src="../Script/library/jquery.animate-colors.js"></script>
    <script src="../Script/library/jquery.nicescroll.js"></script>
    <script src="../Script/metro.js"></script>
    <script>
        $("html").niceScroll();
    </script>
</head>
<body>
<div id="container">
    <%@include file="head.jsp" %>
    <div id="inner" class="navMenu-pos_repair">
        <div id="innerItem" class="metro-container">
            <br/>
            <br/>
            <span class="metro-content-title">试做型在线飞行棋一一型改</span>
            <span class="metro-content-subtitle">目前尚未完全开发完成</span>
            <br/>
            <br/>
            <a href="game.jsp" class="metro-content-button inner-center" id="inner-goToGame">进入游戏</a>
            <div class="metro-content-link-block"><a href="help.jsp" id="inner-getHelp">查看游戏帮助</a></div>
            <br/>
            <br/>
            <span class="metro-content-title">游戏截图</span>
            <img src="../Images/index/screenshot-0.png" class="inner-center inner-screenshot"/>
            <br/>
            <img src="../Images/index/screenshot-0.png" class="inner-center inner-screenshot"/>
            <br/>
            <img src="../Images/index/screenshot-0.png" class="inner-center inner-screenshot"/>
            <br/>
            <img src="../Images/index/screenshot-0.png" class="inner-center inner-screenshot"/>
        </div>
    </div>
    <%@include file="foot.jsp" %>
</div>
</body>
</html>