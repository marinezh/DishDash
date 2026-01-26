import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { Ingredients } from "../pages/Ingredients";
import { Recipes } from "../pages/Recipes";
import { ShoppingList } from "../pages/ShoppingList";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/ingredients" replace />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={<Navigate to="/ingredients" replace />} />
      </Route>
    </Routes>
  );
}
