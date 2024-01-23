import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { authOptions } from "~/server/auth";
import Button from "./button";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome } from "react-icons/vsc";

const SideNav = async () => {
  //   const session = useSession();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // console.log({ session });

  return (
    <nav className="sticky top-2 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {!user ? (
          <li>
            {/* <button onClick={() => void signIn()}>Login</button> */}
            <Button type="Login" />
          </li>
        ) : (
          <li>
            {/* <button onClick={() => void signOut()}>Log Out</button> */}
            <Button type="Logout" />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
