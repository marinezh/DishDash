import { FooterSection, SendEmailButton, WoltButton, FoodoraButton } from "./styles";

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
