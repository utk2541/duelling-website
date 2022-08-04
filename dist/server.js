"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const updateDB_1 = require("./helperfunctions/updateDB");
const Data_1 = require("./Data");
const cors_1 = __importDefault(require("cors"));
const createDuelist_1 = require("./helperfunctions/createDuelist");
const validatelogin_1 = require("./helperfunctions/validatelogin");
const getprofile_1 = require("./helperfunctions/getprofile");
const createDuel_1 = require("./helperfunctions/createDuel");
const getDuels_1 = require("./helperfunctions/getDuels");
const acceptDuel_1 = require("./helperfunctions/acceptDuel");
const viewDuel_1 = require("./helperfunctions/viewDuel");
const main = async () => {
    const app = (0, express_1.default)();
    Data_1.Data.initialize()
        .then()
        .catch((err) => {
        console.log(err);
    });
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    setInterval(updateDB_1.updateDB, 86400000);
    app.post("/createDuelist", async (req, res) => {
        const cfId = req.body.cfId;
        const response = await (0, createDuelist_1.createDuelist)(cfId);
        res.send({ message: response.message, stat: response.status });
    });
    app.post("/createDuel", async (req, res) => {
        const Data = req.body.Data;
        const response = await (0, createDuel_1.createDuel)(Data);
        res.send(response);
    });
    app.post("/accept", async (req, res) => {
        console.log("why");
        const duelid = req.body.duelid;
        console.log(duelid);
        const response = await (0, acceptDuel_1.acceptDuel)(duelid);
        res.send("OK");
    });
    app.post("/view", async (req, res) => {
        const duelid = req.body.duelid;
        console.log(duelid);
        const response = await (0, viewDuel_1.viewDuel)(duelid);
        res.send(response);
    });
    app.get("/login/:cfid", async (req, res) => {
        const cfId = req.params.cfid;
        const response = await (0, validatelogin_1.validatelogin)(cfId);
        res.send({ message: response.message });
    });
    app.get("/getprofile/:cfid", async (req, res) => {
        const cfId = req.params.cfid;
        const response = await (0, getprofile_1.getprofile)(cfId);
        console.log(response.profile);
        res.send({ message: response.message, profile: response.profile });
    });
    app.get("/getduels/:cfid", async (req, res) => {
        const cfId = req.params.cfid;
        console.log(cfId);
        const response = await (0, getDuels_1.getDuels)(cfId);
        res.send({ duels: response.duels });
    });
    const port = 4000;
    app.listen(port, () => {
        (0, updateDB_1.updateDB)();
        console.log("hmmmm");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map