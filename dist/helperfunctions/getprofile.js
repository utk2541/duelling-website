"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getprofile = void 0;
const duelists_1 = require("../entities/duelists");
const Data_1 = require("../Data");
const getprofile = async (cfId) => {
    const duelistsRepository = Data_1.Data.getRepository(duelists_1.duelists);
    const [duelist, count] = await duelistsRepository.findAndCount({ where: { cfhandle: cfId } });
    if (count == 1)
        return { message: "OK", profile: duelist[0] };
    else
        return { message: "Not found" };
};
exports.getprofile = getprofile;
//# sourceMappingURL=getprofile.js.map