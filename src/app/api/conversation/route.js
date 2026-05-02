import Conversation from "@/models/Conversation.model.js"
import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (req) => {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }   
        const { recipientId } = await req.json();
        const userId = session?.user?.id;
        let conversation = await Conversation.findOne({
            members: { $all: [userId, recipientId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [userId, recipientId]
            });
        }
        return new Response(JSON.stringify({ conversation }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}