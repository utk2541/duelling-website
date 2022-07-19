import { duels } from "../entities/duels";
import { Data } from "../Data";
export const getDuels = async (cfId: string) => {
  const duelrepo = Data.getRepository(duels);
  const [duellist, dontcare] = await duelrepo.findAndCount({
    where: [{ duelistA: cfId }, { duelistB: cfId }],
  });
  return { duels: duellist };
};
