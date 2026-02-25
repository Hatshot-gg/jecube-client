import "@/shared/styles/globals.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
