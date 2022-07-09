import Router from "next/router";
import { constants } from "../constants";
const register = () => {
  const Submit = async (e) => {
    e.preventDefault();
    const data = { cfId: e.target.cfId.value };
    const JSONdata = JSON.stringify(data);
    const endpoint = constants .url + "/createDuelist";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    alert(result.message);
    console.log(result);
    if(result.stat== "YES") Router.back()
    
  };
  return (
    <div className="page_a">
    <form onSubmit={Submit} className = "regform" >
      <h1 className="headingreg">Enter Codeforces Id</h1>
      <input type="text" id="cfId" name="cfId" required  className="inp"/>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default register;
