import github from "./db";
import {useEffect, useState, useCallback } from "react";
import query from "./Query";

function App() {
  let [userName, setUsername] = useState("");

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query),
    })
    .then((response) => response.json())
    .then((data) => {
      setUsername(data.data.viewer.name);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="b1 bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
    </div>
  );
}

export default App;
