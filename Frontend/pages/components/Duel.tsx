import { constants } from "../../constants";
import { useRef } from "react";

const Duel = (props) => {
  const form = useRef(null);
  interface Datatype1 {
    duelistA: string;
    duelistB: string;
    rmin: number;
    rmax: number;
    numofproblem: number;
  }
  const Submit = async (e) => {
    e.preventDefault();
    const Data: Datatype1 = {
      duelistA: props.challenger,
      duelistB: e.target.cfId.value,
      rmin: e.target.rmin.value,
      rmax: e.target.rmax.value,
      numofproblem: e.target.pno.value,
    };
    const Send = JSON.stringify({ Data });
    const endpoint = constants.url + "/createDuel";
    console.log(endpoint);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: Send,
    };

    const response = await fetch(endpoint, options);
    const message = await response.json();
    alert(message.status);
  };
  return (
    <form ref={form} onSubmit={Submit} className="regform" id="duel">
      <h1 className="headingreg" id="dhead">
        Challenge a User
      </h1>
      <div className="duelrow">
        <label htmlFor="cfId" className="duel">
          Cf id of Opponent
        </label>
        <input type="text" id="cfId" name="cfId" required className="duel" />
      </div>
      <div className="duelrow">
        <label htmlFor="pno" className="duel">
          <p>no. of problems per rating (1-5)</p>
        </label>
        <input
          type="number"
          id="pno"
          name="pno"
          onKeyDown={() => {
            return false;
          }}
          required
          className="duel"
          min="1"
          max="5"
          step="1"
          defaultValue={"1"}
        />
      </div>
      <div className="duelrow">
        <label htmlFor="rmin" className="duel">
          <p>rating (min-max)</p>
        </label>
        <input
          type="number"
          id="rmin"
          name="rating"
          onKeyDown={() => {
            return false;
          }}
          required
          className="duel"
          min="800"
          max="3500"
          step="100"
          defaultValue={"800"}
        />
        <input
          type="number"
          id="rmax"
          name="rating"
          onKeyDown={() => {
            return false;
          }}
          required
          className="duel"
          min="800"
          max="3500"
          step="100"
          defaultValue={"800"}
        />
      </div>
      
      <button type="submit" className="duel">
        Submit
      </button>
    </form>
  );
};

export default Duel;
