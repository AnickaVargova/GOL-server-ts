import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import random from "./random";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/random", (req, res) => res.send(random()));

app.get(`/:setting`, (req, res) => {
  //validace -existuje?
  const patternName = req.params.setting;
  const loadedData = fs.readFileSync(
    path.join(__dirname, `./settings/${patternName}.json`)
  );

  res.send(loadedData);
});

app.post("/:setting", (req, res) => {
  const newPattern = req.body;
  const patternName = req.params.setting;

  fs.writeFileSync(
    path.join(__dirname, `./settings/${patternName}.json`),
    JSON.stringify(newPattern)
  );
});

app.listen(8080);
