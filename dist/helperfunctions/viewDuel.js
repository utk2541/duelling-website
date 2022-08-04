"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDuel = void 0;
const duels_1 = require("../entities/duels");
const Data_1 = require("../Data");
const viewDuel = async (duelid) => {
    const repo = Data_1.Data.getRepository(duels_1.duels);
    const [duel] = await repo.find({ where: { id: duelid } });
    return { problems: duel.problems };
};
exports.viewDuel = viewDuel;
//# sourceMappingURL=viewDuel.js.map