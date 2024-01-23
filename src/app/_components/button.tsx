"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import IconHoverEffect from "./IconHoverEffect";
import { VscSignIn, VscSignOut } from "react-icons/vsc";

const Button = ({ type }: { type: string }) => {
  return (
    <button
      onClick={
        type === "Login"
          ? () => signIn()
          : type === "Logout"
            ? () => signOut()
            : undefined
      }
    >
      <IconHoverEffect>
        <span className="flex items-center gap-4">
          {type === "Login" ? (
            <VscSignIn className={`green h-8 w-8 fill-green-700`} />
          ) : (
            <VscSignOut className={`green h-8 w-8 fill-red-700`} />
          )}
          <span className="hidden text-lg md:inline">{type}</span>
        </span>
      </IconHoverEffect>
    </button>
  );
};

export default Button;
