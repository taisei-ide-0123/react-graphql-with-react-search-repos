import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const DEFAULT_VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "graphql",
};

const App = () => {
  const [query, setQuery] = useState(DEFAULT_VARIABLES.query);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

          return <h2>{title}</h2>;
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
