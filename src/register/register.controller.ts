import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Post('admin/add/new/0')
  createAdminUser(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.createAdminUserProfile(createRegisterDto);
  }

  @Post('delete')
  remove() {
    return this.registerService.remove();
  }
}
