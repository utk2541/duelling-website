import { useEffect, useState } from "react";
import { constants } from "../../constants";

const Profile = (props) => {
  const cfId = props.cfId;
  const url = constants.url;
  const [Data, setData] = useState({
    duelRating: 1500,
    id: 1,
    cfhandle: "none",
    cfRating: 0,
    pfp: "https://cdn-userpic.codeforces.com/no-avatar.jpg",
  });
  const [datafetched, setdatafetched] = useState(false);
  useEffect(() => {
    const fetchdata = async (url) => {
      const profile = await fetch(url + `/getprofile/${cfId}`);
      const result = await profile.json();

      setdatafetched(true);
      setData(result.profile);
    };
    if (!datafetched) fetchdata(url);
  });
  return Data !== undefined ? (
    <div>
      <h1>{Data.cfhandle}</h1>
      <div>{}</div>
    </div>
  ) : (
    <div></div>
  );
};

export default Profile;
