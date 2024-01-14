"use client";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import ProfileImage from "./ProfileImage";
import { session } from "../actions";

const NewTweetForm = () => {
  const [inputValue, setInputValue] = useState("");
  console.log(session);
  if (!session?.user) return;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        {/* <ProfileImage src={session?.user?.image} /> */}
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
