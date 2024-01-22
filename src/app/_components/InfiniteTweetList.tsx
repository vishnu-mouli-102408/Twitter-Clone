import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileImage from "./ProfileImage";
import TweetCard from "./TweetCard";

export type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likesCount: number;
  isLiked: boolean;
  user: {
    id: string;
    image: string | null;
    name: string | null;
  };
};

type InfiniteTweetListProps = {
  tweets?: Tweet[];
  isLoading: boolean;
  isError: boolean;
  hasMore?: boolean;
  fetchNewTweets: () => Promise<unknown>;
};

const InfiniteTweetList = ({
  tweets,
  fetchNewTweets,
  isError,
  isLoading,
  hasMore,
}: InfiniteTweetListProps) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  if (tweets == null || tweets.length === 0)
    return (
      <h1 className="my-4 text-center text-2xl text-gray-500">
        No Tweets Found
      </h1>
    );
  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore!}
        loader={<h4>Loading...</h4>}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetList;
