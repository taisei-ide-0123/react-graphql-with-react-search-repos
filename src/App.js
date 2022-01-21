import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const PER_PAGE = 5;

const DEFAULT_VARIABLES = {
  first: PER_PAGE,
  after: null,
  last: null,
  before: null,
  query: "graphql",
};

const App = () => {
  const [query, setQuery] = useState(DEFAULT_VARIABLES.query);
  const [currnentVariables, setCurrentVariables] = useState(DEFAULT_VARIABLES);
  console.log({ currnentVariables });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const goNext = (search) => {
    setCurrentVariables({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null,
      query: query,
    });
  };

  console.log("query", query);
  return (
    <ApolloProvider client={client}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
      </form>

      <Query
        query={SEARCH_REPOSITORIES}
        variables={{ ...DEFAULT_VARIABLES, query }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log(data.search);
          const search = data.search;
          const repositoryCount = search.repositoryCount;
          const repositoryUnit =
            repositoryCount === 1 ? "Repository" : "Repositories";
          const title = `Github Repositories Search Results - ${repositoryCount} ${repositoryUnit}`;

          return (
            <>
              <h2>{title}</h2>
              <ul>
                {search.edges.map((edge) => {
                  const node = edge.node;

                  return (
                    <li key={node.id}>
                      <a
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {node.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
              {search.pageInfo.hasNextPage ? (
                <button onClick={() => goNext(search)}>Next</button>
              ) : null}
            </>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
