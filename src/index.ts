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
  const patternName = req.params.setting;
  const patternPath = path.join(__dirname, `./settings/${patternName}.json`);

  let fileExists = fs.existsSync(patternPath);

  if (fileExists) {
    const loadedData = fs.readFileSync(patternPath);
    res.send(loadedData);
  } else {
    res.status(400).send();
    return;
  }
});

app.get("/", (req, res) => {
  const fileNames = fs
    .readdirSync(path.join(__dirname, `./settings`))
    .map((name) => name.slice(0, -5));
  res.send(fileNames);
});

app.post("/:setting", (req, res) => {
  const newPattern = req.body;
  const patternName = req.params.setting;
  const patternPath = path.join(__dirname, `./settings/${patternName}.json`);

  let fileExists = fs.existsSync(patternPath);
  if (fileExists) {
    return res.status(400).send({
      error: "Pattern name already exists",
    });
  }

  fs.writeFileSync(patternPath, JSON.stringify(newPattern));
  res.send(newPattern);
});

app.put("/:setting", (req, res) => {
  const pattern = req.body;
  const patternName = req.params.setting;
  const patternPath = path.join(__dirname, `./settings/${patternName}.json`);

  fs.writeFileSync(patternPath, JSON.stringify(pattern));
  res.send(pattern);
});

// TODO: missing functionality for deleting pattern and random


app.listen(8080);
