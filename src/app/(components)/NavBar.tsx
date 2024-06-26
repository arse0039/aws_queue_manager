import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-nav-light dark:bg-nav-dark p-4">
      <div className="flex items-center space-x-4 text-default-text-black dark:text-default-text-white">
        Queue Manager
      </div>
      <div className="flex justify-evenly">
        <DarkModeToggle/>
        <Link href="/Login/" className="btn" >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
