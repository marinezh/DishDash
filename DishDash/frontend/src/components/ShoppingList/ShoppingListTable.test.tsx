import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ShoppingListTableComponent } from "./ShoppingListTable";
import type { Ingredient } from "../../api";

afterEach(cleanup);

const createIngredient = (overrides: Partial<Ingredient> = {}): Ingredient => ({
  name: "Milk",
  quantity: 2,
  unit: "pcs",
  ...overrides,
});

// ============================================================================
// Component Tests: ShoppingListTableComponent
// Tests the table wrapper that displays headers and list items
// ============================================================================
describe("ShoppingListTableComponent", () => {
  // Test: Table renders column headers and item rows
  it("renders headers and items", () => {
    const items = [createIngredient({ name: "Apple" })];

    render(
      <ShoppingListTableComponent
        items={items}
        removingItem={null}
        onRemoveItem={vi.fn()}
        onQuantityIncrease={vi.fn()}
        onQuantityDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Unit")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  // Test: Table renders multiple items correctly
  it("renders multiple items", () => {
    const items = [
      createIngredient({ name: "Bread" }),
      createIngredient({ name: "Butter", quantity: 1, unit: "kg" }),
      createIngredient({ name: "Eggs", quantity: 12, unit: "pcs" }),
    ];

    render(
      <ShoppingListTableComponent
        items={items}
        removingItem={null}
        onRemoveItem={vi.fn()}
        onQuantityIncrease={vi.fn()}
        onQuantityDecrease={vi.fn()}
      />
    );

    expect(screen.getByText("Bread")).toBeInTheDocument();
    expect(screen.getByText("Butter")).toBeInTheDocument();
    expect(screen.getByText("Eggs")).toBeInTheDocument();
  });
});
