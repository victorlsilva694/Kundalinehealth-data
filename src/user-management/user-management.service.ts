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
  ) {}

  async findAll() {
    const foundAllUser = await this.userRepository.find({
      where: {
        email: Not('admin@gmail.com'),
      },
    });

    return foundAllUser;
  }

  async findOneById(id: number) {
    const foundUserById = await this.userRepository.find({
      where: {
        id: id,
      },
    });

    return foundUserById;
  }

  async updateUserById(
    id: number,
    updateUserManagementDto: UpdateUserManagementDto,
  ) {
    await this.userRepository.update(id, updateUserManagementDto);
    const userUpdated = this.userRepository.findOne({ where: { id: id } });

    return userUpdated;
  }

  async removeUserById(id: number) {
    const getUserToRemove = await this.userRepository.findOne({
      where: { id: id },
    });

    if (getUserToRemove) {
      await this.userRepository.remove(getUserToRemove);
      return { success: 'User deleted successfully' };
    }

    return { error: 'The error occurred when deleting the user' };
  }
}
