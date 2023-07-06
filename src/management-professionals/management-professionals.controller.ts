import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ManagementProfessionalsService } from './management-professionals.service';
import { CreateManagementProfessionalDto } from './dto/create-management-professional.dto';
import { UpdateManagementProfessionalDto } from './dto/update-management-professional.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('management-professionals')
@UseGuards(JwtGuard)
export class ManagementProfessionalsController {
  constructor(
    private readonly managementProfessionalsService: ManagementProfessionalsService,
  ) {}

  @Post()
  create(
    @Body() createManagementProfessionalDto: CreateManagementProfessionalDto,
  ) {
    return this.managementProfessionalsService.create(
      createManagementProfessionalDto,
    );
  }

  @Get()
  findAll() {
    return this.managementProfessionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managementProfessionalsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagementProfessionalDto: UpdateManagementProfessionalDto,
  ) {
    return this.managementProfessionalsService.update(
      +id,
      updateManagementProfessionalDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementProfessionalsService.remove(+id);
  }
}
