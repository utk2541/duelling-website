import { constants } from "../constants";
import Link from "next/link";
import Router from "next/router";
export default function Home() {
  const Submit = async (e) => {
    e.preventDefault();
    const data = { cfId: e.target.loginid.value };
    const JSONdata = JSON.stringify(data);
    const endpoint = constants.url + "/login/" + data.cfId;
    const options = {
      method: "GET",
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.message == "OK") {
      Router.push(`/profile/${data.cfId}`)
    } else alert("user not found");
  };

  return (
    <div className="page_a">
      <form onSubmit={Submit} className="regform" id="login">
        <h1 className="headingreg">
          Login by entering your codeforces ID or Click register if you are new
        </h1>
        <input
          type="text"
          id="loginid"
          name="loginid"
          required
          className="inp"
        />
        <div className="buttons">
          <button type="submit" className="button">
            Login
          </button>
          <Link href={"/register"} className="button">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
