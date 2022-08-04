"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDuel = void 0;
const Data_1 = require("../Data");
const duelists_1 = require("../entities/duelists");
const allProblems_1 = require("../entities/allProblems");
const typeorm_1 = require("typeorm");
const api_helper_1 = require("./api_helper");
const duels_1 = require("../entities/duels");
const constants_1 = require("../constants");
;
const findproblems = async ({ rmin, rmax, numofproblem, duelistA, duelistB, }) => {
    const problemsrepo = Data_1.Data.getRepository(allProblems_1.allProblems);
    const url = constants_1.constants.url;
    const [problems, dontcare] = await problemsrepo.findAndCount({
        where: { rating: (0, typeorm_1.Between)(rmin, rmax) },
    });
    problems.sort((a, b) => {
        return 0.5 - Math.random();
    });
    const count = new Map();
    let finalproblems = { status: "OK", problems: [] };
    const fetchA = await (0, api_helper_1.cfapi)(`${url}/user.status?handle=${duelistA}`);
    const fetchB = await (0, api_helper_1.cfapi)(`${url}/user.status?handle=${duelistB}`);
    let doneprobsA, doneprobsB;
    if (fetchA.status === "OK" && fetchB.status === "OK") {
        doneprobsA = fetchA.result;
        doneprobsB = fetchB.result;
    }
    console.log(doneprobsA, doneprobsB);
    problems.forEach((prob) => {
        let A = undefined, B = undefined;
        if (doneprobsA.length !== 0)
            A = doneprobsA.find((e) => {
                e.problem.index == prob.id && e.problem.contestId == prob.contestId;
            });
        if (doneprobsB.length !== 0)
            B = doneprobsB.find((e) => {
                e.problem.index == prob.id && e.problem.contestId == prob.contestId;
            });
        if (A == undefined && B == undefined) {
            if (count.get(prob.rating) == undefined) {
                let newProb = { contestId: prob.contestId, index: prob.index, name: prob.name };
                count.set(prob.rating, [newProb]);
            }
            else if (count.get(prob.rating).length < numofproblem) {
                let temp = count.get(prob.rating);
                let newProb = { contestId: prob.contestId, index: prob.index, name: prob.name };
                temp.push(newProb);
                count.set(prob.rating, temp);
            }
        }
    });
    count.forEach((val, key) => {
        console.log(val, key);
        if (val.length < numofproblem && key >= rmin && key <= rmax) {
            finalproblems.status = "NOT ENOUGH PROBLEMS IN GIVEN RANGE";
            console.log(val.length, numofproblem, key);
        }
        else
            val.forEach((e) => {
                finalproblems.problems.push(e);
            });
    });
    console.log(finalproblems);
    return finalproblems;
};
const createDuel = async (data) => {
    const duelistB = data.duelistB;
    const duelistrepo = Data_1.Data.getRepository(duelists_1.duelists);
    const [dontcare, count] = await duelistrepo.findAndCount({
        where: { cfhandle: duelistB },
    });
    if (count === 0)
        return { status: "Duelist not found" };
    const response = await findproblems(data);
    if (response.status == "OK") {
        const duelrepo = Data_1.Data.getRepository(duels_1.duels);
        const duel = new duels_1.duels;
        duel.duelistA = data.duelistA;
        duel.duelistB = duelistB;
        duel.problems = response.problems;
        duel.status = "PENDING";
        duel.maxRating = data.rmax;
        duel.minRating = data.rmin;
        await duelrepo.save(duel);
        return { status: "Duel created" };
    }
    else
        return { status: response.status };
};
exports.createDuel = createDuel;
//# sourceMappingURL=createDuel.js.map