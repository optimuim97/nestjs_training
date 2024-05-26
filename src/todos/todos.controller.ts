import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/Todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Post()
  addTodo(@Body() postedData) {
    console.log(postedData);
    this.todosService.add(postedData);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    console.log(id);
    return this.todosService.find(id);
  }

  @Patch(':id')
  update(@Body() postedData, @Param('id') id: string) {
    console.log({
      id: id,
      postedData: postedData,
    });
    return this.todosService.update(postedData, id);
  }

  @Delete(':id')
  delete(id: string) {
    console.log({
      id: id,
    });
    return this.todosService.delete(id);
  }
}
