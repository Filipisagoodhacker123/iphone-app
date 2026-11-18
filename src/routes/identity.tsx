import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, X } from "lucide-react";
import { DocumentCodeCopy } from "@/components/document-code-copy";
import { SecurityCheck } from "@/components/security-check";
import { BackChevron, WalletCardsIcon, PdfDocIcon, QrSolidIcon, QrScanIcon } from "@/components/identity-icons";
import { MemberPhoto } from "@/components/member-photo";
import decorativeQr from "@/assets/decorative-qr.svg";

export const Route = createFileRoute("/identity")({
  head: () => ({
    meta: [
      { title: "Gov.gr Wallet — Δελτίο Ταυτότητας (demo)" },
      { name: "description", content: "A fictional demo identity document viewer in the Gov.gr Wallet sample wallet." },
      { property: "og:title", content: "Gov.gr Wallet — Δελτίο Ταυτότητας (demo)" },
      { property: "og:description", content: "A fictional demo identity document viewer in the Gov.gr Wallet sample wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IdentityDetail,
});

const fields: [string, string][] = [
  ["ΕΠΩΝΥΜΟ", "ΑΛΕΞΙΟΥ"],
  ["SURNAME", "ALEXIOY"],
  ["ΟΝΟΜΑ", "ΧΡΗΣΤΟΣ"],
  ["GIVEN NAME", "XRHSTOS"],
  ["ΟΝΟΜΑ ΠΑΤΕΡΑ", "ΣΤΑΘΗΣ"],
  ["FATHER'S NAME", "STATHIS"],
  ["ΟΝΟΜΑ ΜΗΤΕΡΑΣ (MOTHER'S NAME)", "ΕΛΕΝΑ"],
  ["ΗΜ. ΓΕΝΝΗΣΗΣ (DATE OF BIRTH)", "20/7/2007"],
  ["ΤΟΠΟΣ ΓΕΝΝΗΣΗΣ (PLACE OF BIRTH)", "ΘΕΣΣΑΛΟΝΙΚΗ"],
];

type Action = {
  Icon: (p: { className?: string }) => ReactNode;
  icon: string;
  top?: string;
  label: string;
  tone: string;
  /** What the button opens; omitted means the action is unavailable and the button is disabled. */
  opens?: "qr" | "security";
};

const actions: Action[] = [
  {
    Icon: WalletCardsIcon,
    icon: "h-[27px]! w-[38px]!",
    top: "Προσθήκη στο",
    label: "Apple Wallet",
    tone: "border-doc-paper/20 bg-popover/90 text-doc-paper/50 disabled:opacity-100 [&_svg]:opacity-55",
  },
  {
    Icon: PdfDocIcon,
    icon: "h-[27px]! w-[20px]!",
    label: "Αντίγραφο",
    tone: "border-doc-paper/45 bg-doc-paper/40 text-doc-ink hover:bg-doc-paper/40 hover:text-doc-ink",
    opens: "security",
  },
  {
    Icon: QrSolidIcon,
    icon: "h-[26px]! w-[26px]!",
    top: "Προβολή",
    label: "QR κωδικού",
    tone: "border-doc-paper bg-doc-paper text-doc-ink hover:bg-doc-paper hover:text-doc-ink",
    opens: "qr",
  },
  {
    Icon: QrScanIcon,
    icon: "h-[30px]! w-[30px]!",
    label: "Quick Scan",
    tone: "border-doc-paper/45 bg-doc-paper/40 text-doc-ink hover:bg-doc-paper/40 hover:text-doc-ink",
    opens: "qr",
  },
];

function IdentityDetail() {
  const [securityOpen, setSecurityOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!qrOpen && !menuOpen && !securityOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQrOpen(false);
        setMenuOpen(false);
        setSecurityOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [qrOpen, menuOpen, securityOpen]);

  return (
    <div className="navy-bg relative isolate min-h-dvh font-condensed text-foreground">
      <div aria-hidden="true" className="id-pattern" />
      <div className="mx-auto max-w-[400px]">
        <header className="sticky top-0 z-30 bg-doc-blue pt-[env(safe-area-inset-top)]">
          <div className="flex h-14 items-center justify-between px-2">
            <Button variant="ghost" aria-label="Πίσω" asChild className="grid h-10 w-10 place-items-center p-0 text-doc-paper hover:bg-transparent hover:text-doc-paper">
              <Link to="/"><BackChevron className="h-[20px]! w-[12px]!" /></Link>
            </Button>
            <h1 className="text-[19px] font-normal tracking-normal text-doc-paper">Δελτίο Ταυτότητας</h1>
            <Button
              variant="ghost"
              aria-label="Μενού"
              aria-haspopup="dialog"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center p-0 text-doc-paper hover:bg-transparent hover:text-doc-paper [&_svg]:size-6"
            >
              <MoreVertical className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <section className="relative flex items-start justify-between gap-4 bg-doc-blue px-5 pt-[46px] text-doc-paper">
          <div className="min-w-0 pb-3">
            <p className="text-[15px] font-normal leading-tight text-doc-paper/80">Αριθμός Ταυτότητας:</p>
            <p className="mt-0.5 text-[34px] font-bold leading-none tracking-normal">MA678909</p>
            <p className="mt-2 text-[15px] font-normal leading-tight text-doc-paper/80">Ημ. Έκδοσης:</p>
            <p className="mt-0.5 text-[24px] font-normal leading-tight">2025-04-29</p>
          </div>
          <div className="relative z-10 -mb-9 aspect-square w-[44%] max-w-[160px] shrink-0 overflow-hidden rounded-[10px] bg-doc-paper shadow-md">
            <MemberPhoto />
          </div>
        </section>

        <div
          className="px-5 pb-10"
          style={{ paddingTop: "max(26px, calc(min(160px, 0.44 * (min(100vw, 400px) - 40px)) - 100px))" }}
        >
          <div className="grid grid-cols-2 gap-3.5 font-sans min-[380px]:gap-4">
            {actions.map(({ Icon, icon, top, label, tone, opens }) => (
              <Button
                variant="ghost"
                key={label}
                disabled={!opens}
                aria-disabled={!opens}
                onClick={() => (opens === "qr" ? setQrOpen(true) : opens === "security" ? setSecurityOpen(true) : undefined)}
                className={`flex h-[52px] min-w-0 items-center justify-start gap-2.5 whitespace-normal rounded-[8px] border px-3 py-0 text-left font-normal shadow-none transition active:scale-[0.98] ${tone}`}
              >
                <Icon className={`shrink-0 ${icon}`} />
                {top ? (
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="text-[11.5px] opacity-80">{top}</span>
                    <span className="text-[14px] font-medium">{label}</span>
                  </span>
                ) : (
                  <span className="min-w-0 text-[15px] leading-tight">{label}</span>
                )}
              </Button>
            ))}
          </div>

          <div className="mt-12">
            {fields.map(([label, value]) => (
              <div key={label} className="border-b border-doc-paper/45 py-4">
                <p className="text-[16px] font-light uppercase tracking-[0.02em] text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-[34px] font-normal leading-tight tracking-normal text-doc-paper">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-center font-sans">
            <DocumentCodeCopy />
            <p className="text-[13px] text-doc-paper/60">Δεν αποτελεί διεθνές ταξιδιωτικό έγγραφο</p>
            <p className="text-[13px] text-doc-paper/60">Not an international travel document</p>
          </div>
        </div>
      </div>

      {qrOpen && (
        <div role="dialog" aria-modal="true" aria-label="QR κωδικός" className="fixed inset-0 z-50 bg-qr-backdrop">
          <div className="relative mx-auto flex h-full max-w-[400px] items-center justify-center px-6">
            <Button
              variant="ghost"
              aria-label="Κλείσιμο"
              autoFocus
              onClick={() => setQrOpen(false)}
              className="absolute left-[22px] top-[calc(env(safe-area-inset-top)+58px)] grid h-11 w-11 place-items-center p-0 text-doc-paper hover:bg-transparent hover:text-doc-paper [&_svg]:size-[30px]"
            >
              <X strokeWidth={2.4} />
            </Button>
            <img
              src={decorativeQr}
              alt="Διακοσμητικό μοτίβο QR (δεν σαρώνεται)"
              width={348}
              height={348}
              draggable={false}
              className="aspect-square w-full max-w-[352px] select-none"
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Επιλογές εγγράφου" className="fixed inset-0 z-50 bg-scrim" onClick={() => setMenuOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 mx-auto max-w-[400px] space-y-[9px] px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] font-condensed"
          >
            <Button
              onClick={() => setMenuOpen(false)}
              className="h-[64px] w-full rounded-[8px] bg-doc-paper text-[18px] font-bold tracking-normal text-modal-primary-ink shadow-none hover:bg-doc-paper/90"
            >
              Ανάκληση Ψηφιακού Εγγράφου
            </Button>
            <Button
              autoFocus
              onClick={() => setMenuOpen(false)}
              className="h-[64px] w-full rounded-[8px] bg-modal-secondary text-[18px] font-bold tracking-normal text-doc-paper shadow-none hover:bg-modal-secondary/90"
            >
              Άκυρο
            </Button>
          </div>
        </div>
      )}

      {securityOpen && <SecurityCheck onClose={() => setSecurityOpen(false)} />}
    </div>
  );
}
