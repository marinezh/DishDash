import styled from "styled-components";

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 16px;
  color: #999;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 32px;
  color: #666;
`;

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
