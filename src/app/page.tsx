import TALandingPage from "./TALanding/page";
import { isAuthenticated } from "@/utils/amplifyServerUtils";
import GenericLanding from '@/(components)/GenericLanding';

const Home = async () => {

  const isLoggedIn = await isAuthenticated();

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <div>
        {!!isLoggedIn ? <TALandingPage/> : <GenericLanding/>}
      </div>
    </main>
  );
}

export default Home;