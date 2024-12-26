import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { connectToDb } from "@utils/db";
import User from "@models/user";

console.log({clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({session}) {
      const sessionUser = await User.findOne({email: session.user.email})
      session.user.id = sessionUser._id.toString();
      return session; 
    },
    async signIn({profile}) {
      try {
        await connectToDb();
  
        // check if user exists
        const user = await User.findOne({email: profile.email})
        console.log({profile})
        // if not, create a new user
        if(!user) {
          const user = new User({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
          await user.save()
        }
  
  
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})

export {handler as GET, handler as POST}