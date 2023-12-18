import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  return (
  <section>
    <h1>Home</h1>
    <Link to="/summary">Go to the Summary page</Link>
    <br />
    <Link to="/report">Go to the Report page</Link>
  </section>
  )
}

export default Home
