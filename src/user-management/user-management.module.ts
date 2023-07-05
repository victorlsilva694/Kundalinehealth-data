import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/UsersModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserManagementController],
  providers: [UserManagementService]
})
export class UserManagementModule {}
