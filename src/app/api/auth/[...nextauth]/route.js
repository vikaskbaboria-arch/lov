import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User.model.js";
import connectDB from "@/lib/connectDB";


export const authOptions ={
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{type:'email',label:'Email'},
                password:{type:'password',label:'Password'}
            },
            async authorize(credentials){
                await connectDB();
                const user= await User.findOne({email:credentials.email})
                if(!user){
                    return null
                }
                
                if(user.isVerified===false){
                    console.log("verify your email")
                    return null
                }
                 const isMatch = await user.isPasswordCorrect(
               credentials.password
              )


            if (!isMatch) {
              console.log("Password incorrect")
              return null
            }
                return{
                    id:user._id,
                    email:user.email,
                    username:user.username,
                    profilePic:user.profilePic
                }
            }
        }),
        
    ]
    ,
    session:{
        strategy:"jwt"
    },
    callbacks: {
  async jwt({ token, user }) {
    // runs on login
    if (user) {
      token.id = user.id;
      token.username = user.username;
      token.email = user.email; // important
      token.profilePic = user.profilePic;
    }
    return token;
  },

  async session({ session, token }) {
    // attach custom fields to session
    if (token) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.profilePic = token.profilePic;
    }
    return session;
  }
}
     ,
      secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };