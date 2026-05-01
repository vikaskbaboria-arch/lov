import mongoose from "mongoose";

let isConnected = false;

 const connectDB =async()=>{
    if(isConnected===true){
        console.log("database already connected");
        return;
    }
        try {
          const connect =  await mongoose.connect(process.env.MONGODB_URI)
          console.log(`MongoDB connected: ${connect.connection.host}`);
          isConnected=true;
        }
        catch(error){
           console.error(error.message);
           process.exit(1)
        }
}
export default connectDB;