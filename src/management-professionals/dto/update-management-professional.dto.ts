import { PartialType } from '@nestjs/mapped-types';
import { CreateManagementProfessionalDto } from './create-management-professional.dto';

export class UpdateManagementProfessionalDto extends PartialType(CreateManagementProfessionalDto) {}
