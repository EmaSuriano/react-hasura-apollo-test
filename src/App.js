import React, { Component } from 'react';
import logo from './logo.svg';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import './App.css';

const client = new ApolloClient({
  uri: 'https://hasura-hacktoberfest-app.herokuapp.com/v1alpha1/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Query
              query={gql`
                {
                  items {
                    id
                    name
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.items.map(({ id, name }) => (
                  <div key={id}>
                    <p>{name}</p>
                  </div>
                ));
              }}
            </Query>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
