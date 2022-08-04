import { listenerCount } from "process";
import React, { useEffect, useState } from "react";
import { constants } from "../../constants";
import Duelitem from "./Duelitem";

const Duellist = (props) => {
  const Data = props.Data;
  const url = constants.url;
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {

    const getduels = async (url) => {
      const response = await fetch(url + `/getduels/${Data.cfhandle}`);
      const result = await response.json();
      setData(result.duels);
     
      setFetched(true);
    };
     setTimeout(()=>getduels(url),5000);
  });
  const list = [];
 
  for (let i=0;i<data.length;i++) {
      
    list.push(<Duelitem data={data[i]} cfId={props.cfId} />);
   
  }
  return fetched && <div className="duellist">{list.map((val) => val)}</div>;
};

export default Duellist;
