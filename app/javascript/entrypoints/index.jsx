import React from 'react';
import { createRoot } from "react-dom/client";

import App from '../components/App';
import {AuthProvider} from "../context/AuthProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
        {/*<App />*/}
      </Routes>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
);
