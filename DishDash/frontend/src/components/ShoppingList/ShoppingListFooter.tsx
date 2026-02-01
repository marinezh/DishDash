import styled from "styled-components";

const FooterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e5e5;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SendEmailButton = styled.button`
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

const WoltButton = styled.button`
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

const FoodoraButton = styled.button<{ $x: number; $y: number }>`
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

interface ShoppingListFooterProps {
  isSendingEmail: boolean;
  isSendingWolt: boolean;
  foodoraPosition: { x: number; y: number };
  onEmailClick: () => void;
  onWoltClick: () => void;
  foodoraRef: React.RefObject<HTMLButtonElement | null>;
}

export function ShoppingListFooter({
  isSendingEmail,
  isSendingWolt,
  foodoraPosition,
  onEmailClick,
  onWoltClick,
  foodoraRef,
}: ShoppingListFooterProps) {
  return (
    <>
      <FooterSection>
        <SendEmailButton onClick={onEmailClick} disabled={isSendingEmail}>
          📧 Send to Email
        </SendEmailButton>
        <WoltButton onClick={onWoltClick} disabled={isSendingWolt}>
          {isSendingWolt ? "Creating Order..." : "🛒 Create Wolt Order"}
        </WoltButton>
      </FooterSection>

      {/* Foodora button - fixed positioning so it can escape */}
      <FoodoraButton
        ref={foodoraRef}
        $x={foodoraPosition.x}
        $y={foodoraPosition.y}
      >
        🛒 Create Foodora Order
      </FoodoraButton>
    </>
  );
}
