import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "../components/Sidebar";

const Shell = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
`;

const Main = styled.main`
  padding: 20px 24px;
`;

export function AppLayout() {
  return (
    <Shell>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
