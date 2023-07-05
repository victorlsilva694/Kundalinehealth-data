import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';

@Controller('user-management')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) { }

  @Get()
  findAll() {
    return this.userManagementService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userManagementService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserManagementDto: UpdateUserManagementDto) {
    return this.userManagementService.update(+id, updateUserManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagementService.remove(+id);
  }
}
