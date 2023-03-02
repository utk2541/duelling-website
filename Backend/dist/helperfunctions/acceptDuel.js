"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptDuel = void 0;
const duels_1 = require("../entities/duels");
const Data_1 = require("../Data");
const acceptDuel = async (duelid) => {
    const repo = Data_1.Data.getRepository(duels_1.duels);
    const [duel] = await repo.find({ where: { id: duelid } });
    duel.status = "ACCEPTED";
    await repo.save(duel);
    return "OK";
};
exports.acceptDuel = acceptDuel;
//# sourceMappingURL=acceptDuel.js.map