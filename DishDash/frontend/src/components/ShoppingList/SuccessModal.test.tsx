import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { SuccessModal } from "./SuccessModal";

afterEach(cleanup);

// ============================================================================
// Component Tests: SuccessModal
// Tests success notification modal
// ============================================================================
describe("SuccessModal", () => {
  // Test: Success modal displays message and closes on OK button click
  it("renders message and closes", () => {
    const onClose = vi.fn();

    render(<SuccessModal isOpen message="Done" onClose={onClose} />);

    expect(screen.getByText("✅ Success!")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    fireEvent.click(screen.getByText("OK"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Test: Modal does not render when closed
  it("does not render when closed", () => {
    render(<SuccessModal isOpen={false} message="Test" onClose={vi.fn()} />);

    expect(screen.queryByText("✅ Success!")).not.toBeInTheDocument();
  });

  // Test: Displays custom success messages
  it("displays custom message text", () => {
    render(
      <SuccessModal
        isOpen
        message="Shopping list sent to email@test.com! 📧"
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Shopping list sent to email@test.com! 📧")).toBeInTheDocument();
  });

  // Test: Clicking overlay closes modal
  it("closes when clicking overlay", () => {
    const onClose = vi.fn();

    render(<SuccessModal isOpen message="Success!" onClose={onClose} />);

    const overlay = screen.getByText("✅ Success!").parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });
});
