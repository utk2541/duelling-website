"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuels = void 0;
const duels_1 = require("../entities/duels");
const Data_1 = require("../Data");
const getDuels = async (cfId) => {
    const duelrepo = Data_1.Data.getRepository(duels_1.duels);
    const [duellist, dontcare] = await duelrepo.findAndCount({
        where: [{ duelistA: cfId }, { duelistB: cfId }],
    });
    return { duels: duellist };
};
exports.getDuels = getDuels;
//# sourceMappingURL=getDuels.js.map