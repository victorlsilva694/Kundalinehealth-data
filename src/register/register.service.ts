import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Repository } from 'typeorm';
import { User } from '../models/UsersModel.entity';
import nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();
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

  async createAdminDefaultUserProfile(createRegisterDto: CreateRegisterDto) {
    const user = await this.createUser(createRegisterDto);
    const savedUser = await this.saveUser(user);

  }

  async createUser(createRegisterDto: CreateRegisterDto): Promise<User> {
    const { name, lastName, email, birthDate } = createRegisterDto;

    const hashedPassword = await this.hashPassword(createRegisterDto.password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.password = hashedPassword;
    user.birthDate = birthDate;

    return user;
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findUser(user: User) {
    const foundUser = await this.userRepository.findOne({ where: { name: user.name } });
    const passwordMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!foundUser || !passwordMatch) {
      return null;
    }

    return foundUser.password
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

  async createAdminUserProfile(createRegisterDto: CreateRegisterDto) {
    const foundUser = await this.userRepository.findOne({ where: { email: process.env.email } });

    if (!foundUser) {
      let userAdminData = {
        name: process.env.name,
        lastName: process.env.lastName,
        birthDate: process.env.birthDate,
        email: process.env.email,
        password: process.env.password
      }

      const passwordHash = await this.hashPassword(userAdminData.password);

      const user = new User();
      user.name = userAdminData.name;
      user.email = userAdminData.email;
      user.lastName = userAdminData.lastName;
      user.password = passwordHash;
      user.birthDate = userAdminData.birthDate;

      const insertAdminUserOnDataBase = this.userRepository.save(user);

      return insertAdminUserOnDataBase;
    }

    return foundUser;
  }

  async sendMailConfirmation(name: string, email: string, password: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Confirmation',
      text: `
        <h1>Hello<h1>, Your email address, ${email}, associated with your Authy Account was successfully verified.
        Your password is: ${password}
      `,
    };

    try {
      const info = await transporter.sendMail(emailOptions);
      console.log('Email enviado:', info.response);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  }


  findAll(isAdmin: number) {
    return `This action returns all register`;
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

 async remove() {
    const deleteAllUsers = await this.userRepository.delete({});
    return deleteAllUsers;
  }
}
