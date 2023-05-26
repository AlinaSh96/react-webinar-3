import { createRoot } from "react-dom/client";
import App from "./app";
import Store from "./store";
import { StoreContext } from "./store/context";
import { BrowserRouter } from "react-router-dom";
import { TranslationProvider } from "./locales/context";

const store = new Store();

const root = createRoot(document.getElementById("root"));
// Первый рендер приложения
root.render(
  <TranslationProvider>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </TranslationProvider>
);
