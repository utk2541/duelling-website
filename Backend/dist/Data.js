"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const typeorm_1 = require("typeorm");
const allProblems_1 = require("./entities/allProblems");
const duelists_1 = require("./entities/duelists");
const duels_1 = require("./entities/duels");
exports.Data = new typeorm_1.DataSource({
    type: "postgres",
    ssl: {
        rejectUnauthorized: false,
    },
    username: "postgres",
    password: "utk",
    database: "dueling",
    synchronize: true,
    logging: true,
    entities: [allProblems_1.allProblems, duels_1.duels, duelists_1.duelists],
});
//# sourceMappingURL=Data.js.map