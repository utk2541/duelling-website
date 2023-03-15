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
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const validClaim_1 = require("./helperfunctions/validClaim");
const allProblems_1 = require("./entities/allProblems");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const main = async () => {
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: constants_1.constants.frontend,
            methods: ["GET", "POST"],
        },
    });
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
        const [_] = await (0, acceptDuel_1.acceptDuel)(duelid);
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
    let ProfileSocket = new Map();
    let DuelSocket = new Map();
    let socketDuelist = new Map();
    io.sockets.on("connection", (socket) => {
        const duelist = socket.handshake.query.profile;
        const type = socket.handshake.query.type;
        if (duelist) {
            if (type === "profile") {
                let S = ProfileSocket.get(duelist);
                console.log(S);
                if (!S) {
                    S = new Set();
                }
                S.add(socket.id);
                ProfileSocket.set(duelist, S);
            }
            if (type === "duel") {
                let S = DuelSocket.get(duelist);
                if (!S) {
                    S = new Set();
                }
                S.add(socket.id);
                DuelSocket.set(duelist, S);
            }
            if (duelist) {
                socketDuelist.set(socket.id, duelist);
            }
        }
        socket.on("join", (roomName) => {
            if (roomName !== undefined && roomName !== "undefined") {
                socket.join(roomName);
            }
        });
        socket.on("duelList", (opp) => {
            const duelist = socketDuelist.get(socket.id);
            console.log(duelist, opp);
            if (ProfileSocket.get(opp)) {
                const oppsocket = ProfileSocket.get(opp);
                console.log(oppsocket);
                oppsocket.forEach((val) => {
                    io.to(val).emit("duelList");
                });
            }
            if (ProfileSocket.get(duelist)) {
                const oppsocket = ProfileSocket.get(duelist);
                console.log(duelist);
                oppsocket.forEach((val) => {
                    io.to(val).emit("duelList");
                });
            }
        });
        socket.on("update", async (val) => {
            const prob = new allProblems_1.dproblem(val.element);
            const duelist = val.duelist;
            const room = val.room;
            const res = await (0, validClaim_1.validClaim)(prob, duelist, room);
            console.log(res);
            if (res) {
                socket.to(val.room).emit("update");
            }
        });
        console.log(socket.listeners("update"));
        console.log(socket.rooms);
        socket.once("disconnect", () => {
            const duelist = socketDuelist.get(socket.id);
            const S1 = ProfileSocket.get(duelist);
            const S2 = DuelSocket.get(duelist);
            if (S1 === null || S1 === void 0 ? void 0 : S1.has(socket.id))
                S1.delete(socket.id);
            if (S2 === null || S2 === void 0 ? void 0 : S2.has(socket.id))
                S2.delete(socket.id);
            if (S1)
                ProfileSocket.set(duelist, S1);
            if (S2)
                ProfileSocket.set(duelist, S2);
            console.log("disconnected");
        });
    });
    const port = 4000;
    server.listen(port, () => {
        (0, updateDB_1.updateDB)();
        console.log("hmmmm");
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=server.js.map