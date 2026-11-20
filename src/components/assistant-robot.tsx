import robot from "@/assets/pocketly-assistant-robot.png.asset.json";

/** The Pocketly assistant's robot picture, shown in a small circle (home header and chat header). */
export function AssistantRobot({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-full bg-chat-header ${className}`}>
      <img src={robot.url} alt="" aria-hidden draggable={false} className="h-full w-full object-cover" />
    </span>
  );
}
