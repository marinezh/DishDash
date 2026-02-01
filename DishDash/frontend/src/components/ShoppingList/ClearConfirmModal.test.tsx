import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { ClearConfirmModal } from "./ClearConfirmModal";

afterEach(cleanup);

// ============================================================================
// Component Tests: ClearConfirmModal
// Tests confirmation modal for clearing entire shopping list
// ============================================================================
describe("ClearConfirmModal", () => {
  // Test: Clear confirmation modal triggers confirm or cancel handlers
  it("renders and confirms/cancels", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ClearConfirmModal
        isOpen
        isClearing={false}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText("Yes, clear"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  // Test: Modal does not render when closed
  it("does not render when closed", () => {
    render(
      <ClearConfirmModal
        isOpen={false}
        isClearing={false}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.queryByText("Clear shopping list?")).not.toBeInTheDocument();
  });

  // Test: Buttons are disabled while clearing
  it("disables buttons while clearing", () => {
    render(
      <ClearConfirmModal
        isOpen
        isClearing={true}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    const confirmButton = screen.getByText("Clearing...") as HTMLButtonElement;
    const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;

    expect(confirmButton.disabled).toBe(true);
    expect(cancelButton.disabled).toBe(true);
  });

  // Test: Modal displays warning message
  it("displays warning message", () => {
    render(
      <ClearConfirmModal
        isOpen
        isClearing={false}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Clear shopping list?")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete the list?")).toBeInTheDocument();
  });

  // Test: Clicking overlay closes modal
  it("closes when clicking overlay", () => {
    const onCancel = vi.fn();

    render(
      <ClearConfirmModal
        isOpen
        isClearing={false}
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );

    const overlay = screen.getByText("Clear shopping list?").parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onCancel).toHaveBeenCalledTimes(1);
    }
  });
});
