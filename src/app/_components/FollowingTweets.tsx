"use client";
import React from "react";
import { api } from "~/trpc/react";
import InfiniteTweetList from "./InfiniteTweetList";

const FollowingTweets = () => {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
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
};

export default FollowingTweets;
