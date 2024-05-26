import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/Todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Money',
      description: 'Must Search Money',
      done: true,
    },
    {
      id: 2,
      title: 'Choose',
      description: 'Must Choose',
      done: true,
    },
    {
      id: 3,
      title: 'Accept',
      description: 'Must Accept',
      done: true,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  add(todo: Todo) {
    this.todos = [...this.todos, todo];
  }

  find(id: string): Todo {
    return this.todos.find((todo) => todo.id === Number(id));
  }

  update(todo: Todo, id: string) {
    const todoToUpdate = this.todos.find((t) => t.id === Number(id));

    if (!todoToUpdate) {
      return new NotFoundException('boooo did you find this todo');
    }
    // apply to granulary update a single property
    if (todo.hasOwnProperty(' done')) {
      todoToUpdate.done = todo.done;
    }

    if (todo.title) {
      todoToUpdate.title = todo.title;
    }

    if (todo.description) {
      todoToUpdate.description = todo.description;
    }
    const updatedTodos = this.todos.map((t) =>
      t.id !== +id ? t : todoToUpdate,
    );
    this.todos = [...updatedTodos];

    return this.todos;
  }

  delete(id: string) {
    const nb0fTodosBeforeDelete = this.todos.length;
    this.todos = [...this.todos.filter((t) => t.id !== +id)];

    if (this.todos.length < nb0fTodosBeforeDelete) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    } else {
      return { deletedTodos: 0, nbTodos: this.todos.length };
    }
  }
}
