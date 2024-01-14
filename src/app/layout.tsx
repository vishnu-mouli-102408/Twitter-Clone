import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Head from "next/head";
import SideNav from "./_components/SideNav";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Twitter Clone",
  description:
    "This is a Twitter Clone Application Created using latest T3 Stack(TypeSafe) by Vishnu Mouli",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        {/* <SessionProvider> */}
        <TRPCReactProvider cookies={cookies().toString()}>
          <Head>
            <title>Twitter Clone</title>
            <meta
              name="description"
              content="This is a Twitter Clone Application Created using latest T3 Stack(TypeSafe)"
            />
          </Head>
          <div className="container mx-auto flex items-start sm:pr-4">
            <SideNav />
            <div className="min-h-screen flex-grow border-x">{children}</div>
          </div>
        </TRPCReactProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
