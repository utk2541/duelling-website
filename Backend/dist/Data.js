"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const process_1 = __importDefault(require("process"));
const typeorm_1 = require("typeorm");
const allProblems_1 = require("./entities/allProblems");
const duelists_1 = require("./entities/duelists");
const duels_1 = require("./entities/duels");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.Data = new typeorm_1.DataSource({
    type: "postgres",
    ssl: {
        rejectUnauthorized: false,
    },
    host: process_1.default.env.HOSTDB,
    port: Number(process_1.default.env.PORTDB),
    username: process_1.default.env.USERDB,
    password: process_1.default.env.PASSDB,
    database: process_1.default.env.DBNAME,
    url: process_1.default.env.URL,
    synchronize: true,
    logging: true,
    entities: [allProblems_1.allProblems, duels_1.duels, duelists_1.duelists],
});
//# sourceMappingURL=Data.js.map