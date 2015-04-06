/**
 * Created by Drake on 2015/4/6.
 */
/**
 * 两点之间位移动画逻辑
 * @param sender 被移动元素
 * @param targetLocArray 路径数组
 * @param speed 速度
 * @param callback 回调 参数类型：moveAnimate
 * @returns {*}
 */
var moveAnimate = function (sender, targetLocArray, speed, callback) {
    if (sender.position.x == targetLocArray[0].x && sender.position.y == targetLocArray[0].y) {
        return undefined;
    }

    var obj = {};

    obj.sender = sender;
    obj.targetLocArray = targetLocArray;
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

                //判断路径点为当前点
                if (obj.sender.position.x == obj.targetLocArray[obj.index].x && obj.sender.position.y == obj.targetLocArray[obj.index].y) {
                    obj.sender.animate = undefined;
                    callback(obj);
                }

                //计算每次动画所移动距离
                obj.perMoveX = obj.speed * (-(Math.cos(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an)));
                obj.perMoveY = obj.speed * (Math.sin(Math.atan2(obj.sender.position.x - obj.targetLocArray[obj.index].x, obj.sender.position.y - obj.targetLocArray[obj.index].y) - obj.an));
            } else {
                obj.sender.animate = undefined;
                callback(obj);
            }
        }
    };

    return obj;
};