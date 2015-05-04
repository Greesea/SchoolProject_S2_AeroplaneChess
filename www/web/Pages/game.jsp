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
    <title>游戏 - 飞行棋</title>
    <link rel="stylesheet" href="../Style/metro.css"/>
    <link rel="stylesheet" href="../Style/game.css"/>

    <script src="../Script/library/jquery-1.11.1.js"></script>
    <script src="../Script/library/jquery.animate-colors.js"></script>
    <script src="../Script/metro.js"></script>
    <script src="../Script/library/pixi.js"></script>
    <script src="../Script/game/GameAnimate.js"></script>
    <script src="../Script/game/GameEffect.js"></script>
    <script src="../Script/game/GameObject.js"></script>
    <script src="../Script/game/GameInitialize.js"></script>
</head>
<body>
<div id="container">
    <%@include file="head.jsp" %>
    <div id="inner" class="navMenu-pos_repair">
        <div id="innerItem">
        </div>
    </div>
    <%@include file="foot.jsp" %>
</div>
</body>
</html>