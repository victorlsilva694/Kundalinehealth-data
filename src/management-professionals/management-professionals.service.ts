import { Injectable } from '@nestjs/common';
import { CreateManagementProfessionalDto } from './dto/create-management-professional.dto';
import { UpdateManagementProfessionalDto } from './dto/update-management-professional.dto';

@Injectable()
export class ManagementProfessionalsService {
  create(createManagementProfessionalDto: CreateManagementProfessionalDto) {
    return createManagementProfessionalDto;
  }

  findAll() {
    return `This action returns all managementProfessionals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managementProfessional`;
  }

  update(id: number, updateManagementProfessionalDto: UpdateManagementProfessionalDto) {
    return `This action updates a #${id} managementProfessional`;
  }

  remove(id: number) {
    return `This action removes a #${id} managementProfessional`;
  }
}
