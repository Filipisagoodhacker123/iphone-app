import { Button } from "@/components/ui/button";
import { BackChevron, FaceScanIcon, FingerprintIcon } from "@/components/identity-icons";

type Props = { onClose: () => void };

/** Full-screen, demo-only security check. No biometrics are read; both controls just close it. */
export function SecurityCheck({ onClose }: Props) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="security-check-title" className="security-bg app-scroll fixed inset-0 z-50 font-condensed text-doc-paper">
      <div className="relative mx-auto flex min-h-full max-w-[400px] flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+28px)] pt-[env(safe-area-inset-top)]">
        <Button
          variant="ghost"
          aria-label="Πίσω"
          autoFocus
          onClick={onClose}
          className="absolute left-2 top-[calc(env(safe-area-inset-top)+8px)] grid h-10 w-10 place-items-center p-0 text-doc-paper hover:bg-transparent hover:text-doc-paper"
        >
          <BackChevron className="h-[20px]! w-[12px]!" />
        </Button>

        <div className="relative mx-auto mt-[58px] grid h-[66px] w-[106px] place-items-center">
          <span aria-hidden className="scan-corners absolute inset-0 border border-security-accent/70" />
          <p className="font-sans text-[19px] font-bold leading-[0.95] tracking-normal">
            gov.<span className="text-security-accent">gr</span>
            <br />
            <span className="inline-block w-full text-center text-doc-paper">wallet</span>
          </p>
        </div>

        <h2 id="security-check-title" className="mt-10 text-center font-sans text-[18px] font-bold tracking-normal">
          Έλεγχος Ασφαλείας
        </h2>
        <p className="mx-auto mt-[52px] max-w-[350px] text-center font-sans text-[16.5px] font-normal leading-[1.3]">
          Για να συνεχίσετε να χρησιμοποιείτε την εφαρμογή, παρακαλούμε επιβεβαιώστε την ταυτότητά σας.
        </p>

        <div className="relative mx-auto mt-auto h-[172px] w-[200px] shrink-0 pt-8 text-security-accent">
          <FingerprintIcon className="absolute left-0 top-0 h-[88px] w-[88px]" />
          <FaceScanIcon className="absolute bottom-0 right-6 h-[88px] w-[88px]" />
        </div>

        <Button
          onClick={onClose}
          className="mt-auto h-[50px] w-full shrink-0 rounded-[6px] bg-security-accent font-sans text-[17px] font-bold tracking-normal text-doc-paper shadow-none hover:bg-security-accent/90"
        >
          Επιβεβαίωση
        </Button>
      </div>
    </div>
  );
}
