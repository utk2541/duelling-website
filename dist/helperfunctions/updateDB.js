"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDB = void 0;
const allProblems_1 = require("../entities/allProblems");
const Data_1 = require("../Data");
const api_helper_1 = require("./api_helper");
const constants_1 = require("../constants");
const duelists_1 = require("../entities/duelists");
const updateDB = async () => {
    const url = constants_1.constants.url;
    const resProb = await (0, api_helper_1.cfapi)(`${url}/problemset.problems`);
    const problems = resProb && resProb.status == "OK" ? resProb.result.problems : [];
    if (problems != []) {
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
        await allProblemsRepository.save(finalproblems);
    }
    const duelistrepo = Data_1.Data.getRepository(duelists_1.duelists);
    const duelist = await duelistrepo.find();
    let newProf = [];
    duelist.forEach(async (element) => {
        const resProf = await (0, api_helper_1.cfapi)(`${url}/user.info?handles=${element.cfhandle}`);
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
exports.updateDB = updateDB;
//# sourceMappingURL=updateDB.js.map