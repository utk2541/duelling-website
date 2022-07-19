import { Data } from "../Data";
import { duelists } from "../entities/duelists";
import { allProblems } from "../entities/allProblems";
import { Between } from "typeorm";
import { cfapi } from "./api_helper";
import { duels } from "../entities/duels";
import {constants} from "../constants"
interface dproblem {
  contestId: string, index: string, name: string
};
const findproblems = async ({
  rmin,
  rmax,
  numofproblem,
  duelistA,
  duelistB,
}) => {
  const problemsrepo = Data.getRepository(allProblems);
  const url = constants.url;
  const [problems, dontcare] = await problemsrepo.findAndCount({
    where: { rating: Between(rmin, rmax) },
  });
  problems.sort((a, b) => {
    return 0.5 - Math.random();
  });

  const count: Map<number, Array<dproblem>> = new Map();
  

  let finalproblems = { status: "OK", problems: [] };

  const fetchA = await cfapi(
    `${url}/user.status?handle=${duelistA}`
  );
  const fetchB = await cfapi(
    `${url}/user.status?handle=${duelistB}`
  );

  let doneprobsA: Array<any>,
    doneprobsB = Array<any>;
  if (fetchA.status === "OK" && fetchB.status === "OK") {
    doneprobsA = fetchA.result;
    doneprobsB = fetchB.result;

  }
  console.log(doneprobsA,doneprobsB);
  problems.forEach((prob) => {
    let A = undefined,
      B = undefined;
    if (doneprobsA.length !== 0)
      A = doneprobsA.find((e) => {
        e.problem.index == prob.id && e.problem.contestId == prob.contestId;
      });
    if (doneprobsB.length !== 0)
      B = doneprobsB.find((e) => {
        e.problem.index == prob.id && e.problem.contestId == prob.contestId;
      });

    if (A == undefined && B == undefined) {
      if (count.get(prob.rating) == undefined){ 
        let newProb: dproblem = { contestId: prob.contestId, index: prob.index, name: prob.name }
        count.set(prob.rating, [newProb]); }
      else if (count.get(prob.rating).length < numofproblem) {
        let temp: Array<dproblem> = count.get(prob.rating);
        let newProb: dproblem = { contestId: prob.contestId, index: prob.index, name: prob.name }
        temp.push(newProb)
        count.set(prob.rating, temp);
      }
    }
  });
  count.forEach((val, key) => {
  
      console.log(val, key)
      if (val.length < numofproblem && key>=rmin && key<=rmax) {
        finalproblems.status = "NOT ENOUGH PROBLEMS IN GIVEN RANGE";
        console.log(val.length,numofproblem,key)
      } else
        val.forEach((e) => {
          finalproblems.problems.push(e);
        });
   
  });
  console.log(finalproblems)
  return finalproblems;
};

export const createDuel = async (data) => {
  const duelistB = data.duelistB;
  const duelistrepo = Data.getRepository(duelists);
  const [dontcare, count] = await duelistrepo.findAndCount({
    where: { cfhandle: duelistB },
  });
  if (count === 0) return { status: "Duelist not found" };
  const response = await findproblems(data);
  if (response.status == "OK") {
    const duelrepo = Data.getRepository(duels);
    const duel = new duels;
    duel.PointsA = 0;
    duel.PointsB = 0;
    duel.delA = 0;
    duel.delB = 0;
    duel.duelistA = data.duelistA;
    duel.duelistB = duelistB;
    duel.duration = data.duration;
    duel.startdate = data.startdate;
    duel.starttime = data.starttime;
    duel.problems = response.problems;
    duel.status = "PENDING";
    duel.winner = "n/a";
    duel.maxRating=data.rmax;
    duel.minRating=data.rmin;
    await duelrepo.save(duel);
    return { status: "Duel created" }
  }
  else return { status: response.status };
};
