import { Injectable } from '@nestjs/common';
import { CreateUserAuthenticationDto } from './dto/create-user-authentication.dto';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/UsersModel.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

interface IPayloadJwtService {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  email: string;
}

@Injectable()
export class UserAuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(userAuthenticatePayloadData: IPayloadJwtService) {
    const payload = {
      username: userAuthenticatePayloadData.name,
      sub: userAuthenticatePayloadData.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(createUserAuthenticationDto: CreateUserAuthenticationDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: createUserAuthenticationDto.email },
    });

    const passwordMatch = await bcrypt.compare(
      createUserAuthenticationDto.password,
      foundUser.password,
    );

    if (foundUser && passwordMatch) {
      const { birthDate, email, id, lastName, name } = foundUser;
      const userDataToken = this.login(foundUser);
      
      return {
        data: { birthDate, email, id, lastName, name },
        token: (await userDataToken).access_token,
        message: 'Success',
      };
    }

    return { data: {}, message: 'Error' };
  }

  logout() {
    return { token: null };
  }
}
