import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connect from "@/utils/db";
import UserModel from "@/app/model/UserModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider !== "google") return false;

      await connect();

      const existingUser = await UserModel.findOne({
        provider: "google",
        providerId: account.providerAccountId,
      });

      if (!existingUser) {
        const newUser = await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: "google",
          providerId: account.providerAccountId,
        });

        user.id = newUser._id.toString();
      } else {
        user.id = existingUser._id.toString();
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
