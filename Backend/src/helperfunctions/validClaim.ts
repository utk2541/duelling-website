import { constants } from "../constants";
import { allProblems, dproblem } from "../entities/allProblems";
import { cfapi } from "./api_helper";
import { Data } from "../Data";
import { duels } from "../entities/duels";
export const validClaim = async (
  prob: dproblem,
  duelist: string,
  duelid: string
) => {
  const res = await cfapi(
    `${constants.url}/user.status?handle=${duelist}&count=10`
  );
  let claim: Boolean = false;
  let flag: boolean = false;
  const repo = Data.getRepository(duels);

  if (res.status === "OK") {
    res.result.forEach((val: any) => {
      const verdict: string = val.verdict;
      const curProb: allProblems = val.problem;
      console.log(curProb,prob)
      if (verdict === "OK" && curProb.name === prob.name && curProb.index === prob.index && curProb.contestId == prob.contestId) claim = true;
    });
    console.log(claim);
    if (claim) {
      const [duel] = await repo.find({ where: { id: Number(duelid) } });
      let duelprobs: Array<dproblem> = duel.problems;
      let newduelProb: Array<dproblem> = new Array<dproblem>();
        let count : number = 0;
      duelprobs.forEach((val: dproblem) => {
          
        if ( val.contestId === prob.contestId && val.index==prob.index && val.solvedBy === prob.solvedBy) {
            console.log(val);
          console.log(prob)
          val.solvedBy = duelist;
          flag = true;
        }
        if(val.solvedBy ==="none"){
            count++;
        }
        newduelProb.push(val);
      });
      duel.problems=newduelProb;
      if(count===0) duel.status= "FINISHED";

      await repo.save(duel);
    }
  }
  return claim && flag;
};
