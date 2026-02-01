import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { StateDisplay } from "./StateDisplay";

afterEach(cleanup);

// ============================================================================
// Component Tests: StateDisplay
// Tests loading and empty state messages
// ============================================================================
describe("StateDisplay", () => {
  // Test: Shows loading message while fetching data
  it("shows loading state", () => {
    render(<StateDisplay isLoading isEmpty={false} />);
    expect(screen.getByText("Loading shopping list...")).toBeInTheDocument();
  });

  // Test: Shows empty message when no items exist
  it("shows empty state", () => {
    render(<StateDisplay isLoading={false} isEmpty />);
    expect(screen.getByText("Your shopping list is empty")).toBeInTheDocument();
  });

  // Test: Returns null when not loading and not empty
  it("renders nothing when list has items", () => {
    const { container } = render(<StateDisplay isLoading={false} isEmpty={false} />);
    expect(container.firstChild).toBeNull();
  });

  // Test: Loading takes precedence over empty state
  it("shows loading state when both loading and empty", () => {
    render(<StateDisplay isLoading isEmpty />);
    expect(screen.getByText("Loading shopping list...")).toBeInTheDocument();
    expect(screen.queryByText("Your shopping list is empty")).not.toBeInTheDocument();
  });
});
