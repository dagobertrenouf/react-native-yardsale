import React, { Component } from 'react';
import { 
  ScrollView,
  Text,
  View
} from 'react-native';
import Relay, {
  Route
} from 'react-relay';

class TodoList extends Component {
  render() {
    const allTodos = this.props.viewer.allTodos.edges;
    return (
      <ScrollView>
        {allTodos.map((todo) => {
          return (
            <View key={todo.node.id}>
              <Text>Hello there : {todo.node.text}</Text>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

export default Relay.createContainer(TodoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allTodos(first: 1000) {
          edges {
            node {
              id,
              text,
              complete
            }
          }
        }
      }
    `
  }
});

export class TodoListRoute extends Route {
  static routeName = 'TodoListRoute';
  static queries =  {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
};