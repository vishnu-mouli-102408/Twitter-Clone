"use client";
import React, { useEffect, useState } from "react";
import { DefaultUser } from "next-auth";
import { sessionDetails } from "../actions";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";

type HeartButtonProps = {
  isLiked: boolean;
  likesCount: number;
  onClick: () => void;
  isLoading: boolean;
};

const HeartButton = ({
  isLiked,
  likesCount,
  isLoading,
  onClick,
}: HeartButtonProps) => {
  const [session, setSession] = useState<DefaultUser | null>(null); // Specify null as a possible type
  useEffect(() => {
    const sessionFunction = async (): Promise<void> => {
      try {
        const sessionData = await sessionDetails();
        // console.log("USER",sessionData);
        if (sessionData?.user) {
          setSession(sessionData?.user);
        } else {
          return;
        }
      } catch (error) {
        console.log("Error Occurred", error);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sessionFunction();
  }, []);

  // console.log("SESSION", session);

  const HeartIcon = isLiked ? VscHeartFilled : VscHeart;

  if (!session?.id) {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likesCount}</span>
      </div>
    );
  }

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        isLiked
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
      <IconHoverEffect red>
        <HeartIcon
          className={`transition-colors duration-200 ${
            isLiked
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
      </IconHoverEffect>
      <span>{likesCount}</span>
    </button>
  );
};

export default HeartButton;
