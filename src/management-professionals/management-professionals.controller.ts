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
import { TrustGuard } from 'src/trust/trust.guard';

@Controller('management-professionals')
@UseGuards(TrustGuard)
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
    return this.managementProfessionalsService.findProfessionalById(+id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagementProfessionalDto: UpdateManagementProfessionalDto,
  ) {
    return this.managementProfessionalsService.updateProfessionalById(
      +id,
      updateManagementProfessionalDto,
    );
  }

  @Get('/search/register/:register')
  searchProfessionalByRegisterCode(
    @Param('register') register: string,
  ) {
    return this.managementProfessionalsService.searchProfessionalByRegisterCode(
      register,
    );
  }

  @Get('/search/specialty/:specialty')
  searchProfessionalBySpecialty(
    @Param('specialty') specialty: string,
  ) {
    return this.managementProfessionalsService.searchProfessionalBySpecialty(
      specialty,
    );
  }

  @Get('/search/name/:name')
  searchProfessionalByName(
    @Param('name') name: string,
  ) {
    return this.managementProfessionalsService.searchProfessionalByName(
      name,
    );
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementProfessionalsService.removeProfessionalById(+id);
  }
}
