import { useEffect, useState } from "react";

const ProblemItem = (props) => {
  let url = "https://codeforces.com/problemset/problem/";
  const contestId = props.element?.contestId;
  const index = props?.element?.index;
  const name = props?.element?.name;
  const duelist = props?.duelist;
  const [claimed, setClaim] = useState(false);
  const socket = props?.socket;
  useEffect(()=>{
    if(props?.element?.solvedBy !== "none")
      setClaim(true);
  },[props.element])
  

  const claimProblem = async (e) => {
    e.preventDefault();
    console.log(duelist);
    if (socket) {
      socket.emit("update", {
        room: props?.room,
        element: props?.element,
        duelist: duelist,
      });
    }
  };
  return (
    <div className="ProblemItem">
      <a href={url + contestId + "/" + index}>{name}</a>
      {claimed ? (
        <div>claimed</div>
      ) : (
        <button onClick={claimProblem}> claim</button>
      )}
    </div>
  );
};

export default ProblemItem;
