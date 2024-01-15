"use server"

import { getServerSession } from "next-auth";
import { authOptions, getServerAuthSession } from "~/server/auth";

export const sessionDetails = async() =>{
    const session = await getServerSession(authOptions);
    return session;
}

// export const session = await getServerAuthSession();
