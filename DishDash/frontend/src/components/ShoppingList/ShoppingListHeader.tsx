import { Header, ButtonGroup, AddButton, ClearButton } from "./styles";

interface ShoppingListHeaderProps {
  itemsCount: number;
  onAddClick: () => void;
  onClearClick: () => void;
  isClearing: boolean;
}

export function ShoppingListHeader({
  itemsCount,
  onAddClick,
  onClearClick,
  isClearing,
}: ShoppingListHeaderProps) {
  return (
    <Header>
      <h1>Shopping List</h1>
      <ButtonGroup>
        <AddButton onClick={onAddClick}>+ Add</AddButton>
        {itemsCount > 0 && (
          <ClearButton onClick={onClearClick} disabled={isClearing}>
            {isClearing ? "Clearing..." : "Clear All"}
          </ClearButton>
        )}
      </ButtonGroup>
    </Header>
  );
}
