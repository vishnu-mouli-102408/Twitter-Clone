"use client";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";
import NewTweetForm from "./_components/NewTweetForm";
import CustomButton from "./_components/CustomButton";
import Button from "./_components/button";
import InfiniteTweetList from "./_components/InfiniteTweetList";
import { sessionDetails } from "./actions";
import { useEffect, useState } from "react";
import { DefaultUser } from "next-auth";
import FollowingTweets from "./_components/FollowingTweets";

const TABS = ["Recent", "Following"] as const;

export default function Home() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
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

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
        {session?.id && (
          <div className="flex ">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${tab === selectedTab ? "border-b-4 border-b-blue-500 font-bold" : ""}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweetForm />
      {selectedTab === "Recent" ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
}

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  // console.log("TWEETS LIST", tweets);

  return (
    <InfiniteTweetList
      tweets={tweets?.data?.pages?.flatMap((page) => page?.tweets)}
      isError={tweets?.isError}
      isLoading={tweets?.isLoading}
      hasMore={tweets?.hasNextPage}
      fetchNewTweets={tweets?.fetchNextPage}
    />
  );
}
