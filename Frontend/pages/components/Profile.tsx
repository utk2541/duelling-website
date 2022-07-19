import { useEffect, useState } from "react";
import { constants } from "../../constants";
import Image from "next/image";
import Stats from "./Stats";
import Duellist from "./Duellist";
const Profile = (props: { cfId: string }) => {
  const cfId = props.cfId;
  const url = constants.url;
  const [Data, setData] = useState({
    duelRating: 1500,
    id: 1,
    cfhandle: "none",
    cfRating: 0,
    pfp: "https://cdn-userpic.codeforces.com/no-avatar.jpg",
  });
  const [datafetched, setdatafetched] = useState(false);
  const [stats, setStats] = useState(true);
  const [duellist, setDuellist] = useState(false);
  useEffect(() => {
    const fetchdata = async (url: string) => {
      const profile = await fetch(url + `/getprofile/${cfId}`);
    
      const result = await profile.json();

      setdatafetched(true);
      setData(result.profile);
    };
    if (!datafetched) fetchdata(url);
  });
  return Data !== undefined ? (
    <div className="container_p">
      <h1 className="header_p">
        <div className="image_p">
          <Image src={Data.pfp} layout="fill" objectFit="contain" />
        </div>
        <div id="pname">
          {" "}
          <p>{Data.cfhandle}</p>{" "}
        </div>
      </h1>
      <div className="options">
        <button
          onClick={() => {
            setStats(true);
            setDuellist(false);
          }}
        >
          Stats
        </button>
        <button
          onClick={() => {
            setStats(false);
            setDuellist(true);
          }}
        >
          Duels
        </button>
      </div>
      {stats && <Stats Data={Data} />}
      {duellist && <Duellist Data={Data} cfId = {cfId}/>}
    </div>
  ) : (
    <div></div>
  );
};

export default Profile;
