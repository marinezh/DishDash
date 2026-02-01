import { Container, ErrorState } from "../components/ShoppingList/styles";
import { ShoppingListHeader } from "../components/ShoppingList/ShoppingListHeader";
import { StateDisplay } from "../components/ShoppingList/StateDisplay";
import { ShoppingListTableComponent } from "../components/ShoppingList/ShoppingListTable";
import { ShoppingListFooter } from "../components/ShoppingList/ShoppingListFooter";
import { AddItemModal } from "../components/ShoppingList/AddItemModal";
import { SendEmailModal } from "../components/ShoppingList/SendEmailModal";
import { SuccessModal } from "../components/ShoppingList/SuccessModal";
import { useShoppingList } from "../hooks/useShoppingList";

export function ShoppingList() {
  const {
    items,
    loading,
    error,
    removingItem,
    clearing,
    showAddModal,
    formData,
    adding,
    showEmailModal,
    email,
    sendingEmail,
    sendingWolt,
    showSuccessModal,
    successMessage,
    foodoraPosition,
    nameInputRef,
    emailInputRef,
    foodoraButtonRef,
    setShowAddModal,
    setFormData,
    setEmail,
    setShowEmailModal,
    setShowSuccessModal,
    handleRemoveItem,
    handleUpdateQuantity,
    handleAddItem,
    handleSendEmail,
    handleWoltOrder,
    handleClearAll,
  } = useShoppingList();

  return (
    <Container>
      <ShoppingListHeader
        itemsCount={items.length}
        onAddClick={() => setShowAddModal(true)}
        onClearClick={handleClearAll}
        isClearing={clearing}
      />

      {error && <ErrorState>{error}</ErrorState>}

      <StateDisplay isLoading={loading} isEmpty={items.length === 0} />

      {items.length > 0 && (
        <>
          <ShoppingListTableComponent
            items={items}
            removingItem={removingItem}
            onRemoveItem={handleRemoveItem}
            onQuantityIncrease={(index) =>
              handleUpdateQuantity(index, items[index].quantity + 1)
            }
            onQuantityDecrease={(index) =>
              handleUpdateQuantity(index, items[index].quantity - 1)
            }
          />
          <ShoppingListFooter
            isSendingEmail={sendingEmail}
            isSendingWolt={sendingWolt}
            foodoraPosition={foodoraPosition}
            onEmailClick={() => setShowEmailModal(true)}
            onWoltClick={handleWoltOrder}
            foodoraRef={foodoraButtonRef}
          />
        </>
      )}

      <AddItemModal
        isOpen={showAddModal}
        isAdding={adding}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleAddItem}
        onClose={() => setShowAddModal(false)}
        inputRef={nameInputRef}
      />

      <SendEmailModal
        isOpen={showEmailModal}
        isSending={sendingEmail}
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSendEmail}
        onClose={() => setShowEmailModal(false)}
        inputRef={emailInputRef}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        message={successMessage}
        onClose={() => setShowSuccessModal(false)}
      />
    </Container>
  );
}
