import React from 'react';
import { Link } from "react-router-dom"

const Summary = () => {
  return (
  <section>
    <h1>Summary Page</h1>
    <br />
    <p> Welcome to summary page.</p>
    <div className="flexGrow">
      <Link to="/">Home</Link>
    </div>
  </section>
  )
}

export default Summary
