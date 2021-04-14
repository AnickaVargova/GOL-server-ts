"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var random_1 = __importDefault(require("./random"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get("/random", function (req, res) { return res.send(random_1.default()); });
app.get("/:setting", function (req, res) {
    var patternName = req.params.setting;
    var patternPath = path_1.default.join(__dirname, "./settings/" + patternName + ".json");
    fs_1.default.access(patternPath, fs_1.default.constants.R_OK, function (err) {
        if (err) {
            console.error("File not found");
            return;
        }
    });
    var loadedData = fs_1.default.readFileSync(patternPath);
    res.send(loadedData);
});
app.post("/:setting", function (req, res) {
    var newPattern = req.body;
    var patternName = req.params.setting;
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "./settings/" + patternName + ".json"), JSON.stringify(newPattern));
});
app.listen(8080);
