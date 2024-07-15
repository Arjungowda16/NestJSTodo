import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiOperation({ description:'To add a new task wrt to the user email.', summary: 'Add a new task.'})
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  UserEmail: string) {
    return await this.todoService.create(createTodoDto, UserEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To get all the user tasks.', summary: 'To get all the user tasks.'})
  @Get()
  async findAll(@UserEmail()
  userEmail: string) {
    return await this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To get a specific user task.', summary : 'To get a specific user task.'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To update a specific user task.', summary : 'To update a specific user task.'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description:'To delete a specific user task.', summary : 'To delete a specific user task.'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
