import { Injectable } from '@nestjs/common';
import { CreateManagementProfessionalDto } from './dto/create-management-professional.dto';
import { UpdateManagementProfessionalDto } from './dto/update-management-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professionals } from 'src/models/ProfessionalsModel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagementProfessionalsService {
  constructor(
    @InjectRepository(Professionals)
    private professionalsRepository: Repository<Professionals>,
  ) {}

  async create(
    createManagementProfessionalDto: CreateManagementProfessionalDto,
  ) {
    try {
      const saveProfessional = await this.professionalsRepository.save(
        createManagementProfessionalDto,
      );

      if (saveProfessional) {
        return { data: createManagementProfessionalDto, success: 'success' };
      }
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async findAll() {
    const saveProfessional = await this.professionalsRepository.find();
    return saveProfessional;
  }

  async findProfessionalById(id: number) {
    try {
      const saveProfessional = await this.professionalsRepository.findOne({
        where: { id: id },
      });

      return { data: saveProfessional, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async updateProfessionalById(
    id: number,
    updateManagementProfessionalDto: UpdateManagementProfessionalDto,
  ) {
    try {
      await this.professionalsRepository.update(
        id,
        updateManagementProfessionalDto,
      );
      const professionalUpdated = this.professionalsRepository.findOne({
        where: { id: id },
      });

      return { data: professionalUpdated, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async searchProfessionalByRegisterCode(registerCode: string) {
    try {
      const professionalByRegisterCode = await this.professionalsRepository.find({ where: { ProfessionalRegistration: registerCode}});

      return { data: professionalByRegisterCode, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async searchProfessionalBySpecialty(specialty: string) {
    try {
      const foundProfessionalBySpecialty =
        await this.professionalsRepository.find({
          where: {
            specialty: specialty,
          },
        });

      return { data: foundProfessionalBySpecialty, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async searchProfessionalByName(name: string) {
    try {
      const foundProfessionalByName =
        await this.professionalsRepository.findOne({
          where: {
            name: name,
          },
        });

      return { data: foundProfessionalByName, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }

  async removeProfessionalById(id: number) {
    try {
      const saveProfessional = await this.professionalsRepository.delete(id);
      return { data: saveProfessional, success: 'success' };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }
}
