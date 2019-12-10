const express = require("express");

const db = require("./data/dbConfig.js");

const accountsRouter = require("./accounts/accountsRouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.send("Project: webdb-i-challenge is up and running!");
});

module.exports = server;
