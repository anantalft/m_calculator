import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Table from "./Table";
import "../../assets/stylesheets/index.css";

// Custom component to render Genres
const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
      <>
        {values.map((genre, idx) => {
          return (
              <span key={idx} className="badge">
            {genre}
          </span>
          );
        })}
      </>
  );
};

const Summary = () => {
  const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: "TV Show",
          // First group columns
          columns: [
            {
              Header: "Name",
              accessor: "show.name",
            },
            {
              Header: "Type",
              accessor: "show.type",
            },
          ],
        },
        {
          // Second group - Details
          Header: "Details",
          // Second group columns
          columns: [
            {
              Header: "Language",
              accessor: "show.language",
            },
            {
              Header: "Genre(s)",
              accessor: "show.genres",
              // Cell method will provide the cell value; we pass it to render a custom component
              Cell: ({ cell: { value } }) => <Genres values={value} />
            },
            {
              Header: "Runtime",
              accessor: "show.runtime",
            },
            {
              Header: "Status",
              accessor: "show.status",
            },
          ],
        },
      ],
      []
  );
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);

  return (
  <section>
    <h1>Summary Page</h1>
    <br />
    <p> Welcome to summary page.</p>
    <div className="flexGrow">
      <Link to="/">Home</Link>
    </div>
    <Table columns={columns} data={data} />
  </section>
  )
}

export default Summary
