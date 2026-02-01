import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

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
