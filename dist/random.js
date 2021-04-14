"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBoard = function () {
    var board = [];
    for (var i = 0; i < 20; i++) {
        var row = [];
        for (var j = 0; j < 20; j++) {
            var random = Math.random();
            if (random < 0.5) {
                row.push(true);
            }
            else {
                row.push(false);
            }
        }
        board.push(row);
    }
    return board;
};
exports.default = getBoard;
