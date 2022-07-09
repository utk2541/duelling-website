import { duelists } from "../entities/duelists";
import { Data } from "../Data";
export const validatelogin = async (cfId :  string) =>{
    const duelistsRepository = Data.getRepository(duelists);
    const [duelist , count] = await duelistsRepository.findAndCount({where: {cfhandle:cfId}});
    if(count==1) return {message : "OK" }
    else return {message : "Not found"}
}