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

export default function Home() {
  // const session = await getServerAuthSession();
  // const sessionData = await sessionDetails();
  // console.log({ sessionData });

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm />
      <RecentTweets />
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
  console.log("TWEETS LIST", tweets);

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
