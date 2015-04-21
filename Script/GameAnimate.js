/**
 * Created by Drake on 2015/4/6.
 */
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

/**
 * 节点移动
 * @param sender 被移动元素
 * @param nodeArray 移动路径点
 * @param speed 移动速度
 * @param callback 调用
 * @param state 状态
 * @returns {*}
 */
var nodeMoveAnimate = function (sender, nodeArray, speed, state, callback) {
    if (nodeArray.length <= 0) {
        return undefined;
    }

    var obj = {};

    obj.sender = sender;
    obj.nodeArray = nodeArray;
    obj.speed = speed;
    obj.state = state;
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
                Utils.DamageHit(obj.nodeArray[obj.index].hit, obj.sender.bindPlane.region, obj.nodeArray[obj.index].whereAmI, obj.nodeArray[obj.index].index);
            }

            //检查是否包含下一个路径点
            if (obj.index < obj.nodeArray.length - 1) {
                obj.index++;

                while (true) {//检查坐标是否和当前位置一致 如果一致则跳过检查下一个位置的位移
                    if (Utils.ComparePoint(obj.sender.position, obj.nodeArray[obj.index].position, 0, 0)) {
                        //碰撞判定
                        if (obj.nodeArray[obj.index].hit) {
                            Utils.DamageHit(obj.nodeArray[obj.index].hit, obj.sender.bindPlane.region, obj.nodeArray[obj.index].whereAmI, obj.nodeArray[obj.index].index);
                        }
                        if (++obj.index >= obj.nodeArray.length) {
                            //同步数据
                            obj.sender.whereAmI = obj.nodeArray[obj.nodeArray.length - 1].whereAmI;
                            obj.sender.nowRouteIndex = obj.nodeArray[obj.nodeArray.length - 1].index;
                            obj.sender.animate = undefined;
                            //触发结束事件
                            if (obj.callback){
                                obj.callback(obj, obj.state);
                            }
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
                if (obj.callback){
                    obj.callback(obj, obj.state);
                }
            }
        }
    };

    return obj;
};