import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { CreateUserAuthenticationDto } from './dto/create-user-authentication.dto';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';

@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(private readonly userAuthenticationService: UserAuthenticationService) {}

  @Post()
  Login(@Body() createUserAuthenticationDto: CreateUserAuthenticationDto) {
    return this.userAuthenticationService.validateUser(createUserAuthenticationDto);
  }

  @Get('logout')
  findAll() {
    return this.userAuthenticationService.logout();
  }
}
