import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/grafbase/common.types";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    })
  ],
  // jwt: {
  //   encode: ({ secret, token }) => {

  //   },
  //   decode: ({ secret, token }) => {

  //   }
  // },
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg'
  },
  callbacks: {
    async session({ session }) {
      return session
    },
    async signIn({ user }: { user: AdapterUser | User}) {
      try{

        return true
      } catch(err: any) {
        console.log(err)
        return false
      }
  },
}
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;

  return session
}