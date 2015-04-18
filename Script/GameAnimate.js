/**
 * Created by Drake on 2015/4/6.
 */
/**
 * 两点之间位移动画逻辑[OUTDATE]
 * @param sender 被移动元素
 * @param targetLocArray 路径数组
 * @param speed 速度
 * @param callback 回调 参数类型：moveAnimate
 * @returns {*}
 * @param directionArray
 */
var moveAnimate = function (sender, targetLocArray, directionArray, speed, callback) {
    if ((sender.position.x == targetLocArray[0].x && sender.position.y == targetLocArray[0].y) || !sender) {
        return undefined;
    }

    var obj = {};

    obj.sender = sender;
    obj.targetLocArray = targetLocArray;
    obj.directionArray = directionArray;
    obj.index = 0;
    obj.speed = speed;
    obj.an = Math.PI * 90 / 180.0;
    obj.perMoveX = obj.speed * (-(Math.cos(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an)));
    obj.perMoveY = obj.speed * (Math.sin(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an));

    obj.update = function () {
        //执行位移
        obj.sender.position.x += obj.perMoveX;
        obj.sender.position.y += obj.perMoveY;

        //计算当前点是否在结束的误差范围内
        if (Math.abs(obj.sender.position.x - obj.targetLocArray[obj.index].x) < (0.5 * speed) && Math.abs(obj.sender.position.y - obj.targetLocArray[obj.index].y) < (0.5 * speed)) {
            //设置当前位置到结束位置
            obj.sender.position.x = obj.targetLocArray[obj.index].x;
            obj.sender.position.y = obj.targetLocArray[obj.index].y;

            //如果包含下一个路径点
            if (obj.index < obj.targetLocArray.length - 1) {
                obj.index++;
                if (!obj.directionArray)
                    if (!obj.directionArray[obj.index])
                        obj.sender.rotation = directionArray[obj.index];

                //判断路径点为当前点
                if (obj.sender.position.x == obj.targetLocArray[obj.index].x && obj.sender.position.y == obj.targetLocArray[obj.index].y) {
                    if (!!callback(obj))
                        obj.sender.animate = undefined;
                } else {
                    //计算每次动画所移动距离
                    obj.perMoveX = obj.speed * (-(Math.cos(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an)));
                    obj.perMoveY = obj.speed * (Math.sin(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an));
                }
            } else {
                if (!!callback(obj))
                    obj.sender.animate = undefined;
            }
        }
    };

    return obj;
};

var switchAnimate = function (sender, picArray, speed, loop, callback) {
    if (picArray.length <= 0 || !sender) {
        return undefined;
    }

    var obj = {};

    obj.sender = sender;
    obj.picArray = picArray;
    obj.index = 0;
    obj.nowTimeout = 0;
    obj.speed = speed;

    obj.sender.texture = picArray[0];

    obj.update = function () {
        if (++obj.nowTimeout > 30 - speed) {
            obj.nowTimeout = 0;
            if (++obj.index >= picArray.length) {
                if (loop) {
                    obj.index = 0;
                } else {
                    if (!!callback(obj))
                        obj.sender.animate = undefined;
                    return;
                }
            }
            obj.sender.texture = picArray[obj.index];
        }
    };

    return obj;
};

var nodeMoveAnimate = function (sender, nodeArray, speed, callback) {
    if (nodeArray.length <= 0) {
        return undefined;
    }

    var obj = {};

    obj.sender = sender;
    obj.nodeArray = nodeArray;
    obj.speed = speed;
    obj.callback = callback;

    obj.index = 0;
    obj.an = Math.PI * 90 / 180.0;
    obj.perMove = null;

    while (true) {//检查坐标是否和当前位置一致 如果一致则跳过检查下一个位置的位移
        if (Utils.ComparePoint(obj.sender.position, obj.nodeArray[obj.index].position, 0, 0)) {
            if (++obj.index >= obj.nodeArray.length) {
                return undefined;
            }
        } else {
            //生成每次Update所移动距离
            obj.perMove = Utils.GeneratePerMove(obj.sender.position, obj.nodeArray[obj.index].position, obj.speed, obj.an);
            break;
        }
    }

    obj.update = function () {
        //位移
        obj.sender.position.x += obj.perMove.x;
        obj.sender.position.y += obj.perMove.y;

        if (Utils.ComparePoint(obj.sender.position, obj.nodeArray[obj.index].position, 0.5, obj.speed)) {
            //调整位置到精准位置
            obj.sender.position.set(obj.nodeArray[obj.index].position.x, obj.nodeArray[obj.index].position.y);
            //设置方向
            if (obj.nodeArray[obj.index].direction != null && obj.nodeArray[obj.index].direction != undefined && obj.nodeArray[obj.index].direction >= 0)
                obj.sender.rotation = Utils.Degree2Radians(obj.nodeArray[obj.index].direction);
            //碰撞判定
            if (obj.nodeArray[obj.index].hit) {
                Utils.DamageHit(obj.nodeArray[obj.index].hit, obj.sender, obj.nodeArray[obj.index].whereAmI, obj.nodeArray[obj.index].index);
            }

            //检查是否包含下一个路径点
            if (obj.index < obj.nodeArray.length - 1) {
                obj.index++;

                while (true) {//检查坐标是否和当前位置一致 如果一致则跳过检查下一个位置的位移
                    if (Utils.ComparePoint(obj.sender.position, obj.nodeArray[obj.index].position, 0, 0)) {
                        //碰撞判定
                        if (obj.nodeArray[obj.index].hit) {
                            Utils.DamageHit(obj.nodeArray[obj.index].hit, obj.sender, obj.nodeArray[obj.index].whereAmI, obj.nodeArray[obj.index].index);
                        }
                        if (++obj.index >= obj.nodeArray.length) {
                            //同步数据
                            obj.sender.whereAmI = obj.nodeArray[obj.nodeArray.length - 1].whereAmI;
                            obj.sender.nowRouteIndex = obj.nodeArray[obj.nodeArray.length - 1].index;
                            obj.sender.animate = undefined;
                            //触发结束事件
                            obj.callback(obj);
                        }
                    } else {
                        //生成每次Update所移动距离
                        obj.perMove = Utils.GeneratePerMove(obj.sender.position, obj.nodeArray[obj.index].position, obj.speed, obj.an);
                        break;
                    }
                }
            } else {
                //同步数据
                obj.sender.bindPlane.whereAmI = obj.nodeArray[obj.nodeArray.length - 1].whereAmI;
                obj.sender.bindPlane.nowRouteIndex = obj.nodeArray[obj.nodeArray.length - 1].index;
                obj.sender.animate = undefined;
                //触发结束事件
                obj.callback(obj);
            }
        }
    };

    return obj;
};