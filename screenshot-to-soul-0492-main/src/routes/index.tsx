import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MemberPhoto } from "@/components/member-photo";
import { AssistantRobot } from "@/components/assistant-robot";
import { Menu, Mail, Eye, EyeOff, ChevronRight, Ticket, Plus, X, User, Wallet, Inbox, Settings, FileText, QrCode, ScanLine } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gov.gr Wallet — Your sample cards wallet" },
      { name: "description", content: "A demo wallet for sample membership and library cards." },
      { property: "og:title", content: "Gov.gr Wallet — Your sample cards wallet" },
      { property: "og:description", content: "A demo wallet for sample membership and library cards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const cards = [
  { title: "Δελτίο Ταυτότητας", tone: "bg-doc-blue", ref: "MA678909", date: "Ημ. Έκδοσης: 2025-04-29", licence: false },
  { title: "Άδεια Οδήγησης", tone: "bg-doc-coral", ref: "– – – – – – – –", date: "Ισχύς μέχρι: --/--/----", licence: true },
];

type Sheet = null | { title: string; body: ReactNode };

function SectionHead({ title, link, onClick }: { title: string; link: string; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 pb-4">
      <h2 className="text-[16px] font-normal">{title}</h2>
      <Button variant="ghost" onClick={onClick} className="flex items-center h-auto gap-2 rounded-none p-0 text-[14px] font-normal hover:bg-transparent hover:text-foreground">
        {link} <ChevronRight className="h-4 w-4 text-primary" strokeWidth={3} />
      </Button>
    </div>
  );
}

function Index() {
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const demo = (title: string) => setSheet({ title, body: <p className="text-muted-foreground">Οθόνη επίδειξης — δεν υπάρχει περιεχόμενο ακόμη.</p> });

  return (
    <div className="halftone-bg min-h-dvh overflow-x-hidden text-foreground">
      <div className="mx-auto max-w-[400px] pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+12px)]">
        <header className="flex items-center h-12 justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" aria-label="Μενού" onClick={() => setDrawer(true)} className="grid h-8 w-8 place-items-center p-0 [&_svg]:size-6"><Menu className="h-6 w-6" /></Button>
            <span className="text-[24px] font-bold leading-none">gov.<span className="text-primary">gr</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" aria-label="Βοηθός Pocketly" onClick={() => navigate({ to: "/assistant" })} className="flex h-8 items-center gap-1.5 p-0 text-[18px] font-bold hover:bg-transparent">
              <AssistantRobot className="h-8 w-8" />
              <span>mAi<span className="text-primary">gov</span></span>
            </Button>
            <Button variant="ghost" aria-label="Εισερχόμενα" onClick={() => setSheet({ title: "Εισερχόμενα", body: <ul className="space-y-3">{["Καλώς ήρθατε στο Gov.gr Wallet", "Νέα δείγμα κάρτα διαθέσιμη"].map((m) => <li key={m} className="rounded-xl border border-border bg-card p-4">{m}</li>)}</ul> })} className="grid h-8 w-8 place-items-center rounded-full bg-secondary p-0 text-secondary-foreground [&_svg]:size-5"><Mail className="h-5 w-5" /></Button>
          </div>
        </header>

        <div ref={ref} onScroll={(e) => { const el = e.currentTarget; const card = el.firstElementChild; if (card) setPage(Math.min(cards.length - 1, Math.round(el.scrollLeft / (card.clientWidth + 16)))); }} className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 [scroll-padding-inline:16px]">
          {cards.map((c, i) => (
            <div key={c.ref} onClick={i === 0 ? () => navigate({ to: "/identity" }) : undefined} className={`relative h-[175px] w-[calc(100%-10px)] shrink-0 snap-start overflow-hidden rounded-xl bg-doc-paper shadow-lg${i === 0 ? " cursor-pointer" : ""}`}>
              <div className={`${c.tone} doc-pattern flex h-[91px] items-start px-4 pt-4 text-[19px] text-doc-paper`}>
                <span>{c.title}</span>
              </div>
              <div className="px-4 pt-2 text-doc-ink">
                <div>
                  <div className="max-w-[calc(100%-112px)] truncate text-[22px] font-bold leading-tight">{c.ref}</div>
                  <div className="mt-1 max-w-[calc(100%-112px)] text-[12px] text-doc-ink-muted">{c.date}</div>
                </div>
                {c.licence ? (
                  <div className="absolute right-5 top-[51px] grid h-[104px] w-[104px] place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-doc-blue/90 shadow-sm"><User className="h-8 w-8 text-doc-paper" /></span></div>
                ) : (
                  <div className="absolute right-5 top-[51px] grid h-[104px] w-[104px] place-items-center overflow-hidden rounded-xl bg-doc-avatar shadow-sm"><MemberPhoto /></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[18px] flex justify-center gap-2">
          {cards.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === page ? "bg-foreground" : "bg-muted-foreground/50"}`} />)}
        </div>

        <Button variant="ghost" onClick={() => setShow(!show)} className="mx-6 mt-7 flex h-[60px] w-[calc(100%-3rem)] items-center justify-between rounded-xl border border-foreground/90 bg-transparent px-4 py-0 text-[20px] font-normal hover:bg-transparent [&_svg]:size-6">
          <span>{show ? "Προσ. Αριθμός: 742357895437" : "Προσωπικός Αριθμός"}</span>
          {show ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
        </Button>

        <div className="mt-4"><SectionHead title="My wallet" link="Προβολή" onClick={() => demo("My wallet")} /></div>
        <div className="grid grid-cols-4 justify-items-center gap-3 px-4 pt-1">
          {[0, 1, 2, 3].map((i) => (
            <Button variant="ghost" key={i} onClick={() => demo(i === 0 ? "Εισιτήρια" : "Κενή θέση")} className="flex h-auto w-full flex-col items-center gap-3 p-0 font-normal hover:bg-transparent [&_svg]:size-8">
              <span className={`grid aspect-square w-[60px] max-w-full place-items-center rounded-xl border transition active:scale-95 ${i === 0 ? "border-transparent bg-secondary text-secondary-foreground" : "border-border bg-card text-muted-foreground"}`}>{i === 0 && <Ticket className="h-9 w-9" />}</span>
              <span className="h-4 text-[12px] leading-none">{i === 0 ? "Εισιτήρια" : ""}</span>
            </Button>
          ))}
        </div>

        <section className="mt-4 border-t border-border bg-queue-band py-4"><div><SectionHead title="Η θυρίδα μου" link="Προβολή" onClick={() => demo("Η θυρίδα μου")} /></div>
        <Row first={<><p className="text-[15px] leading-snug">Ψηφιακή Βεβαίωση Δείγματος</p><p className="text-[12px] text-muted-foreground">05/03/2025, 10:49</p></>} /></section>

        <div className="mt-4"><SectionHead title="Επίκαιρες υπηρεσίες" link="Όλες οι υπηρεσίες" onClick={() => demo("Όλες οι υπηρεσίες")} /></div>
        <Row first={<p className="text-[15px] leading-snug">1. Έκδοση Προσωπικού Αριθμού</p>} />

        <footer className="mt-12 space-y-1 px-6 text-center text-sm text-muted-foreground">
          <Button variant="ghost" onClick={() => demo("Πληροφορίες απορρήτου")} className="h-auto p-0 font-normal underline">Πληροφορίες απορρήτου</Button>
          <p>Έκδοση 1.0.0 (demo)</p>
        </footer>
      </div>

      <Button variant="ghost" aria-label="Ενέργειες" onClick={() => setSheet({ title: "Ενέργειες", body: <div className="grid grid-cols-3 gap-3">{[[QrCode, "Σάρωση QR"], [ScanLine, "Προσθήκη κάρτας"], [FileText, "Νέο αίτημα"]].map(([I, l]) => { const Ic = I as typeof QrCode; return <Button variant="ghost" key={l as string} className="flex h-auto whitespace-normal flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm"><Ic className="h-6 w-6 text-primary" />{l as string}</Button>; })}</div> })} className="fab-glow fixed bottom-[calc(env(safe-area-inset-bottom)+clamp(64px,50dvh-298px,128px))] right-[max(28px,calc(50%-200px+28px))] grid h-[60px] w-[60px] place-items-center rounded-full bg-primary p-0 text-primary-foreground hover:bg-primary [&_svg]:size-8">
        <Plus className="h-9 w-9" strokeWidth={1.5} />
      </Button>

      {drawer && (
        <div className="fixed inset-0 z-40 bg-background/60" onClick={() => setDrawer(false)}>
          <nav onClick={(e) => e.stopPropagation()} className="h-full w-72 bg-popover p-6 pt-[calc(env(safe-area-inset-top)+24px)]">
            <Button variant="ghost" aria-label="Κλείσιμο" onClick={() => setDrawer(false)} className="mb-6 h-auto p-0"><X /></Button>
            {[[User, "Προφίλ"], [Wallet, "My wallet"], [Inbox, "Η θυρίδα μου"], [Settings, "Ρυθμίσεις"]].map(([I, l]) => { const Ic = I as typeof User; return <Button variant="ghost" key={l as string} onClick={() => { setDrawer(false); demo(l as string); }} className="flex h-auto w-full justify-start rounded-none px-0 items-center gap-4 border-b border-border py-4 text-lg"><Ic className="h-5 w-5 text-primary" />{l as string}</Button>; })}
          </nav>
        </div>
      )}

      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end bg-background/60" onClick={() => setSheet(null)}>
          <div onClick={(e) => e.stopPropagation()} className="mx-auto min-h-[40dvh] w-full max-w-[400px] rounded-t-3xl bg-popover p-6 pb-[calc(env(safe-area-inset-bottom)+24px)]">
            <div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-medium">{sheet.title}</h3><Button variant="ghost" aria-label="Κλείσιμο" onClick={() => setSheet(null)}><X /></Button></div>
            {sheet.body}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ first }: { first: ReactNode }) {
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
      <div className="flex h-[112px] w-[158px] shrink-0 flex-col justify-between rounded-xl border border-border bg-card p-2.5">{first}</div>
      {[0, 1].map((i) => <div key={i} className="h-[112px] w-[158px] shrink-0 rounded-xl border border-border bg-card" />)}
    </div>
  );
}
