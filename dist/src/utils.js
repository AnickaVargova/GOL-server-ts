"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTsGameOfLifePattern = void 0;
var buildTsGameOfLifePattern = function (patternName, value) {
    return "export const " + patternName + "\u200B\u200B\u200B\u200B\u200B\u200B\u200B = " + JSON.stringify(value, null, 2) + "\u200B\u200B\u200B\u200B\u200B\u200B\u200B;";
};
exports.buildTsGameOfLifePattern = buildTsGameOfLifePattern;
