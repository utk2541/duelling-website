import "reflect-metadata";
import express from "express";
import { GetAllProblems } from "./helperfunctions/api_helper";
import { updateProblems } from "./helperfunctions/updateProblems";
import { Data } from "./Data";
const main = async () => {
  const app = express();
  const url = "https://codeforces.com/api/problemset.problems";
  Data.initialize().then().catch((err)=>{console.log(err)})

  // getting problems from cf
  const response = await GetAllProblems(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
    const problems = response? response.result.problems : [];
    
    setInterval(updateProblems,86400000,problems);



  const port = 4000;
  app.listen(port, () => {
    console.log("hmmmm");
  });
};
main().catch((err) => {
  console.log(err);
});
