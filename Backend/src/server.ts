import "reflect-metadata";
import express from "express";
import { updateDB} from "./helperfunctions/updateDB";
import { Data } from "./Data";
import cors from "cors";
import { createDuelist } from "./helperfunctions/createDuelist";
import { validatelogin } from "./helperfunctions/validatelogin";
import { getprofile } from "./helperfunctions/getprofile";
import { createDuel } from "./helperfunctions/createDuel";
import { getDuels } from "./helperfunctions/getDuels";
import { acceptDuel } from "./helperfunctions/acceptDuel";
import { viewDuel } from "./helperfunctions/viewDuel";
const main = async () => {
  const app = express();

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

    res.send(response)
  });

  app.post("/accept",async (req,res)=>{
    console.log("why");
    const duelid = req.body.duelid;
    console.log(duelid);
    const response = await acceptDuel(duelid);
    res.send("OK");
  });
  app.post("/view",async (req,res)=>{
   
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
  app.get("/getduels/:cfid",async (req,res)=>{
    const cfId = req.params.cfid;
    console.log(cfId);
    const response = await getDuels(cfId);
    res.send({duels:response.duels})
  });

 

  const port = 4000;
  app.listen(port, () => {
    updateDB();
    console.log("hmmmm");
  });
};
main().catch((err) => {
  console.log(err);
});
