import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { AddItemModal } from "./AddItemModal";

afterEach(cleanup);

// ============================================================================
// Component Tests: AddItemModal
// Tests modal for adding new items to shopping list
// ============================================================================
describe("AddItemModal", () => {
  // Test: Modal renders form, handles input changes, and triggers submit/cancel
  it("renders when open and handles submit/cancel", () => {
    const onFormChange = vi.fn();
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    const onClose = vi.fn();

    render(
      <AddItemModal
        isOpen
        isAdding={false}
        formData={{ name: "Eggs", quantity: "2", unit: "pcs" }}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
        onClose={onClose}
        inputRef={{ current: null }}
      />
    );

    fireEvent.change(screen.getByLabelText("Item Name *"), {
      target: { value: "Milk" },
    });
    fireEvent.click(screen.getByText("Add Item"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(onFormChange).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Test: Modal does not render when isOpen is false
  it("does not render when closed", () => {
    render(
      <AddItemModal
        isOpen={false}
        isAdding={false}
        formData={{ name: "", quantity: "", unit: "pcs" }}
        onFormChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    expect(screen.queryByText("Add Item to Shopping List")).not.toBeInTheDocument();
  });

  // Test: Submit button is disabled while adding
  it("disables submit button while adding", () => {
    render(
      <AddItemModal
        isOpen
        isAdding={true}
        formData={{ name: "Test", quantity: "1", unit: "pcs" }}
        onFormChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    const button = screen.getByText("Adding...") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  // Test: Clicking overlay triggers onClose
  it("closes when clicking overlay", () => {
    const onClose = vi.fn();

    render(
      <AddItemModal
        isOpen
        isAdding={false}
        formData={{ name: "", quantity: "", unit: "pcs" }}
        onFormChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={onClose}
        inputRef={{ current: null }}
      />
    );

    // Click the overlay (first parent div)
    const overlay = screen.getByText("Add Item to Shopping List").parentElement?.parentElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  // Test: All form fields are present and functional
  it("renders all form fields with correct values", () => {
    render(
      <AddItemModal
        isOpen
        isAdding={false}
        formData={{ name: "Bread", quantity: "2", unit: "loaves" }}
        onFormChange={vi.fn()}
        onSubmit={vi.fn()}
        onClose={vi.fn()}
        inputRef={{ current: null }}
      />
    );

    expect(screen.getByDisplayValue("Bread")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("loaves")).toBeInTheDocument();
  });
});
