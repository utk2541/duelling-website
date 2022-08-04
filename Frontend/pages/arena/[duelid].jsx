import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Problems from "../components/Problems";
import { constants } from "../../constants";
const arena = () => {
  const router = useRouter();
  const { duelid } = router.query;
  const [Data, setData] = useState([]);
  const [datafetched, setdatafetched] = useState(false);
  const {id }= router.query;
  useEffect(()=>{
    const fetchdata = async () => {
   
    const endpoint = constants .url + "/view";
    console.log(endpoint);
    const jsonD = { duelid : duelid};
    const JSONData = JSON.stringify(jsonD);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONData
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    
      setdatafetched(true);
     setData(result.problems);
      
    };
    if (!datafetched) fetchdata();


  },[] );
 
  return (
    <div className="page_a">
      <div>
      
        {datafetched&&<Problems problems={Data} />}
      
      </div>
    </div>
  );
};

export default arena;
