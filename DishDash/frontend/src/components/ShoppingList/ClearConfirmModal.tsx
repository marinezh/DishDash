import styled from "styled-components";

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  color: #1a1a1a;
`;

const ModalText = styled.p`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: #dc2626;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
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

interface ClearConfirmModalProps {
  isOpen: boolean;
  isClearing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ClearConfirmModal({
  isOpen,
  isClearing,
  onConfirm,
  onCancel,
}: ClearConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Clear shopping list?</ModalTitle>
        <ModalText>Are you sure you want to delete the list?</ModalText>
        <ButtonRow>
          <ConfirmButton onClick={onConfirm} disabled={isClearing}>
            {isClearing ? "Clearing..." : "Yes, clear"}
          </ConfirmButton>
          <CancelButton onClick={onCancel} disabled={isClearing}>
            Cancel
          </CancelButton>
        </ButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
}
