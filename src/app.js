import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const { allTodoes, loading } = this.props.data;
    if (loading) {
      return (<ActivityIndicator />);
    }
    return (
      <View>
        { allTodoes.length && allTodoes.map((todo) => {
          return <Text key={todo.id}>{todo.updatedAt}</Text>
        })}
      </View>
    );
  }
}

const MyQuery = gql`query MyQuery {
  allTodoes {
    id,
    updatedAt
  }
}`;

export default graphql(MyQuery)(App);