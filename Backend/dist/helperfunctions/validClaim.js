"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validClaim = void 0;
const constants_1 = require("../constants");
const api_helper_1 = require("./api_helper");
const Data_1 = require("../Data");
const duels_1 = require("../entities/duels");
const validClaim = async (prob, duelist, duelid) => {
    const res = await (0, api_helper_1.cfapi)(`${constants_1.constants.url}/user.status?handle=${duelist}&count=10`);
    let claim = false;
    let flag = false;
    const repo = Data_1.Data.getRepository(duels_1.duels);
    if (res.status === "OK") {
        res.result.forEach((val) => {
            const verdict = val.verdict;
            const curProb = val.problem;
            console.log(curProb, prob);
            if (verdict === "OK" && curProb.name === prob.name && curProb.index === prob.index && curProb.contestId == prob.contestId)
                claim = true;
        });
        console.log(claim);
        if (claim) {
            const [duel] = await repo.find({ where: { id: Number(duelid) } });
            let duelprobs = duel.problems;
            let newduelProb = new Array();
            let count = 0;
            duelprobs.forEach((val) => {
                if (val.contestId === prob.contestId && val.index == prob.index && val.solvedBy === prob.solvedBy) {
                    console.log(val);
                    console.log(prob);
                    val.solvedBy = duelist;
                    flag = true;
                }
                if (val.solvedBy === "none") {
                    count++;
                }
                newduelProb.push(val);
            });
            duel.problems = newduelProb;
            if (count === 0)
                duel.status = "FINISHED";
            await repo.save(duel);
        }
    }
    return claim && flag;
};
exports.validClaim = validClaim;
//# sourceMappingURL=validClaim.js.map