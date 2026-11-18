import { useEffect, useRef, useState } from "react";
import { Copy, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DEMO_DOCUMENT_CODE = "3CBB7808-04B0-49EF-B619-B3E42012EA9E";

export function DocumentCodeCopy() {
  const [notification, setNotification] = useState(0);
  const pending = useRef(false);

  useEffect(() => {
    if (!notification) return;
    const timer = window.setTimeout(() => setNotification(0), 4000);
    return () => window.clearTimeout(timer);
  }, [notification]);

  async function copyCode() {
    if (pending.current) return;
    pending.current = true;
    setNotification(0);
    try {
      await navigator.clipboard.writeText(DEMO_DOCUMENT_CODE);
      setNotification(Date.now());
    } catch {
      // Clipboard denial or unavailability must never report success.
    } finally {
      pending.current = false;
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Αντιγραφή κωδικού εγγράφου"
        onClick={copyCode}
        className="flex h-auto min-h-8 w-full gap-2 whitespace-normal rounded-none p-0 text-[14px] font-normal text-doc-paper/85 hover:bg-transparent hover:text-doc-paper"
      >
        <span>Κωδικός Εγγράφου: {DEMO_DOCUMENT_CODE}…</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center"><Copy className="h-4 w-4" /></span>
      </Button>
      {notification > 0 && (
        <div className="fixed inset-x-0 top-0 z-[60] mx-auto flex min-h-[104px] max-w-[400px] items-center justify-between gap-4 bg-copy-success pb-5 pl-16 pr-5 pt-[calc(env(safe-area-inset-top)+24px)] font-condensed text-copy-success-foreground">
          <p role="status" aria-live="polite" className="min-w-0 max-w-[200px] text-left text-[16px] font-normal leading-tight">Επιτυχής Αντιγραφή Κωδικού Εγγράφου</p>
          <Button variant="ghost" aria-label="Κλείσιμο ειδοποίησης" onClick={() => setNotification(0)} className="h-8 w-8 shrink-0 p-0 text-copy-success-foreground/75 hover:bg-transparent hover:text-copy-success-foreground">
            <CircleX className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}