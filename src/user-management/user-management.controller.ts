import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { TrustGuard } from 'src/trust/trust.guard';

@Controller('user-management')
@UseGuards(TrustGuard)
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

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserManagementDto: UpdateUserManagementDto) {
    return this.userManagementService.updateUserById(+id, updateUserManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagementService.removeUserById(+id);
  }
}
