"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const allProblems_1 = require("./entities/allProblems");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [allProblems_1.allProblems],
        dbName: 'dueling',
        debug: process.env.NODE_ENV !== 'production',
        type: 'postgresql',
        password: 'utk'
    });
};
main();
//# sourceMappingURL=index.js.map