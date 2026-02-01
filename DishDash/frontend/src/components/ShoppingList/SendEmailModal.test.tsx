import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { SendEmailModal } from "./SendEmailModal";

afterEach(cleanup);

// ============================================================================
// Component Tests: SendEmailModal
// Tests modal for sending shopping list via email
// ============================================================================
describe("SendEmailModal", () => {
  // Test: Email modal renders, updates email input, and triggers submit/cancel
  it("renders and submits email", () => {
    const onEmailChange = vi.fn();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const onClose = vi.fn();

    render(
      <SendEmailModal
        isOpen
        isSending={false}
        email="test@example.com"
        onEmailChange={onEmailChange}
        onSubmit={onSubmit}
        onClose={onClose}
        inputRef={{ current: null }}
      />
    );

    fireEvent.change(screen.getByLabelText("Email Address *"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByText("Send Email"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(onEmailChange).toHaveBeenCalledWith("user@example.com");
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Test: Modal does not render when closed
  it("does not render when closed", () => {
    render(
      <SendEmailModal
        isOpen={false}
        isSending={false}
        email=""
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    expect(screen.queryByText("Send Shopping List to Email")).not.toBeInTheDocument();
  });

  // Test: Submit button is disabled while sending
  it("disables submit button while sending", () => {
    render(
      <SendEmailModal
        isOpen
        isSending={true}
        email="test@example.com"
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    const button = screen.getByText("Sending...") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  // Test: Email input displays current value
  it("displays email value in input field", () => {
    render(
      <SendEmailModal
        isOpen
        isSending={false}
        email="myemail@test.com"
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    expect(screen.getByDisplayValue("myemail@test.com")).toBeInTheDocument();
  });

  // Test: Clicking overlay closes modal
  it("closes when clicking overlay", () => {
    const onClose = vi.fn();

    render(
      <SendEmailModal
        isOpen
        isSending={false}
        email=""
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={onClose}
        inputRef={{ current: null }}
      />
    );

    const overlay = screen.getByText("Send Shopping List to Email").parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });
});
