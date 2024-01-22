"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import CustomButton from "./CustomButton";
import ProfileImage from "./ProfileImage";
import { sessionDetails } from "../actions";
import type { DefaultUser } from "next-auth"; // Use `import type` for types

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const NewTweetForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [session, setSession] = useState<DefaultUser | null>(null); // Specify null as a possible type
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  useEffect(() => {
    const sessionFunction = async (): Promise<void> => {
      try {
        const sessionData = await sessionDetails();
        console.log(sessionData);
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

  if (!session) return null; // Return null instead of undefined

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.image} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's on your mind today?" // Corrected the typo in the placeholder
        />
      </div>
      <CustomButton className="self-end">Tweet</CustomButton>
    </form>
  );
};

export default NewTweetForm;
