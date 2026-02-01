import { ModalOverlay, ModalContent, ModalTitle, FormGroup, Label, Input, FormRow, ButtonRow, SubmitButton, CancelButton } from "./styles";

interface AddItemModalProps {
  isOpen: boolean;
  isAdding: boolean;
  formData: { name: string; quantity: string; unit: string };
  onFormChange: (data: { name: string; quantity: string; unit: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function AddItemModal({
  isOpen,
  isAdding,
  formData,
  onFormChange,
  onSubmit,
  onClose,
  inputRef,
}: AddItemModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Add Item to Shopping List</ModalTitle>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="name">Item Name *</Label>
            <Input
              ref={inputRef}
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              placeholder="e.g., Tomato, Milk, Butter"
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="text"
                placeholder="e.g., 0.5, 2, 100"
                value={formData.quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || !isNaN(Number(val))) {
                    onFormChange({ ...formData, quantity: val });
                  }
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                type="text"
                value={formData.unit}
                onChange={(e) => onFormChange({ ...formData, unit: e.target.value })}
                placeholder="e.g., pcs, kg, L"
              />
            </FormGroup>
          </FormRow>

          <ButtonRow>
            <SubmitButton type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Item"}
            </SubmitButton>
            <CancelButton type="button" onClick={onClose} disabled={isAdding}>
              Cancel
            </CancelButton>
          </ButtonRow>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
