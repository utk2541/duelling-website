import { allProblems } from "../entities/allProblems";
import { Data } from "../Data";
export const updateProblems = async (problems: allProblems[]) => {
    let finalproblems : allProblems[]= [];

  problems.forEach((element) => {
    const problem = new allProblems();
    problem.contestId = element.contestId;
    problem.index = element.index;
    problem.name = element.name;
    problem.tags = element.tags;
    problem.rating = element.rating;
    finalproblems.push(problem)
  });
  const allProblemsRepository = Data.getRepository(allProblems);

  await allProblemsRepository.clear();
  await allProblemsRepository.save(finalproblems);
  console.log("problems updated")
};
