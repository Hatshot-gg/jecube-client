import { Route, Routes } from "react-router-dom";
import { CatalogPage } from "@/pages/catalog";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
    </Routes>
  );
}
