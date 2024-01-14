"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

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
      {type}
    </button>
  );
};

export default Button;
