import NextAuth from 'next-auth'
import { mongoose } from 'mongoose';
import GoogleProvider from 'next-auth/providers/google'
import User from '@/model/User';

export const authoptions = NextAuth({
  providers: [
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      const userEmail = email || (profile && profile.email) || user.email;
      if (!userEmail) {
        throw new Error("Email not found for user");
      }

      if (account.provider === "google") {
        await mongoose.connect("mongodb://localhost:27017/form");

        // Find the user by email
        const currentUser = await User.findOne({ email: userEmail });
        
        if (!currentUser) {
          // Create a new user if not found
          const newUser = new User({
            email: userEmail,
            username: profile.name || user.name || userEmail,
            password: "default_password",
          });
    
          await newUser.save();
          user.name = newUser.username;
        } 
      }

      return true;
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      // console.log(dbUser)
      session.user.name = dbUser.username
      return session
    },
  },
});

export { authoptions as GET, authoptions as POST };

