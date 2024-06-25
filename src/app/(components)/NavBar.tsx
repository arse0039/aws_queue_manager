import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        Queue Manager
      </div>
      <div>
        <Link href="/Login/" className="btn" >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
