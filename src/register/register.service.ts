import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Repository } from 'typeorm';
import { User } from '../models/UsersModel.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  
  async createUser(createRegisterDto: CreateRegisterDto): Promise<User> {
    const { name, lastName, email, birthDate, isAdmin } = createRegisterDto;
  
    const hashedPassword = await this.hashPassword(createRegisterDto.password);
  
    const user = new User();
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.password = hashedPassword;
    user.birthDate = birthDate;
    user.isAdmin = isAdmin;
  
    return user;
  }
  
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  
  async create(createRegisterDto: CreateRegisterDto) {
    try {
      const user = await this.createUser(createRegisterDto);
      const savedUser = await this.saveUser(user);
  
      return { success: true, message: 'Success', data: savedUser };
    } catch (error) {
      return { success: false, message: 'Error', error: error.message };
    }
  }
  
  findAll() {
    return `This action returns all register`;
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
