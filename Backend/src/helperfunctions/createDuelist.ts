import { duelists } from "../entities/duelists";
import { Data } from "../Data";
import { cfapi } from "../helperfunctions/api_helper";
export const createDuelist = async (cfId: string) => {
  const response = await cfapi(
    `https://codeforces.com/api/user.info?handles=${cfId}`
  );
  const duelistsRepository = Data.getRepository(duelists);
  if (response.status === "FAILED")
    return { message: "Codeforces handle doesn't exist" ,status : "NO"};
  if (response.status === "OK") {
    const [duelistsintable, duelistcount] =
      await duelistsRepository.findAndCount({ where: { cfhandle: cfId } });
      
    if (duelistcount != 0) return { message: "User already exists" , status: "NO" };
    else {
      const duelist = new duelists();
      if(response.result[0].rating == null) 
      duelist.cfRating = 0;
      else
      duelist.cfRating = response.result[0].rating;
      duelist.cfhandle = cfId;
      duelist.duelRating = 1500;
      await duelistsRepository.save(duelist);
      return { message: "User created" , status:"YES"};
    }
  } else return { message: "Something went wrong idk" ,status:"NO"};
};
