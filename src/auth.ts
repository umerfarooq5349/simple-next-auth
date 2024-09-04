import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/utils/db/db";
import axios, { AxiosError } from "axios";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Facebook,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          let user = null;
          const response = await axios.post(`${process.env.SERVER}`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          user = response.data.data.user;

          if (response.status === 200 && response.data.data.user) {
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id || user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id!.toString();
      session.user.role = token.role!.toString();
      return session;
    },
  },
});
