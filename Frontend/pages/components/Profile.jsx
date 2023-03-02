import { useState } from "react";
import Image from "next/image";
import Stats from "./Stats";
import Duellist from "./Duellist";
const Profile = (props) => {
  const [stats, setStats] = useState(true);
  const [duellist, setDuellist] = useState(false);
  const socket = props.socket;
  const Data = props.Data;
  return (
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
      {duellist && <Duellist Data={Data} cfId={Data.cfhandle} socket = {socket}/>}
    </div>
  );
};

export default Profile;
