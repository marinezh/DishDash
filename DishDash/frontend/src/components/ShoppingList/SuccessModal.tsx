import { ModalOverlay, ModalContent, ModalTitle, ButtonRow, SubmitButton } from "./styles";

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
