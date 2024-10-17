import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import { signInSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";

import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";

const publicRoutes = ["/", "/login", "/register"];
const authRoutes = ["/login", "/register"];
const adminRoutes = [/^\/panel/];

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Awesome Email" },
        password: { label: "Password", type: "password", placeholder: "Your Awesome Password" },
      },
      async authorize(credentials) {

        let user = null;
        
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        
        user = await prisma.user.findUnique({
          where: {
              email: credentials.email as string,
          },
        });
        
        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          console.log("User has no password. They probably signed up with an oauth provider.");
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const role = auth?.user.role || "user";

      if (publicRoutes.includes(pathname)) {
        return true;
      }

      if (authRoutes.includes(pathname) && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (adminRoutes.some(route => route.test(pathname)) && role !== "admin") {
        return Response.redirect(new URL("/", nextUrl));
      }

      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
} satisfies NextAuthConfig;
