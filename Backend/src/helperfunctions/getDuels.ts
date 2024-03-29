import { duels } from "../entities/duels";
import { Data } from "../Data";
export const getDuels = async (cfId: string) => {
  const duelrepo = Data.getRepository(duels);
  const [duellist, _] = await duelrepo.findAndCount({
    where: [
      { duelistA: cfId, status: "ACCEPTED" },
      { duelistB: cfId, status: "ACCEPTED" },
      { duelistA: cfId, status: "PENDING" },
      { duelistB: cfId, status: "PENDING" },
    ],
  });

  return { duels: duellist };
};
