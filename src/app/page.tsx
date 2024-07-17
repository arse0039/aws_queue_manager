import { fetchAuthSession } from 'aws-amplify/auth';
import { isAuthenticated } from "@/utils/amplifyServerUtils";
import GenericLanding from '@/(components)/GenericLanding';
import TALandingPage from "./TALanding/page";

const Home = async () => {

  const isLoggedIn = await isAuthenticated();
  const { tokens } = await fetchAuthSession();
  const idToken = tokens?.idToken?.toString();

  return (
    <main className="h-full">
      <div>
        {!!isLoggedIn ? <TALandingPage idToken={idToken} userID={isLoggedIn}/> : <GenericLanding/>}
      </div>
    </main>
  );
}

export default Home;