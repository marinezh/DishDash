import styled from "styled-components";
import { ShoppingListItemComponent } from "./ShoppingListItem";
import type { Ingredient } from "../../api";

const ShoppingListTable = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px;
  background: var(--color-bg);
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

interface ShoppingListTableProps {
  items: Ingredient[];
  removingItem: string | null;
  onRemoveItem: (name: string) => void;
  onQuantityIncrease: (index: number) => void;
  onQuantityDecrease: (index: number) => void;
}

export function ShoppingListTableComponent({
  items,
  removingItem,
  onRemoveItem,
  onQuantityIncrease,
  onQuantityDecrease,
}: ShoppingListTableProps) {
  return (
    <ShoppingListTable>
      <ListHeader>
        <span>Item</span>
        <span>Quantity</span>
        <span>Unit</span>
        <span>Action</span>
      </ListHeader>
      {items.map((item, index) => (
        <ShoppingListItemComponent
          key={index}
          item={item}
          index={index}
          isRemoving={removingItem === item.name}
          onRemove={onRemoveItem}
          onQuantityIncrease={onQuantityIncrease}
          onQuantityDecrease={() => onQuantityDecrease(index)}
        />
      ))}
    </ShoppingListTable>
  );
}
