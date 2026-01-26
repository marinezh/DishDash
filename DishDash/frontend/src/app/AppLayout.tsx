import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const Shell = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
`;

const Sidebar = styled.aside`
  padding: 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.panel};
`;

const Brand = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Nav = styled.nav`
  display: grid;
  gap: 8px;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.muted};

  &.active {
    color: ${({ theme }) => theme.colors.text};
    background: rgba(59, 130, 246, 0.18);
    border: 1px solid rgba(59, 130, 246, 0.35);
  }

  &:hover {
    background: rgba(255,255,255,0.04);
  }
`;

const Main = styled.main`
  padding: 20px 24px;
`;

export function AppLayout() {
  return (
    <Shell>
      <Sidebar>
        <Brand>DishDash</Brand>
        <Nav>
          <Item to="/ingredients">Ingredients</Item>
          <Item to="/recipes">Recipes</Item>
          <Item to="/shopping-list">Shopping List</Item>
        </Nav>
      </Sidebar>

      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
