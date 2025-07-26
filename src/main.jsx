import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import { AuthProvider } from "./Context/AuthContext";
import "aos/dist/aos.css";
import AOS from "aos";
import { Toaster } from "react-hot-toast";

AOS.init({ duration: 800 });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
