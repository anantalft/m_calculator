import React from 'react';
import { Link } from "react-router-dom"

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
