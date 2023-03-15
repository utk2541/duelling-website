import "reflect-metadata";
import express from "express";
import { updateDB } from "./helperfunctions/updateDB";
import { Data } from "./Data";
import cors from "cors";
import { createDuelist } from "./helperfunctions/createDuelist";
import { validatelogin } from "./helperfunctions/validatelogin";
import { getprofile } from "./helperfunctions/getprofile";
import { createDuel } from "./helperfunctions/createDuel";
import { getDuels } from "./helperfunctions/getDuels";
import { acceptDuel } from "./helperfunctions/acceptDuel";
import { viewDuel } from "./helperfunctions/viewDuel";
import { createServer } from "http";
import { Server } from "socket.io";
import { constants } from "./constants";
import { validClaim } from "./helperfunctions/validClaim";
import { dproblem ,problem } from "./entities/allProblems";
import { config } from "dotenv"
config();
interface updateValue {
  element: problem;
  room: string;
  duelist: string;
}

const main = async () => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: constants.frontend,
      methods: ["GET", "POST"],
    },
  });
  Data.initialize()
    .then()
    .catch((err) => {
      console.log(err);
    });
  app.use(express.json());
  app.use(cors());

  setInterval(updateDB, 86400000);

  app.post("/createDuelist", async (req, res) => {
    const cfId = req.body.cfId;
    const response = await createDuelist(cfId);
    res.send({ message: response.message, stat: response.status });
  });

  app.post("/createDuel", async (req, res) => {
    const Data = req.body.Data;

    const response = await createDuel(Data);

    res.send(response);
  });

  app.post("/accept", async (req, res) => {
    console.log("why");
    const duelid = req.body.duelid;
    console.log(duelid);
    const [_] = await acceptDuel(duelid);
    res.send("OK");
  });
  app.post("/view", async (req, res) => {
    const duelid = req.body.duelid;
    console.log(duelid);
    const response = await viewDuel(duelid);
    res.send(response);
  });
  app.get("/login/:cfid", async (req, res) => {
    const cfId = req.params.cfid;
    const response = await validatelogin(cfId);
    res.send({ message: response.message });
  });

  app.get("/getprofile/:cfid", async (req, res) => {
    const cfId = req.params.cfid;
    const response = await getprofile(cfId);
    console.log(response.profile);
    res.send({ message: response.message, profile: response.profile });
  });
  app.get("/getduels/:cfid", async (req, res) => {
    const cfId = req.params.cfid;
    console.log(cfId);
    const response = await getDuels(cfId);
    res.send({ duels: response.duels });
  });

  // Socket io stuff here

  let ProfileSocket = new Map<string | string[], Set<string>>();
  let DuelSocket = new Map<string | string[], Set<string>>();
  let socketDuelist = new Map<string, string>();
  io.sockets.on("connection", (socket) => {
    const duelist: any = socket.handshake.query.profile;
    const type = socket.handshake.query.type;
    if (duelist) {
      if (type === "profile") {
        let S: any = ProfileSocket.get(duelist);
        console.log(S);
        if (!S) {
          S = new Set<string>();
        }
        S.add(socket.id);
        ProfileSocket.set(duelist, S);
      }
      if (type === "duel") {
        let S: any = DuelSocket.get(duelist);
        if (!S) {
          S = new Set<string>();
        }
        S.add(socket.id);
          DuelSocket.set(duelist, S);
        
      }
      if (duelist) {
        socketDuelist.set(socket.id,duelist);
      }
    }

    socket.on("join", (roomName: string) => {
      if (roomName !== undefined && roomName !== "undefined") {
        socket.join(roomName);
      }
    });
    socket.on("duelList", (opp: string) => {
      const duelist : any = socketDuelist.get(socket.id);
      console.log(duelist , opp);
      if (ProfileSocket.get(opp)) {
        const oppsocket: any = ProfileSocket.get(opp);
        console.log(oppsocket);
        oppsocket.forEach((val: any) => {
          io.to(val).emit("duelList");
         
        });
      }
      if (ProfileSocket.get(duelist)) {
        
        const oppsocket: any = ProfileSocket.get(duelist);
        console.log(duelist);
        oppsocket.forEach((val: any) => {
          io.to(val).emit("duelList");
          
        });
      }
    });
    socket.on("update", async (val: updateValue) => {
      const prob: dproblem = new dproblem(val.element);
      const duelist: string = val.duelist;
      const room: string = val.room;
      const res = await validClaim(prob, duelist,room);
      console.log(res);
      if (res) {
        socket.to(val.room).emit("update");
      }
    });
    console.log(socket.listeners("update"));
    console.log(socket.rooms);
    socket.once("disconnect", () => {
      const duelist: any = socketDuelist.get(socket.id);
      const S1 = ProfileSocket.get(duelist);
      const S2 = DuelSocket.get(duelist);
      if (S1?.has(socket.id)) S1.delete(socket.id);
      if (S2?.has(socket.id)) S2.delete(socket.id);

      if (S1) ProfileSocket.set(duelist, S1);
      if (S2) ProfileSocket.set(duelist, S2);
      console.log("disconnected");
    });
  });

  const port = 4000;
  server.listen(port, () => {
    updateDB();
    console.log("hmmmm");
  });
};
main().catch((err) => {
  console.log(err);
});
