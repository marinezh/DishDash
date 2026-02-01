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
  background: var(--color-white);
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: var(--shadow-sm);
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  color: var(--color-text);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function SuccessModal({ isOpen, message, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>✅ Success!</ModalTitle>
        <p style={{ fontSize: "1.1rem", margin: "16px 0 24px", color: "#333" }}>
          {message}
        </p>
        <ButtonRow>
          <SubmitButton type="button" onClick={onClose}>
            OK
          </SubmitButton>
        </ButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
}
