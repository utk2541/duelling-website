import { duels } from "../entities/duels";
import { Data } from "../Data";

export const viewDuel = async (duelid: number) => {
  const repo = Data.getRepository(duels);

  const [duel] = await repo.find({ where: { id: duelid } })

  return {problems :duel.problems};
};
