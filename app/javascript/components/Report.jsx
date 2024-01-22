import React from 'react';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import {Stack} from "react-bootstrap";

const Report = () => {
  return (
  <section>
    <h1>Report Page</h1>
    <br />
    <p> Welcome to Report page.</p>
    <div className="flexGrow">
      <Link to="/">Home</Link>
    </div>
  </section>
  )
}

export default Report
