import { constants } from "../../constants";
import { useRef ,useState} from "react";

const Duel = (props) => {
  const form = useRef(null);
  const [buttonV , setButton] = useState(true)
  const socket = props.socket;
  const Submit = async (e) => {
    e.preventDefault();
    setButton(false);
    const Data = {
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
    socket.emit('duelList',Data?.duelistB);
    setButton(true);
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
      
     { buttonV ? <button type="submit" className="duel">
        Submit
      </button> : <div>Please wait...</div>}
    </form>
  );
};

export default Duel;
