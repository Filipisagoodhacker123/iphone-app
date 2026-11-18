import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DocumentCodeCopy } from "@/components/document-code-copy";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function clipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
}

describe("Document code copying", () => {
  it("copies the fictional 3CBB7808-04B0-49EF-B619-B3E42012EA9E code before announcing success", async () => {
    let resolveCopy: (() => void) | undefined;
    const write = vi.fn(() => new Promise<void>(resolve => { resolveCopy = resolve; }));
    clipboard(write);
    render(<DocumentCodeCopy />);
    fireEvent.click(screen.getByRole("button", { name: "Αντιγραφή κωδικού εγγράφου" }));
    expect(write).toHaveBeenCalledWith("3CBB7808-04B0-49EF-B619-B3E42012EA9E");
    expect(screen.queryByRole("status")).toBeNull();
    await act(async () => { resolveCopy?.(); });
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("never announces success when clipboard copying fails", async () => {
    const write = vi.fn().mockRejectedValue(new Error("Permission denied"));
    clipboard(write);
    render(<DocumentCodeCopy />);
    fireEvent.click(screen.getByRole("button", { name: "Αντιγραφή κωδικού εγγράφου" }));
    await waitFor(() => expect(write).toHaveBeenCalledOnce());
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("dismisses the notification immediately when closed", async () => {
    clipboard(vi.fn().mockResolvedValue(undefined));
    render(<DocumentCodeCopy />);
    fireEvent.click(screen.getByRole("button", { name: "Αντιγραφή κωδικού εγγράφου" }));
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("button", { name: "Κλείσιμο ειδοποίησης" }));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("automatically dismisses success after four seconds", async () => {
    vi.useFakeTimers();
    clipboard(vi.fn().mockResolvedValue(undefined));
    render(<DocumentCodeCopy />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Αντιγραφή κωδικού εγγράφου" })); });
    act(() => { vi.advanceTimersByTime(3999); });
    expect(screen.getByRole("status")).toBeTruthy();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.queryByRole("status")).toBeNull();
  });
});