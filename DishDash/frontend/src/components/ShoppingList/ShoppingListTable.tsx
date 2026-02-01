import { ShoppingListTable, ListHeader } from "./styles";
import { ShoppingListItemComponent } from "./ShoppingListItem";
import type { Ingredient } from "../../api";

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
