"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import ProfileImage from "./ProfileImage";
import { sessionDetails } from "../actions";
import { DefaultUser } from "next-auth";

const NewTweetForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [session, setSession] = useState<DefaultUser>({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  useEffect(() => {
    try {
      const sessionFunction = async () => {
        const session = await sessionDetails();
        console.log(session);
        if (session?.user) {
          setSession(session?.user);
        } else {
          return;
        }
      };
      sessionFunction();
    } catch (error) {
      console.log("Error Occured", error);
    }
  }, []);

  if (!session) return;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session?.image} />
        <textarea
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's on you mind today?"
        />
      </div>
      <CustomButton className="self-end">Send</CustomButton>
    </form>
  );
};

export default NewTweetForm;
