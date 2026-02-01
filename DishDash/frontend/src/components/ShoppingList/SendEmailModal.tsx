import { ModalOverlay, EmailModalContent, ModalTitle, FormGroup, Label, EmailInput, ButtonRow, SubmitButton, CancelButton } from "./styles";

interface SendEmailModalProps {
  isOpen: boolean;
  isSending: boolean;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function SendEmailModal({
  isOpen,
  isSending,
  email,
  onEmailChange,
  onSubmit,
  onClose,
  inputRef,
}: SendEmailModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <EmailModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Send Shopping List to Email</ModalTitle>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <EmailInput
              ref={inputRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </FormGroup>

          <ButtonRow>
            <SubmitButton type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Email"}
            </SubmitButton>
            <CancelButton type="button" onClick={onClose} disabled={isSending}>
              Cancel
            </CancelButton>
          </ButtonRow>
        </form>
      </EmailModalContent>
    </ModalOverlay>
  );
}
