import React from 'react';
import Summary from "./Summary";
import Report from "./Report";
import Home from "./Home";
import Layout from "./Layout";
import Unauthorized from "./Unauthorized";
import Missing from "./Missing";
import RequireAuth from "./RequireAuth";
import Login from "./Login";

import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'Quote': 'Quote',
  'Admin': 'Admin'
}

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Layout/>}>
      {/* public routes */}
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="login" element={<Login />} />
      {/*<Route path="login" element={<Login />} />*/}
      <Route path="/" element={<Home />} />
      {/* we want to protect these routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Quote]}/>} >
        <Route path="summary" element={<Summary />} />
        <Route path="report" element={<Report />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
  );
};

export default App;
