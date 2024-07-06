import TALandingPage from "./TALanding/page";
import { isAuthenticated } from "@/utils/amplifyServerUtils";
import GenericLanding from '@/(components)/GenericLanding';

const Home = async () => {

  const isLoggedIn = await isAuthenticated();

  return (
    <main className="h-full">
      <div>
        {!!isLoggedIn ? <TALandingPage/> : <GenericLanding/>}
      </div>
    </main>
  );
}

export default Home;