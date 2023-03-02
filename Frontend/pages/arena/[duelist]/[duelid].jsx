import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Problems from "../../components/Problems";
import { constants } from "../../../constants";
import { io } from "socket.io-client";
const arena = () => {
  const router = useRouter();
  const id = router.query.duelid;
  const duelist = router.query.duelist;
  const [Data, setData] = useState([]);
  const [datafetched, setdatafetched] = useState(false);
  const [socket, setsocket] = useState(undefined);
  const fetchdata = async () => {
    const endpoint = constants.url + "/view";
    const jsonD = { duelid: id };
    const JSONData = JSON.stringify(jsonD);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    setdatafetched(true);
    setData(result.problems);
  };
  useEffect(() => {
    if (!datafetched && id) fetchdata();

    if (!socket && id && duelist) {
      
      const newsocket = io(constants.url,{ query : { type: "duel" , profile: duelist }});
      newsocket.on("update", () => {
        console.log("update occured");
        fetchdata();
      });
      newsocket.emit("join",id);
      setsocket(newsocket);
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("update");
        socket.off('join');
      }
    };
  }, [id, socket]);

  return (
    <div className="page_a">
      <div>
        {datafetched && id && socket && duelist && (
          <Problems problems={Data} socket={socket} room={id} duelist={duelist} />
        )}
      </div>
    </div>
  );
};

export default arena;
