import "reflect-metadata";
import express from "express";
import { cfapi } from "./helperfunctions/api_helper";
import { updateProblems } from "./helperfunctions/updateProblems";
import { Data } from "./Data";
import cors from "cors"
import { createDuelist } from "./helperfunctions/createDuelist";
import {validatelogin} from "./helperfunctions/validatelogin";
const main = async () => {
  const app = express();
  const url = "https://codeforces.com/api/problemset.problems";
  Data.initialize().then().catch((err)=>{console.log(err)})
  app.use(express.json());
  app.use(cors());
  // getting problems from cf
  const response = await cfapi(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
    const problems = response? response.result.problems : [];
    
    setInterval(updateProblems,86400000,problems);

    app.post('/createDuelist',async (req,res)=>{
      const cfId = req.body.cfId;
      const response = await createDuelist(cfId);
      res.send({message : response.message , stat: response.status})
    })

    app.get('/login/:cfid', async (req,res)=>{
      const cfId = req.params.cfid;
      const response = await validatelogin(cfId);
      res.send({message : response.message})
    })


  const port = 4000;
  app.listen(port, () => {
    console.log("hmmmm");
  });
};
main().catch((err) => {
  console.log(err);
});
