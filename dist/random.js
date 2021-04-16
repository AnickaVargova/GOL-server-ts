"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getBoard = function () {
    var numberOfRows = Math.ceil(Math.random() * 20);
    var numberOfColumns = Math.ceil(Math.random() * 20);
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
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
