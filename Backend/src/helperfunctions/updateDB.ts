import { allProblems } from "../entities/allProblems";
import { Data } from "../Data";
import { cfapi } from "./api_helper";
import { constants } from "../constants";
import { duelists } from "../entities/duelists";
export const updateDB = async () => {
  const url = constants.url;
  const resProb = await cfapi(`${url}/problemset.problems`);
  const problems =
    resProb && resProb.status == "OK" ? resProb.result.problems : undefined;

  if (problems) {
    let finalproblems: Array<allProblems> = new Array<allProblems>();
    problems.forEach((element : any) => {
      const problem = new allProblems();
      problem.contestId = element.contestId;
      problem.index = element.index;
      problem.name = element.name;
      problem.tags = element.tags;
      problem.rating = element.rating;
      finalproblems.push(problem);
    });

    const allProblemsRepository = Data.getRepository(allProblems);
    await allProblemsRepository.save(finalproblems);
  }

  const duelistrepo = Data.getRepository(duelists);

  const duelist = await duelistrepo.find();

  duelist.forEach(async (element) => {
    const resProf = await cfapi(`${url}/user.info?handles=${element.cfhandle}`);
    let prof = element;
    console.log(resProf.status);
    if (resProf && resProf.status == "OK") {
      prof.cfRating = resProf.result[0].rating;
      prof.pfp = resProf.result[0].titlePhoto;
      console.log(prof.cfRating);
    }
    await duelistrepo.save(prof);
  });
};
