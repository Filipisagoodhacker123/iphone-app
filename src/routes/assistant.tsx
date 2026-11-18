import { createFileRoute } from "@tanstack/react-router";
import { AssistantChat } from "@/components/assistant-chat";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Pocketly — Βοηθός συνομιλίας" },
      { name: "description", content: "Chat with Pocketly, the demo assistant of the Pocketly wallet." },
      { property: "og:title", content: "Pocketly — Βοηθός συνομιλίας" },
      { property: "og:description", content: "Chat with Pocketly, the demo assistant of the Pocketly wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssistantChat,
});
