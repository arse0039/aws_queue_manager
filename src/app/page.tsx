
import { isAuthenticated } from "@/utils/amplifyServerUtils";
import GenericLanding from '@/(components)/GenericLanding';
import TALandingPage from "./TALanding/page";

const Home = async () => {

  const isLoggedIn = await isAuthenticated();

  return (
    <main className="h-full">
      <div>
        {!!isLoggedIn ? <TALandingPage userID={isLoggedIn}/> : <GenericLanding/>}
      </div>
    </main>
  );
}

export default Home;