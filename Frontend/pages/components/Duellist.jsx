import { listenerCount } from "process";
import React, { useEffect, useState } from "react";
import { constants } from "../../constants";
import Duelitem from "./Duelitem";

const Duellist = (props) => {
  const Data = props.Data;
  const url = constants.url;
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const socket = props.socket;
  useEffect(() => {
    const getduels = async (url) => {
      const response = await fetch(url + `/getduels/${Data.cfhandle}`);
      const result = await response.json();
      setData(result.duels);
      setFetched(true);
    };
    socket.on("duelList", () => {
      console.log("update");
      getduels(url);
    });
    if (!fetched) getduels(url);
  });
  const list = [];
  if (fetched)
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.status !== "FINISHED")
        list.push(
          <Duelitem data={data[i]} cfId={props.cfId} socket={props.socket} />
        );
    }
  return fetched ? (
    <div className="duellist">{list.map((val) => val)}</div>
  ) : (
    <div className="duellist">Loading</div>
  );
};

export default Duellist;
