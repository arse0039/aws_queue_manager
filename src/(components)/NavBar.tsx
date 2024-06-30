"use client"
import React, { useState, useEffect, startTransition} from "react";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import { signOut } from "aws-amplify/auth";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = ( {userLoggedIn}:{userLoggedIn:boolean}) => {
  const [authCheck, setAuthCheck] = useState<boolean>(userLoggedIn);
  const router = useRouter();

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setAuthCheck(false);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      } 
    })
    return () => hubListenerCancel();
  }, [router])

  const handleSignOut = async () => {
    if (authCheck) {
      await signOut();
    } 
      router.push("/Login/")
  }


  return (
    <nav className="flex justify-between bg-nav-light dark:bg-nav-dark p-4">
      <div className="flex items-center space-x-4 text-default-text-black dark:text-default-text-white">
      <Link href="/" className="text-default-text-black dark:text-default-text-white" >
          Home
      </Link>
      </div>
      <div className="flex justify-evenly">
        <DarkModeToggle/>
        {!authCheck ? (
        <Link href="/Login/" className="btn" >
          TA Login
        </Link>
        ) : (
          <button onClick={handleSignOut} className="btn">Sign-Out</button>
        )
        }
      </div>
    </nav>
  );
};

export default NavBar;
