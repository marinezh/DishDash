import { ListItem, ItemName, ItemQuantity, QuantityControl, QuantityButton, QuantityDisplay, RemoveButton } from "./styles";
import type { Ingredient } from "../../api";

interface ShoppingListItemProps {
  item: Ingredient;
  index: number;
  isRemoving: boolean;
  onRemove: (name: string) => void;
  onQuantityIncrease: (index: number) => void;
  onQuantityDecrease: (index: number) => void;
}

export function ShoppingListItemComponent({
  item,
  index,
  isRemoving,
  onRemove,
  onQuantityIncrease,
  onQuantityDecrease,
}: ShoppingListItemProps) {
  return (
    <ListItem>
      <ItemName>{item.name}</ItemName>
      <QuantityControl>
        <QuantityButton onClick={() => onQuantityDecrease(index)}>−</QuantityButton>
        <QuantityDisplay>{item.quantity}</QuantityDisplay>
        <QuantityButton onClick={() => onQuantityIncrease(index)}>+</QuantityButton>
      </QuantityControl>
      <ItemQuantity>{item.unit}</ItemQuantity>
      <RemoveButton onClick={() => onRemove(item.name)} disabled={isRemoving}>
        {isRemoving ? "Removing..." : "Remove"}
      </RemoveButton>
    </ListItem>
  );
}
