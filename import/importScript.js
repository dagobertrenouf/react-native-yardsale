import Reindex from 'reindex-js';
import config from '../config';

const reindex = new Reindex(config.REINDEX_URL);
reindex.setToken(config.REINDEX_TOKEN);

const todos = [
  { text: 'Build an app', complete: true },
  { text: '???', complete: false },
  { text: 'Profit', complete: true }
];

const mutation = `
mutation ImportTodo($todo: _CreateTodoInput!) {
  createTodo(input: $todo) {
    id
  }
}
`;

async function importTodos() {
  for (const todo of todos) {
    const result = await reindex.query(mutation, { todo });
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Created a todo with id:', result.data.createTodo.id);
    }
  }
}

importTodos().catch((e) => console.error(e));