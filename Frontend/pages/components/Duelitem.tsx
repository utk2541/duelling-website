const Duelitem = (props) => {
  const data = props.data;
  const cfId = props.cfId;
  console.log(data, cfId);
  const button = (status: string) => {
    if (status === "PENDING") {
      if (cfId == data.duelistB)
        return <button onClick={() => {}}>Accept</button>;
      else return "pls wait";
    } else if (status === "ACCEPTED")
      return <button onClick={() => {}}>View</button>;
  };
  return (
    <div className="duelitem">
      <div className="dueldata">
        <div className="duelcont">
          {data.duelistA === cfId ? "Opponent:" : "Challenger:"}{" "}
          {data.duelistA === cfId ? data.duelistB : data.duelistA}
        </div>
        <div className="duelcont">
          Total no. of Problems: {data.problems.length}
        </div>
        <div className="duelcont">
          Rating: {data.minRating + "-" + data.maxRating}
        </div>

        <div className="duelcont">Duration: {data.duration + " mins"}</div>
        <div className="duelcont">
          <div>Start Date: </div>
          <div> {data.startdate}</div>
        </div>
        <div className="duelcont">Start Time: {data.starttime}</div>
      </div>

      <div className="duelbut">{button(data.status)}</div>
    </div>
  );
};

export default Duelitem;
