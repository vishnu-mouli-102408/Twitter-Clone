"use server";

import { getServerSession } from "next-auth";
import { authOptions, getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export const sessionDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

// export const session = await getServerAuthSession();

export const createTweet = api.tweet.create.mutate;
