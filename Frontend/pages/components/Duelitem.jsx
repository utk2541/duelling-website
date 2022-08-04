import Link from "next/link";
import Router from "next/router";
import path from "path";
import { constants } from "../../constants";
const Duelitem = (props) => {
  const data = props.data;
  const cfId = props.cfId;
  console.log(data, cfId);
  const accept = async () => {
    const endpoint = constants .url + "/accept";
    console.log(endpoint);
    const jsonD = { duelid : data?.id};
    const JSONData = JSON.stringify(jsonD);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONData
    };

    const response = await fetch(endpoint, options);
    console.log(response);

  }
  const view = () => {
    
  }
  const button = (status) => {
    if (status === "PENDING") {
      if (cfId == data?.duelistB)
        return <button onClick={accept}>Accept</button>;
      else return "pls wait";
    } else if (status === "ACCEPTED")

      return <Link href={`/arena/${data?.id}`}> View </Link>
  };
  return (
    <div className="duelitem">
      <div className="dueldata">
        <div className="duelcont">
          {data?.duelistA === cfId ? "Opponent:" : "Challenger:"}{" "}
          {data?.duelistA === cfId ? data?.duelistB : data?.duelistA}
        </div>
        <div className="duelcont">
          Total no. of Problems: {data?.problems.length}
        </div>
        <div className="duelcont">
          Rating: {data?.minRating + "-" + data?.maxRating}
        </div>

      </div>

      <div className="duelbut">{button(data?.status)}</div>
    </div>
  );
};

export default Duelitem;
