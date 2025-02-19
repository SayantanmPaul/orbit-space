import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

export { authOptions as GET, authOptions as POST };
