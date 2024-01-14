"use server"

import { getServerSession } from "next-auth";
import { authOptions, getServerAuthSession } from "~/server/auth";

export const session = await getServerSession(authOptions);

// export const session = await getServerAuthSession();
