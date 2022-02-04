import github from "./db";
import {useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

function App() {
  let [userName, setUsername] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState("10");
  let [queryString, setQueryString] = useState("Django");
  let [totalCount, setTotalCount] = useState(null);

 

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString)) 

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })

    .then((response) => response.json())
    .then((data) => {
      const viewer = data.data.viewer;
      const repos = data.data.search.nodes;
      const total = data.data.search.repositoryCount;
      setUsername(viewer.name);
      setRepoList(repos);
      setTotalCount(total);
    })
    .catch(err => {
      console.log(err);
    });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="b1 bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={(myNumber) => {
          setPageCount(myNumber);
        }}
        onQueryChange={(myString) => {
          setQueryString(myString)
          }} 
        />
      { repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
              <RepoInfo key={repo.id} repo={repo} />
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
