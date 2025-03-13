import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./components/App.jsx";
import { GlobalContextProvider } from "./context/GlobalContextProvider.jsx";
import { SearchProvider } from "./context/SearchContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </GlobalContextProvider>
  </StrictMode>
);
