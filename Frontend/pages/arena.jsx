import React, { useEffect, useState } from "react";
import getDuelists from './api/getDuelists'
import UserStats from "./components/UserStats";
import Problems from "./components/Problems";
import getproblems from "./api/getproblems";
const arena = () => {
  const [userdata, setData] = useState([]);
  const [problems, setProblems] = useState([]);
  const [fetched,setFetched] = useState(false);
  const [fetchedProblems,setfetchedProblems] = useState(false);
  useEffect(() => {
    getDuelists().then(data=>{setData(data); setFetched(true)}),
    getproblems().then(data=>{setProblems(data); setfetchedProblems(true)})
  }, []);
  return (
    <div className="page_a">
      <div className="container_a">
        {fetched&&<UserStats data={userdata[0]}/>}
        {fetchedProblems&&<Problems problems={problems} />}
        {fetched&&<UserStats data={userdata[1]}/>}
      </div>
    </div>
  );
};

export default arena;
