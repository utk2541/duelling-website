import { useRouter } from "next/router";
import Duel from "../components/Duel";
import Profile from "../components/Profile";
import { constants } from "../../constants";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const profile = () => {
  const router = useRouter();
  const { profile } = router.query;
  const cfId = profile;
  const url = constants.url;
  const [Data, setData] = useState(undefined);
  const [datafetched, setdatafetched] = useState(false);
  const [socket, setsocket] = useState(undefined);
  useEffect(() => {
    const fetchdata = async (url) => {
      const profile = await fetch(url + `/getprofile/${cfId}`);
      const result = await profile.json();
      setData(result.profile);
    };

    if (Data === undefined) fetchdata(url);
    else setdatafetched(true);
    if (!socket && cfId) {
      const newsocket = io(constants.url, {
        query: { type: "profile", profile: cfId },
      });

      setsocket(newsocket);
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("duelList");
 
      }
    };
  });
  return datafetched ? (
    <div className="page_a">
      <Profile Data={Data} socket={socket} />{" "}
      <Duel challenger={profile} socket={socket} />
    </div>
  ) : (
    <div className="page_a">
      <div className="container_p"> Loading </div>
    </div>
  );
};

export default profile;
