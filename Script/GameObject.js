/**
 * Created by Drake on 2015/4/6.
 */
var GameStages = function () {
    var obj = {};

    obj.list = [];

    obj.getStageByName = function (name) {
        for (var i = 0; i < obj.list.length; i++) {
            if (obj.list[i].name == name) {
                return obj.list[i].stage;
            }
        }

        return null;
    };

    return obj;
};

var GameStage = function (stage, name) {
    var obj = {};

    obj.stage = stage;
    obj.name = name;

    return obj;
};

var Utils = {
    "NullFunc": function () {
    }
};