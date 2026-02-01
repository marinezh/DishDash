import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { status } from "../api";

const SidebarContainer = styled.aside`
  padding: 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.panel};
  display: flex;
  flex-direction: column;
`;

const Brand = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandText = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.title};
`;

const BrandIcon = styled.img`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const Nav = styled.nav`
  display: grid;
  gap: 8px;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  gap: 10px;

  &.active {
	color: ${({ theme }) => theme.colors.text};
	background: rgba(57, 228, 19, 0.18);
	border: 1px solid rgba(59, 130, 246, 0.35);
  }

  &:hover {
	background: rgba(255, 255, 255, 0.04);
  }
`;

const NavIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  
  ${NavItem}.active & {
	opacity: 1;
  }
`;

const Text = styled.p`
  font-size: 14px;

  ${NavItem}.active & {
	opacity: 1;
  }
`;

const StatusIndicator = styled.div<{ ok: boolean }>`
  font-size: 14px;
  color: ${({ ok }) => (ok ? "#16a34a" : "#dc2626")};
  padding-top: 16px;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;

  &::before {
	content: "";
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: ${({ ok }) => (ok ? "#16a34a" : "#dc2626")};
  }
`;

export function Sidebar() {
  const [statusState, setStatusState] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
	let cancelled = false;

	const fetchStatus = async () => {
	  try {
		const data = await status();
		if (!cancelled) {
		  setStatusState({ text: data.status ?? "ok", ok: true });
		}
	  } catch {
		if (!cancelled) {
		  setStatusState({ text: "offline", ok: false });
		}
	  }
	};

	fetchStatus();
	return () => {
	  cancelled = true;
	};
  }, []);

  return (
	<SidebarContainer>
	  <Brand>
		<BrandIcon src="/dishdash.svg" alt="DishDash" />
		<BrandText>DishDash</BrandText>
	  </Brand>
	  <Nav>
		<NavItem to="/ingredients">
			<NavIcon src="/icons/ingredients.svg" alt="ing" /> 
			<Text>Ingredients</Text>
		</NavItem>
		<NavItem to="/recipes">
			 <NavIcon src="/icons/hat.svg" alt="hat" />
			 <Text>Recipes</Text>
		</NavItem>
		<NavItem to="/favorites">
			<NavIcon src="/icons/like.svg" alt="like" />
			<Text>Favorites</Text>
		</NavItem>
		<NavItem to="/shopping-list">
			<NavIcon src="/icons/cart.svg" alt="cart" />
			<Text>Shopping List</Text>
		</NavItem>
	  </Nav>
	  <StatusIndicator ok={statusState?.ok ?? false}>
		Backend: {statusState ? statusState.text : "checking..."}
	  </StatusIndicator>
	</SidebarContainer>
  );
}
