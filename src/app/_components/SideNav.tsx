import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { authOptions } from "~/server/auth";
import Button from "./button";

const SideNav = async () => {
  //   const session = useSession();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  //   console.log({ user });

  return (
    <nav className="sticky top-2 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>Profile</Link>
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
