import Chat from "@/components/messagecomp/chat";

export default async function DatingConversationPage({ params }) {
  const { convId } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/c/${convId}`, {
    method: "GET",
  });
  const members = await response.json();

  return (
    <div className="h-full min-h-0 text-white">
      <Chat convId={convId} members={members} />
    </div>
  );
}
