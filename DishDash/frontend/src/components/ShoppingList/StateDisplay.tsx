import { EmptyState, LoadingState } from "./styles";

interface StateDisplayProps {
  isLoading: boolean;
  isEmpty: boolean;
}

export function StateDisplay({ isLoading, isEmpty }: StateDisplayProps) {
  if (isLoading) {
    return <LoadingState>Loading shopping list...</LoadingState>;
  }

  if (isEmpty) {
    return (
      <EmptyState>
        <p>Your shopping list is empty</p>
      </EmptyState>
    );
  }

  return null;
}
