import Head from "next/head";
import React from "react";
import { api } from "~/trpc/server";
import { cache } from "react";
import Link from "next/link";
import IconHoverEffect from "~/app/_components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import ProfileImage from "~/app/_components/ProfileImage";
import FollowButton from "~/app/_components/FollowButton";
import TweetCard from "~/app/_components/TweetCard";

export const getUserData = cache(async (id: string) => {
  try {
    const res = await api.profile.getById.query({ id });
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    console.log({ res });
    return res;
  } catch (error: any) {
    // Handle error, maybe log it or return a default value
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error or handle it as needed
  }
});

const pluralRules = new Intl.PluralRules();
function getPlural(number: number, singular: string, plural: string) {
  return pluralRules.select(number) === "one" ? singular : plural;
}

export default async function ProflePage({
  params,
}: {
  params: { id: string };
}) {
  console.log("ID", params.id);

  const profile = await getUserData(params.id);
  console.log("DATA", profile);

  if (profile == null || profile.name == null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const toggleFollow = api.profile.toggleFollow;

  const tweets = await api.tweet.infiniteFeed.query({});
  console.log("TWEETS", tweets);

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  });

  return (
    <>
      <Head>
        <title>{`Twitter Clone - ${profile.name}`}</title>
      </Head>
      <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
        <Link href=".." className="mr-2">
          <IconHoverEffect>
            <VscArrowLeft className="h-6 w-6" />
          </IconHoverEffect>
        </Link>
        <ProfileImage src={profile.image} className="flex-shrink-0" />
        <div className="ml-2 flex-grow">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <div className="text-gray-500">
            {profile.tweetsCount}{" "}
            {getPlural(profile.tweetsCount, "Tweet", "Tweets")} -{" "}
            {profile.followersCount}{" "}
            {getPlural(profile.followersCount, "Follower", "Followers")} -{" "}
            {profile.followsCount} Following
          </div>
        </div>
        <FollowButton
          isFollowing={profile.isFollowing}
          isLoading={false}
          userId={params.id}
          onClick={() => toggleFollow.mutate({ userId: params.id })}
        />
      </header>
      <main>
        {tweets.tweets.map((tweet) => {
          return (
            <li className="flex gap-4 border-b px-4 py-4">
              <Link href={`/profiles/${tweet.id}`}>
                <ProfileImage src={tweet.user.image} />
              </Link>
              <div className="flex flex-grow flex-col">
                <div className="flex gap-1">
                  <Link
                    href={`/profiles/${tweet.id}`}
                    className="font-bold outline-none hover:underline focus-visible:underline"
                  >
                    {tweet.user.name}
                  </Link>
                  <span className="text-gray-500">-</span>
                  <span className="text-gray-500">
                    {dateTimeFormatter.format(tweet.createdAt)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{tweet.content}</p>
              </div>
            </li>
          );
        })}
      </main>
    </>
  );
}
