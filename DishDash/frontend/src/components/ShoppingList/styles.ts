import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    margin: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const AddButton = styled.button`
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

export const ClearButton = styled.button`
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

export const ShoppingListTable = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px;
  background: #f5f5f5;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

export const ItemName = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`;

export const ItemQuantity = styled.span`
  color: #666;
  font-size: 0.95rem;
`;

export const RemoveButton = styled.button`
  padding: 6px 12px;
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #fecaca;
    border-color: #f87171;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 16px;
  color: #999;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 32px;
  color: #666;
`;

export const ErrorState = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  color: #1a1a1a;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1a1a1a;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: #e5e5e5;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

export const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #e8f5e9;
    border-color: #4caf50;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
`;

export const FooterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e5e5;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SendEmailButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const WoltButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background-color: #5dc2e7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: #4f46e5;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const FoodoraButton = styled.button<{ $x: number; $y: number }>`
  padding: 12px 20px;
  background-color: #de1167;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: left 0.15s ease, top 0.15s ease;

  position: fixed;
  left: ${(p) => `${p.$x}px`};
  top: ${(p) => `${p.$y}px`};
  z-index: 1000;

  &:hover {
    background-color: #b21057;
  }
`;

export const EmailModalContent = styled(ModalContent)``;

export const EmailInput = styled(Input)``;
