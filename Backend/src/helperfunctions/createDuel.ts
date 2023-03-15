import { Data } from "../Data";
import { duelists } from "../entities/duelists";
import { allProblems, dproblem } from "../entities/allProblems";
import { Between } from "typeorm";
import { cfapi } from "./api_helper";
import { duels } from "../entities/duels";
import { constants } from "../constants";

interface duel {
  rmin: number;
  rmax: number;
  numofproblem: number;
  duelistA: string;
  duelistB: string;
}
const findproblems = async (query: duel) => {
  const problemsrepo = Data.getRepository(allProblems);
  const url = constants.url;
  const [problems, _] = await problemsrepo.findAndCount({
    where: { rating: Between(query.rmin, query.rmax) },
  });

  problems.sort(() => {
    return 0.5 - Math.random();
  });

  const count: Map<number, Array<dproblem>> = new Map();

  let finalproblems: { status: string; problems: Array<dproblem> } = {
    status: "OK",
    problems: Array<dproblem>(),
  };

  const fetchA = await cfapi(`${url}/user.status?handle=${query.duelistA}`);
  const fetchB = await cfapi(`${url}/user.status?handle=${query.duelistB}`);

  let doneprobsA: Array<any>, doneprobsB: Array<any>;
  if (fetchA.status === "OK" && fetchB.status === "OK") {
    console.log(fetchA);
    doneprobsA = fetchA.result;
    doneprobsB = fetchB.result;
  }

  problems.forEach((prob) => {
    let A = undefined,
      B = undefined;
    if (doneprobsA.length !== 0)
      A = doneprobsA.find((e) => {
        return (
          e.problem.index == prob.id && e.problem.contestId == prob.contestId
        );
      });
    if (doneprobsB.length !== 0)
      B = doneprobsB.find((e) => {
        return (
          e.problem.index == prob.id && e.problem.contestId == prob.contestId
        );
      });

    if (A == undefined && B == undefined) {
      if (count.get(prob.rating) == undefined) {
        let newProb: dproblem = {
          contestId: prob.contestId,
          index: prob.index,
          name: prob.name,
          solvedBy: "none",
        };
        count.set(prob.rating, [newProb]);
      } else if ((count.get(prob.rating)?.length || 0) < query.numofproblem) {
        let temp: Array<dproblem> = count.get(prob.rating) || [];
        let newProb: dproblem = {
          contestId: prob.contestId,
          index: prob.index,
          name: prob.name,
          solvedBy: "none",
        };
        temp.push(newProb);
        count.set(prob.rating, temp);
      }
    }
  });
  count.forEach((val, key) => {
    console.log(val, key);
    if (
      val.length < query.numofproblem &&
      key >= query.rmin &&
      key <= query.rmax
    ) {
      finalproblems.status = "NOT ENOUGH PROBLEMS IN GIVEN RANGE";
      console.log(val.length, query.numofproblem, key);
    } else
      val.forEach((e) => {
        finalproblems.problems.push(e);
      });
  });
  if (finalproblems.problems.length == 0)
    finalproblems.status = "NOT ENOUGH PROBLEMS IN GIVEN RANGE";
  console.log(finalproblems);
  return finalproblems;
};

export const createDuel = async (data: duel) => {
  const duelistB = data.duelistB;
  const duelistrepo = Data.getRepository(duelists);
  const [_, count] = await duelistrepo.findAndCount({
    where: { cfhandle: duelistB },
  });
  if (count === 0) return { status: "Duelist not found" };
  const response = await findproblems(data);
  if (response.status == "OK") {
    const duelrepo = Data.getRepository(duels);
    const duel = new duels();

    duel.duelistA = data.duelistA;
    duel.duelistB = duelistB;

    duel.problems = response.problems;
    duel.status = "PENDING";

    duel.maxRating = data.rmax;
    duel.minRating = data.rmin;
    await duelrepo.save(duel);
    return { status: "Duel created" };
  } else return { status: response.status };
};
