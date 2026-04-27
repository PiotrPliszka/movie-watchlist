import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ top: 24, right: 24 }}
        toastOptions={{
          duration: 3200,
          style: {
            maxWidth: "420px",
            minWidth: "250px",
            padding: "14px 16px",
            borderRadius: "18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)), rgba(13, 18, 33, 0.96)",
            color: "#f8fafc",
            boxShadow:
              "0 24px 60px rgba(2, 6, 23, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "1.45",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ecfdf5",
            },
            style: {
              border: "1px solid rgba(16, 185, 129, 0.18)",
            },
          },
          error: {
            iconTheme: {
              primary: "#fb7185",
              secondary: "#fff1f2",
            },
            style: {
              border: "1px solid rgba(251, 113, 133, 0.2)",
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
