import { duels } from "../entities/duels";
import { Data } from "../Data";
export const acceptDuel = async (duelid : number)=>{
    const repo = Data.getRepository(duels);
    
    const [duel] = await repo.find({where: {id : duelid}});
    duel.status="ACCEPTED";
    await repo.save(duel);
   
    return "OK";
}