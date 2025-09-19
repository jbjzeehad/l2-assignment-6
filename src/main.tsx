import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { router } from "./routes/index.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster richColors={true} position="top-center" />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
);
