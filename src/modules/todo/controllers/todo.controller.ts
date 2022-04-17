import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { CreateDto, UpdateDto } from './dto';

@ApiTags('todo')
@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all todo',
    type: [Todo]
  })
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get one todo by id',
    type: Todo
  })
  @ApiResponse({
    status: 404,
    description: 'not found id'
  })
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id = ${id} not exists`);
    }

    return todo;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'post todo',
    type: Todo
  })
  @ApiResponse({
    status: 404,
    description: 'not found id'
  })
  @ApiBody({ type: CreateDto })
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted) {
      todo.isCompleted = createDto.isCompleted;
    }

    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiBody({ type: UpdateDto })
  @ApiResponse({
    status: 200,
    description: 'update todo',
    type: Todo
  })
  @ApiResponse({
    status: 404,
    description: 'not found id'
  })
  async updateAction(
    @Param('id') id: string, 
    @Body() {title, isCompleted}: UpdateDto
  ): Promise<Todo> {
    const todo = 	await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id = ${id} not exists`);
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'delete todo'
  })
  @ApiResponse({
    status: 404,
    description: 'not found id'
  })
  async deleteAction(@Param('id') id: string): Promise<{ message: string }> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id = ${id} not exists`);
    }

    await this.todoService.remove(id);
    return { message: 'Успешно удалено'};
  }
}
