import ProblemItem from "./ProblemItem";
const Problems = (props) => {
  console.log(props)
  const problems = props.problems
  const socket = props.socket
  const duelist = props.duelist
  return (
    <div className="problems_a">
      <div className="header_u">
        <p>Problems</p>
      </div>
      <div className="problem_list">
        {problems?.map((element)=>{ return <div className="problem"><ProblemItem element = {element} socket = {socket} room = {props.room} duelist = {duelist}/></div>})}
      </div>
    </div>
  );
};

export default Problems;
