import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "KAKAO_CLIENT_ID",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "KAKAO_CLIENT_SECRET",
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
});
