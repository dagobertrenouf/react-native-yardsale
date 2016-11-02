import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const { allTodoes, loading, loadNextPage } = this.props;
    if (loading) {
      return (<ActivityIndicator />);
    }
    return (
      <View>
        { allTodoes.length && allTodoes.map((todo) => {
          return <Text key={todo.id}>{todo.name}</Text>
        })}
        <TouchableHighlight onPress={loadNextPage}>
          <Text>Load more</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const TodoesQuery = gql`
  query Todoes($after: String) {
    allTodoes(first: 3, after: $after) {
      id,
      name
    }
  }
`;

const AppWithData = graphql(TodoesQuery, {
  props({ data: { loading, allTodoes = [], fetchMore } }) {
    return {
      loading,
      allTodoes,
      loadNextPage() {
        return fetchMore({
          variables: {
            after: allTodoes[allTodoes.length-1].id
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prev; }
            return Object.assign({}, prev, {
              allTodoes: [...prev.allTodoes, ...fetchMoreResult.data.allTodoes],
            });
          },
        })
      }
    }
  }
})(App);

export default AppWithData;