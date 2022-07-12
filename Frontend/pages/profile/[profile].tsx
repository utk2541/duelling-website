import { useRouter } from "next/router";
import Duel from "../components/Duel";
import Profile from "../components/Profile";
const profile = () => {
  const router = useRouter();
  const { profile } = router.query;

  return (
    <div className="page_a">
      <Profile cfId={profile} /> <Duel challenger={profile} />
    </div>
  );
};

export default profile;
