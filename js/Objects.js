/**
 * Created by Drake on 2015/3/18.
 */

/**
 * ȫ�ֱ�������������
 * @type {null}
 */
var gameArea = null;

/**
 * �ࣺ��Ϸ
 * @type {{MapObjs: null, Initialize: Initialize, GameStart: GameStart}}
 */
var Game = {
    "MapObjs": null,

    Initialize: function (MapObjects) {
        var game = Game;

        game.MapObjs = MapObjects;

        return game;
    },

    GameStart: function () {
        setInterval(function () {
            for (var mo in this.MapObjs) {
                if (mo.Draw != null)
                    mo.Draw();
            }
        }, (1000 / 100));
    },

    GetObjs: function () {
        return MapObject;
    }
};

/**
 * �ࣺ���ϵ�ͼԪ��
 * @type {{Location: null, Size: null, Region: null, canJump: null, Draw: null, CreateNew: CreateNew}}
 */
var MapObject = {
    "Location": null,
    "Size": null,
    "Region": null,
    "canJump": null,
    Draw: null,

    CreateNew: function (location, size, region, canJump, func) {
        var mapo = MapObject;

        mapo.Location = location;
        mapo.Size = size;
        mapo.Region = region;
        mapo.canJump = canJump;
        mapo.Draw = func;

        return mapo;
    }
};

/**
 * �ࣺ��С
 * @type {{Width: number, Height: number, CreateNew: CreateNew}}
 */
var Size = {
    "Width": -1,
    "Height": -1,
    CreateNew: function (width, height) {
        var size = Size;

        size.Width = width;
        size.Height = height;

        return size;
    }
};

/**
 * �ࣺ����
 * @type {{X: number, Y: number, CreateNew: CreateNew}}
 */
var Location = {
    "X": -1,
    "Y": -1,
    CreateNew: function (x, y) {
        var location = Location;

        location.X = x;
        location.Y = y;

        return location;
    }
};

/**
 * ö�٣�����
 * @type {{_Corner: string, Red: string, Blue: string, Orange: string, Yellow: string}}
 */
var Region = {
    _Corner: "gray",
    Red: "red",
    Blue: "blue",
    Orange: "orange",
    Yellow: "yellow"
};