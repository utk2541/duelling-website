"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDuelist = void 0;
const duelists_1 = require("../entities/duelists");
const Data_1 = require("../Data");
const api_helper_1 = require("../helperfunctions/api_helper");
const constants_1 = require("../constants");
const createDuelist = async (cfId) => {
    const url = constants_1.constants.url;
    const response = await (0, api_helper_1.cfapi)(`${url}/user.info?handles=${cfId}`);
    const duelistsRepository = Data_1.Data.getRepository(duelists_1.duelists);
    if (response.status === "FAILED")
        return { message: "Codeforces handle doesn't exist", status: "NO" };
    if (response.status === "OK") {
        const [_, duelistcount] = await duelistsRepository.findAndCount({ where: { cfhandle: cfId } });
        if (duelistcount != 0)
            return { message: "User already exists", status: "YES" };
        else {
            const duelist = new duelists_1.duelists();
            if (response.result[0].rating == null)
                duelist.cfRating = 0;
            else
                duelist.cfRating = response.result[0].rating;
            duelist.pfp = response.result[0].titlePhoto;
            duelist.cfhandle = cfId;
            duelist.duelRating = 1500;
            await duelistsRepository.save(duelist);
            return { message: "User created", status: "YES" };
        }
    }
    else
        return { message: "Something went wrong idk", status: "NO" };
};
exports.createDuelist = createDuelist;
//# sourceMappingURL=createDuelist.js.map