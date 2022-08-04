const Problems = (props) => {
  console.log(props)
  let url = "https://codeforces.com/problemset/problem/" ;
  const problems = props.problems
  console.log(problems)
  return (
    <div className="problems_a">
      <div className="header_u">
        <p>Problems</p>
      </div>
      <div className="problem_list">
        {problems?.map((element)=>{ return <div className="problem"><a href={url+element.contestId+"/"+element.index} >{element.name}</a></div>})}
      </div>
    </div>
  );
};

export default Problems;
