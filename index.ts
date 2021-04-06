import express from "express";
import cors from "cors";
import fs from "fs";
import blinker from "./settings/blinker";
import example from "./settings/example";
import toad from "./settings/toad";
import beacon from "./settings/beacon";
import pentadecathlon from "./settings/pentadecathlon";
import pulsar from "./settings/pulsar";
import random from "./settings/random";
import * as newPatterns from "./responseUpdate";

const app = express();

app.use(express.json());
app.use(cors());

const response = {
  example,
  blinker,
  toad,
  beacon,
  pentadecathlon,
  pulsar,
  random: random(),
};

const newResponse = { ...response, ...newPatterns };

app.get("/random", (req, res) => res.send(random()));

app.get(`/:setting`, (req, res) => {
  //@ts-expect-error
  if (newResponse[req.params.setting]) {
    //@ts-expect-error
    res.send(newResponse[req.params.setting]);
  } else {
    res.send("");
  }
});

app.get("/", (req, res) => res.send(Object.keys(newResponse)));

app.post("/:setting", async (req, res) => {
  let newPattern = await req.body;
  // @ts-expect-error
  newResponse[newPattern[0]] = newPattern[1];
  fs.appendFile(`responseUpdate.ts`, `export const ${newPattern[0]} =`, () => {
    fs.appendFile(`responseUpdate.ts`, JSON.stringify(newPattern[1]), () => {
      fs.appendFile(`responseUpdate.ts`, ";", () => {
        console.log("success!");
      });
    });
  });
});

app.listen(8080);
