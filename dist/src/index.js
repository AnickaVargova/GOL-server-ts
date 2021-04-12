"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var fs_1 = __importDefault(require("fs"));
var blinker_1 = __importDefault(require("./settings/blinker"));
var example_1 = __importDefault(require("./settings/example"));
var toad_1 = __importDefault(require("./settings/toad"));
var beacon_1 = __importDefault(require("./settings/beacon"));
var pentadecathlon_1 = __importDefault(require("./settings/pentadecathlon"));
var pulsar_1 = __importDefault(require("./settings/pulsar"));
var random_1 = __importDefault(require("./settings/random"));
var newPatterns = __importStar(require("../responseUpdate"));
var utils_1 = require("./utils");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var response = {
    example: example_1.default,
    blinker: blinker_1.default,
    toad: toad_1.default,
    beacon: beacon_1.default,
    pentadecathlon: pentadecathlon_1.default,
    pulsar: pulsar_1.default,
    random: random_1.default(),
};
var newResponse = __assign(__assign({}, response), newPatterns);
app.get("/random", function (req, res) { return res.send(random_1.default()); });
app.get("/:setting", function (req, res) {
    //@ts-expect-error
    if (newResponse[req.params.setting]) {
        //@ts-expect-error
        res.send(newResponse[req.params.setting]);
    }
    else {
        res.send("");
    }
});
app.get("/", function (req, res) { return res.send(Object.keys(newResponse)); });
app.post("/:setting", function (req, res) {
    var newPattern = req.body;
    var patternName = req.params.setting;
    // @ts-expect-error
    newResponse[patternName] = newPattern;
    fs_1.default.appendFileSync("responseUpdate.ts", utils_1.buildTsGameOfLifePattern(patternName, newPattern));
});
app.listen(8080);
