"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProblems = void 0;
const allProblems_1 = require("../entities/allProblems");
const Data_1 = require("../Data");
const updateProblems = async (problems) => {
    let finalproblems = [];
    problems.forEach((element) => {
        const problem = new allProblems_1.allProblems();
        problem.contestId = element.contestId;
        problem.index = element.index;
        problem.name = element.name;
        problem.tags = element.tags;
        problem.rating = element.rating;
        finalproblems.push(problem);
    });
    const allProblemsRepository = Data_1.Data.getRepository(allProblems_1.allProblems);
    await allProblemsRepository.clear();
    await allProblemsRepository.save(finalproblems);
    console.log("problems updated");
};
exports.updateProblems = updateProblems;
//# sourceMappingURL=updateProblems.js.map