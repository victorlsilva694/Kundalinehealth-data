import { Injectable } from '@nestjs/common';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from 'src/models/UsersModel.entity';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll() {
    const foundAllUser = await this.userRepository.find({
      where: {
        email: Not("admin@gmail.com")
      }
    });

    return foundAllUser;
  }

  async findOneById(id: number) {
    const foundUserById = await this.userRepository.find({
      where: {
        id: id
      }
    });

    return foundUserById;
  }

  async updateUserDataById(updateUserManagementDto: UpdateUserManagementDto) {
    return updateUserManagementDto;
  }

  update(id: number, updateUserManagementDto: UpdateUserManagementDto) {
    return `This action updates a #${id} userManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} userManagement`;
  }
}
