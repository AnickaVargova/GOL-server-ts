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
    var fileExists = fs_1.default.existsSync(patternPath);
    if (fileExists) {
        var loadedData = fs_1.default.readFileSync(patternPath);
        res.send(loadedData);
    }
    else {
        res.status(400).send();
        return;
    }
});
app.get("/", function (req, res) {
    var fileNames = fs_1.default
        .readdirSync(path_1.default.join(__dirname, "./settings"))
        .map(function (name) { return name.slice(0, -5); });
    res.send(fileNames);
});
app.post("/:setting", function (req, res) {
    var newPattern = req.body;
    var patternName = req.params.setting;
    var patternPath = path_1.default.join(__dirname, "./settings/" + patternName + ".json");
    var fileExists = fs_1.default.existsSync(patternPath);
    if (fileExists) {
        return res.status(400).send({
            error: "Pattern name already exists",
        });
    }
    fs_1.default.writeFileSync(patternPath, JSON.stringify(newPattern));
    res.send(newPattern);
});
app.put("/:setting", function (req, res) {
    var pattern = req.body;
    var patternName = req.params.setting;
    var patternPath = path_1.default.join(__dirname, "./settings/" + patternName + ".json");
    fs_1.default.writeFileSync(patternPath, JSON.stringify(pattern));
    res.send(pattern);
});
app.listen(8080);
