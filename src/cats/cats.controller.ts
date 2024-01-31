import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Gatos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized Bearer Auth.'})

@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})

  //(create(@Body() createCatDto: CreateCatDto)
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    //return this.catsService.create(createCatDto)
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  /* findAll() { */
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAll( user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }
}
